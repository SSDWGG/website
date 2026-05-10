<template>
  <div
    class="bg-[#1e1e1f] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 mb-5 mt-3">
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center">
          {{ aboutCopy.heading }} &nbsp;
          <div class="h-[1px] w-32 bg-amber-200 md:w-96 aos-init aos-animate" data-aos="zoom-in-left"
            data-aos-duration="600"></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center">
        <div class="flex justify-center">
          <img class="w-9/12 rounded-full mb-3 fadein-up pict"
            :src="profileImages.avatar"
            alt="Foto">
        </div>
        <div class="md:w-7/12">
          <ul class="mb-3 md:mb-7 fadein-left fadeins-1">
            <li
              v-for="item in profile.aboutBullets"
              :key="item"
              class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">
              · {{ item }}
            </li>
          </ul>
        </div>
      </section>
      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center">
        <div class="md:w-7/12">
          <ul class="mb-3 md:mb-7 fadein-left fadeins-2">
            <li
              v-for="item in profile.aboutLongIntro"
              :key="item"
              class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <img class="w-9/12 mb-3 fadein-up pict"
            :src="profileImages.secondary"
            alt="Foto">
        </div>
      </section>
    </article>
  </div>

  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center">
          <div class="h-[1px] w-10 bg-amber-200 md:w-20 aos-init aos-animate" data-aos="zoom-in-left"
            data-aos-duration="600"></div>
          &nbsp; {{ aboutCopy.skillsTitle }}
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-5">
            <li v-for="tab in skillTabs" :key="tab.key" class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg hover:text-white"
                :class="{ 'text-amber-200 bg-amber-200 bg-opacity-10': activeTab === tab.key }"
                @click="activeTab = tab.key">
                {{ tab.label }}
              </button>
            </li>
          </ul>
        </div>
        <div class="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
          <div v-for="item in profile.skillTabs[activeTab]" :key="item.id">
            <div
              class="item-tech flex cursor-pointer items-center gap-2 rounded border border-amber-200 px-2 py-2 hover:bg-amber-200 hover:bg-opacity-10 md:gap-3 lg:px-3">
              <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in"
                v-if="item.imageUrl">
                <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async" data-nimg="1"
                  class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                  :src="item.imageUrl" style="color: transparent;">
              </div>
              <div class="flex items-center text-sm md:text-base lg:text-lg">
                <div class="tech font-medium text-secondary transition-all duration-300 translate-y-0">
                  {{ item.name }}
                </div>
                <div
                  class="status-tech opacity-0 absolute mt-5 text-[10px] text-amber-200 transition-all duration-300 md:text-xs lg:text-sm">
                  {{ item.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { profileContent, profileImages } from '@/config/profile';
import { appCopy, getLocalized, languageState } from '@/i18n';

export default {
  data() {
    return {
      activeTab: 'hobbies',
      languageState,
      profileImages,
    };
  },
  computed: {
    aboutCopy() {
      return appCopy[this.languageState.locale].about;
    },
    profile() {
      return getLocalized(profileContent, this.languageState.locale);
    },
    skillTabs() {
      return [
        { key: 'hobbies', label: this.profile.skillTabLabels.hobbies },
        { key: 'programming', label: this.profile.skillTabLabels.programming },
      ];
    },
  },
}
</script>

<style>
.fadein-left {
  opacity: 0;
  font-size: 1.1rem;
  line-height: 2.2rem;
  animation: fadeInLeft 0.5s ease-out forwards;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeins-1 {
  animation-delay: 500ms;

}

.fadeins-2 {
  animation-delay: 800ms;
}

.img-tech,
.tech {
  transition: transform 0.3s ease;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}

.pict {
  box-shadow: 0px 0px 43px -9px rgba(255, 219, 112, 0.44);

}
</style>
