<template>
  <div class="profile-page mx-3 mb-24 text-left text-amber-50 md:mb-12">
    <div class="profile-shell">
      <aside class="profile-sidebar">
        <section class="profile-card avatar-card motion-slide motion-left">
          <div class="avatar-ring">
            <img :src="profileImages.avatar" alt="WGG" class="avatar-img">
          </div>
          <h2 class="mt-5 text-2xl font-bold text-white">{{ profile.displayName }}</h2>
          <p class="mt-2 text-sm text-amber-200">{{ profile.roleLine }}</p>
        </section>

        <section class="profile-card motion-slide motion-left" style="--slide-delay: 80ms;">
          <div v-for="item in profile.quickFacts" :key="item.label" class="fact-item">
            <span class="fact-icon">{{ item.icon }}</span>
            <div>
              <p class="text-xs text-gray-400">{{ item.label }}</p>
              <p class="text-sm text-white">{{ item.value }}</p>
            </div>
          </div>
        </section>

        <section class="profile-card motion-slide motion-left" style="--slide-delay: 160ms;">
          <div class="tag-list">
            <span v-for="tag in profile.tags" :key="tag" class="profile-tag">{{ tag }}</span>
          </div>
        </section>

        <section class="profile-card motion-slide motion-left" style="--slide-delay: 240ms;">
          <h3 class="section-mini-title">{{ profile.sections.timeline }}</h3>
          <ul class="timeline-list">
            <li v-for="item in profile.timeline" :key="`${item.time}-${item.title}`" class="timeline-item">
              <span class="timeline-dot"></span>
              <div class="timeline-content">
                <p class="text-white">{{ item.title }}</p>
                <p class="text-xs text-amber-200">{{ item.time }}</p>
              </div>
            </li>
          </ul>
        </section>
      </aside>

      <main class="profile-content">
        <section class="hero-card motion-slide motion-right" style="--slide-delay: 40ms;">
          <p class="eyebrow">{{ profile.hero.eyebrow }}</p>
          <h1 class="hero-title">{{ profile.hero.titlePrefix }} <span>{{ profile.displayName }}</span></h1>
          <p class="hero-copy">
            {{ profile.hero.copy }}
          </p>
          <div class="hero-actions">
            <a href="https://github.com/SSDWGG" target="_blank" rel="noreferrer">{{ profile.hero.actions.github }}</a>
            <router-link to="/portfolio">{{ profile.hero.actions.portfolio }}</router-link>
            <router-link to="/blog">{{ profile.hero.actions.blog }}</router-link>
          </div>
        </section>

        <section class="content-section">
          <div class="section-title">
            <h2>{{ profile.sections.about }}</h2>
            <span></span>
          </div>
          <div class="intro-grid">
            <article
              v-for="(item, index) in profile.introCards"
              :key="item.title"
              class="intro-card motion-slide motion-up"
              :style="{ '--slide-delay': `${120 + index * 80}ms` }"
            >
              <h3 class="intro-card-title">{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </article>
          </div>
        </section>

        <section class="content-section">
          <div class="section-title">
            <h2>{{ profile.sections.focus }}</h2>
            <span></span>
          </div>
          <div class="focus-grid">
            <article
              v-for="(item, index) in profile.focusCards"
              :key="item.title"
              class="focus-card motion-slide motion-up"
              :style="{ '--slide-delay': `${180 + index * 80}ms` }"
            >
              <div class="focus-icon">{{ item.icon }}</div>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="content-section">
          <div class="section-title">
            <h2>{{ profile.sections.skills }}</h2>
            <span></span>
          </div>
          <div class="skill-grid">
            <article
              v-for="(item, index) in profile.skills"
              :key="item.name"
              class="skill-card motion-slide motion-up"
              :style="{ '--slide-delay': `${220 + index * 70}ms` }"
            >
              <strong>{{ item.name }}</strong>
              <span>{{ item.desc }}</span>
            </article>
          </div>
        </section>

        <section class="quote-card motion-slide motion-up" style="--slide-delay: 320ms;">
          <p>{{ profile.quote }}</p>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { profileContent, profileImages } from '@/config/profile';
import { getLocalized, languageState } from '@/i18n';

export default {
  name: 'ProfileView',
  data() {
    return {
      languageState,
      profileImages,
      revealObserver: null,
    };
  },
  computed: {
    profile() {
      return getLocalized(profileContent, this.languageState.locale);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initRevealAnimation();
    });
  },
  beforeUnmount() {
    if (this.revealObserver) {
      this.revealObserver.disconnect();
      this.revealObserver = null;
    }
  },
  methods: {
    initRevealAnimation() {
      const animatedNodes = this.$el?.querySelectorAll('.motion-slide');

      if (!animatedNodes?.length) {
        return;
      }

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        animatedNodes.forEach((node) => node.classList.add('is-visible'));
        return;
      }

      this.revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          });
        },
        {
          threshold: 0.16,
          rootMargin: '0px 0px -48px 0px',
        },
      );

      animatedNodes.forEach((node) => this.revealObserver.observe(node));
    },
  },
}
</script>

<style scoped>
.profile-page {
  animation: profileFadeIn 0.8s ease both;
}

.motion-slide {
  --slide-delay: 0ms;
  --slide-offset-x: 0;
  --slide-offset-y: 0;
  opacity: 0;
  transform: translate3d(var(--slide-offset-x), var(--slide-offset-y), 0);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--slide-delay);
  will-change: transform, opacity;
}

.motion-left {
  --slide-offset-x: -34px;
}

.motion-right {
  --slide-offset-x: 34px;
}

.motion-up {
  --slide-offset-y: 38px;
}

.motion-slide.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.profile-shell {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
}

.profile-sidebar {
  position: sticky;
  top: 110px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: start;
}

.profile-card,
.hero-card,
.intro-card,
.focus-card,
.skill-card,
.quote-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 30, 31, 0.72);
  box-shadow: 0 24px 60px -36px rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.profile-card {
  border-radius: 24px;
  padding: 18px;
}

.avatar-card {
  text-align: center;
}

.avatar-ring {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 6px;
  background: conic-gradient(from 130deg, #ffdb70, #ffffff, #a78bfa, #ffdb70);
}

.avatar-ring::after {
  content: "";
  position: absolute;
  inset: -9px;
  z-index: -1;
  border-radius: inherit;
  background: rgba(255, 219, 112, 0.18);
  filter: blur(18px);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #171717;
}

.fact-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
}

.fact-item + .fact-item {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.fact-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 219, 112, 0.1);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-tag {
  border-radius: 999px;
  padding: 7px 11px;
  color: #ffefbd;
  background: rgba(255, 219, 112, 0.11);
  font-size: 13px;
}

.section-mini-title {
  margin-bottom: 14px;
  color: #ffffff;
  font-weight: 700;
}

.timeline-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 10px;
}

.timeline-list::before {
  content: "";
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 18px;
  width: 1px;
  background: rgba(255, 219, 112, 0.35);
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 14px;
  font-size: 13px;
}

.timeline-dot {
  z-index: 1;
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  border: 4px solid #2c2c2e;
  border-radius: 50%;
  background: #ffdb70;
}

.timeline-content {
  margin-top: -2px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card {
  position: relative;
  overflow: hidden;
  min-height: 340px;
  border-radius: 34px;
  padding: 42px;
}

.hero-card::before {
  content: "";
  position: absolute;
  inset: -40% auto auto 44%;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 219, 112, 0.22), transparent 68%);
}

.eyebrow {
  position: relative;
  width: fit-content;
  border-radius: 999px;
  padding: 7px 12px;
  color: #ffdb70;
  background: rgba(255, 219, 112, 0.1);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  position: relative;
  margin-top: 28px;
  color: #ffffff;
  font-size: clamp(2.6rem, 7vw, 5.7rem);
  font-weight: 800;
  line-height: 0.95;
}

.hero-title span {
  color: transparent;
  background: linear-gradient(120deg, #ffdb70, #ffffff 42%, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-desc {
  position: relative;
  margin-top: 22px;
  color: #ffefbd;
  font-size: 18px;
}

.hero-copy {
  position: relative;
  max-width: 720px;
  margin-top: 14px;
  color: #d6d6d6;
  line-height: 1.9;
}

.hero-actions {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.hero-actions a {
  border: 1px solid rgba(255, 219, 112, 0.42);
  border-radius: 999px;
  padding: 10px 16px;
  color: #ffdb70;
  background: rgba(255, 219, 112, 0.08);
  transition: transform 0.25s ease, background 0.25s ease;
}

.hero-actions a:hover {
  transform: translateY(-3px);
  background: rgba(255, 219, 112, 0.16);
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-title h2 {
  color: #ffffff;
  font-size: 26px;
  font-weight: 800;
}

.section-title span {
  height: 1px;
  flex: 1;
  max-width: 420px;
  background: linear-gradient(90deg, #ffdb70, transparent);
}

.intro-grid,
.focus-grid,
.skill-grid {
  display: grid;
  gap: 16px;
}

.intro-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.focus-grid,
.skill-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.intro-card,
.focus-card,
.skill-card,
.quote-card {
  border-radius: 24px;
  padding: 22px;
}

.intro-card p,
.focus-card p,
.skill-card span,
.quote-card p {
  color: #d3d3d3;
  line-height: 1.8;
}

.intro-card-title {
  display: block;
  margin-bottom: 12px;
  color: #ffdb70;
  font-size: 16px;
  font-weight: 700;
}

.focus-card {
  display: flex;
  gap: 16px;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.focus-card:hover,
.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 219, 112, 0.45);
  background: rgba(40, 40, 40, 0.82);
}

.focus-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 16px;
  background: rgba(255, 219, 112, 0.11);
  font-size: 24px;
}

.focus-card h3,
.skill-card strong {
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
}

.focus-card p {
  margin-top: 8px;
  font-size: 14px;
}

.skill-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.skill-card strong {
  color: #ffdb70;
}

.skill-card span {
  font-size: 14px;
}

.quote-card {
  border-color: rgba(255, 219, 112, 0.25);
  background: linear-gradient(135deg, rgba(255, 219, 112, 0.16), rgba(30, 30, 31, 0.76));
}

.quote-card p {
  color: #ffffff;
  font-size: 18px;
}

@keyframes profileFadeIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .profile-shell,
  .focus-grid,
  .skill-grid {
    grid-template-columns: 1fr;
  }

  .intro-grid {
    grid-template-columns: 1fr;
  }

  .profile-sidebar {
    position: static;
  }

  .hero-card {
    min-height: auto;
    padding: 30px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-page {
    animation: none;
  }

  .motion-slide {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
