import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(repoRoot, '.env.deploy.local');

function parseEnvFile(filePath) {
  return readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return env;
      }

      const match = trimmedLine.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

      if (!match) {
        return env;
      }

      const [, key, rawValue] = match;
      let value = rawValue.trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      env[key] = value;

      return env;
    }, {});
}

function expandPath(filePath) {
  if (filePath === '~') {
    return homedir();
  }

  if (filePath.startsWith('~/')) {
    return resolve(homedir(), filePath.slice(2));
  }

  return resolve(repoRoot, filePath);
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function assertRequired(env, keys) {
  const missingKeys = keys.filter((key) => !env[key]);

  if (missingKeys.length) {
    throw new Error(`Missing deployment config: ${missingKeys.join(', ')}`);
  }
}

if (!existsSync(envPath)) {
  throw new Error(`Deployment env file not found: ${envPath}`);
}

const env = parseEnvFile(envPath);
const requiredKeys = [
  'DEPLOY_SSH_HOST',
  'DEPLOY_SSH_USER',
  'DEPLOY_SSH_PORT',
  'DEPLOY_SSH_KEY',
  'DEPLOY_REMOTE_DIR',
];

assertRequired(env, requiredKeys);

const host = env.DEPLOY_SSH_HOST;
const user = env.DEPLOY_SSH_USER;
const port = env.DEPLOY_SSH_PORT;
const keyPath = expandPath(env.DEPLOY_SSH_KEY);
const remoteDir = env.DEPLOY_REMOTE_DIR;
const distDir = resolve(repoRoot, env.DEPLOY_DIST_DIR || 'dist');
const dryRun = env.DEPLOY_DRY_RUN === '1' || process.env.DEPLOY_DRY_RUN === '1';

if (!existsSync(keyPath)) {
  throw new Error(`SSH key not found: ${keyPath}`);
}

console.log('Building production assets...');
run('npm', ['run', 'build']);

if (!existsSync(distDir)) {
  throw new Error(`Build output directory not found: ${distDir}`);
}

const sshBaseArgs = [
  '-i',
  keyPath,
  '-p',
  port,
  '-o',
  'StrictHostKeyChecking=accept-new',
];

const sshTarget = `${user}@${host}`;
const remoteTarget = `${sshTarget}:${remoteDir.endsWith('/') ? remoteDir : `${remoteDir}/`}`;

if (dryRun) {
  console.log('Dry run enabled. Deployment commands were validated but not executed.');
  console.log(`ssh ${sshBaseArgs.map(shellQuote).join(' ')} ${sshTarget} ${shellQuote(`mkdir -p ${shellQuote(remoteDir)}`)}`);
  console.log(`rsync -az --delete -e ${shellQuote(`ssh -i ${shellQuote(keyPath)} -p ${port} -o StrictHostKeyChecking=accept-new`)} ${shellQuote(`${distDir}/`)} ${shellQuote(remoteTarget)}`);
  process.exit(0);
}

console.log('Preparing remote directory...');
run('ssh', [
  ...sshBaseArgs,
  sshTarget,
  `mkdir -p ${shellQuote(remoteDir)}`,
]);

console.log('Uploading dist/ to remote server...');
run('rsync', [
  '-az',
  '--delete',
  '-e',
  `ssh -i ${shellQuote(keyPath)} -p ${port} -o StrictHostKeyChecking=accept-new`,
  `${distDir}/`,
  remoteTarget,
]);

console.log(`Deployment complete: ${remoteTarget}`);
