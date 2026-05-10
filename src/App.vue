<template>
   <!-- 渐变背景 -->
   <back-ground></back-ground>
    <!-- 流星背景 -->
    <LxBg />
    <!-- 彩色连线背景 -->
    <BzdBg />
  <div class="max-w-7xl mx-auto flex flex-col relative">
    <nav class="max-w-7xl px-5 md:fixed top-0 z-[98] w-screen backdrop-blur-md bg-[#121212] bg-opacity-80">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <button @click="redirectToHome" class="flex">
          <span
            class="self-center text-lg text-[#ffdb70] font-semibold whitespace-nowrap fadein-bot hover:text-amber-100">WGG</span>
        </button>
        <div class="flex items-center gap-3 md:order-2 fadein-bot">
          <a href="https://github.com/SSDWGG" target="_blank"><img class="w-9 rounded-full"
              src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/ECMLFNBJ-1711511159929github.png"
              alt="github"></a>
          <button class="language-switch" :aria-label="copy.nav.languageLabel" @click="toggleLanguage">
            {{ copy.nav.language }}
          </button>
        </div>
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
          <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link to="/"
                class="fadein-bot text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0"
                aria-current="page">{{ copy.nav.home }}
              </router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0">
                {{ copy.nav.about }}
              </router-link>
            </li>
            <li>
              <router-link to="/profile"
                class="fadein-bot fadein-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0">
                {{ copy.nav.profile }}
              </router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0">
                {{ copy.nav.portfolio }}
              </router-link>
            </li>
            <li>
              <router-link to="/blog"
                class="fadein-bot fadein-4 text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-gray-500 md:p-0 blog">
                {{ copy.nav.blog }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="md:mt-[100px]">
      <router-view />
    </div>
  </div>
  <footer
    class="block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border border-[#383838] bg-[#121212] bg-opacity-80 backdrop-blur-md backdrop-opacity-90">
    <nav class="flex justify-around py-4 text-xs">
      <router-link to="/" class="text-gray-300 hover:text-white">{{ copy.nav.home }}</router-link>
      <router-link to="/about" class="text-gray-300 hover:text-white">{{ copy.nav.about }}</router-link>
      <router-link to="/profile" class="text-gray-300 hover:text-white">{{ copy.nav.profile }}</router-link>
      <router-link to="/portfolio" class="text-gray-300 hover:text-white">{{ copy.nav.portfolio }}</router-link>
      <router-link to="/blog" class="text-gray-300 hover:text-white">{{ copy.nav.blog }}</router-link>
    </nav>
  </footer>
</template>

<script>
import BzdBg from './components/BzdBg.vue'
import BackGround from './components/BackGround.vue'
import LxBg from './components/LxBg/LxBg.vue'
import { appCopy, languageState, setLocale } from './i18n'
export default {
  components: {
    BackGround,
    LxBg,
    BzdBg


  },
  data() {
    return {
      languageState,
    }
  },
  computed: {
    copy() {
      return appCopy[this.languageState.locale]
    },
  },
  mounted() {
    this.updateDocumentTitle()
  },
  watch: {
    '$route'() {
      this.updateDocumentTitle()
    },
    'languageState.locale'() {
      this.updateDocumentTitle()
    },
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    },
    toggleLanguage() {
      setLocale(this.languageState.locale === 'zh' ? 'en' : 'zh')
    },
    updateDocumentTitle() {
      const titleKey = this.$route.meta.titleKey || 'root'
      const routeTitle = this.copy.routeTitles[titleKey] || this.$route.meta.title || 'WGG'
      document.title = `${routeTitle} - WGG`
    },
  },
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  /* for vertical scrollbar */
  height: 5px;
  /* for horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: hsl(240, 1%, 17%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #ffdb70;
  border-radius: 5px;
}

::-webkit-scrollbar-button {
  width: 20px;
}

body {
  font-family: 'Poppins', sans-serif;
  background: hsl(0, 0%, 7%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  display: inline-flex;
  flex-direction: column;
  color: white;
  transition: color 0.3s;
}

nav a.router-link-exact-active::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #ffdb70;
}

nav a.router-link-exact-active:hover {
  color: white;
}

.language-switch {
  min-width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 219, 112, 0.42);
  border-radius: 999px;
  color: #ffdb70;
  background: rgba(255, 219, 112, 0.08);
  font-size: 13px;
  font-weight: 700;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.language-switch:hover {
  border-color: rgba(255, 219, 112, 0.78);
  background: rgba(255, 219, 112, 0.16);
  color: #ffffff;
}


@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
