<template>
  
  <div class="container mx-auto p-3 md:p-8 mb-20">
    <div class="flex flex-col-reverse md:flex-row relative">
      <div class="w-full md:w-2/3">
        <div class="flex flex-col gap-4 md:px-20 fade-zoom-up">
          <article v-for="article in articles" :key="article.id">
            <!-- router-link :to="`/read/${article.slug}/${article.id}`" -->
            <div
              class="flex w-full bg-[#1e1e1f] border-[#383838] rounded-xl text-left text-white p-5 md:py-7 md:px-8 cursor-pointer hover:bg-[#282828] items-center">
              <div class="w-full pr-4">
                <div class="text-xs mb-1 text-slate-400 flex items-center italic">
                  <div class="h-[1px] w-20 bg-amber-200 md:w-5 aos-init aos-animate mr-2"></div>
                  {{ article.date }}
                </div>
                <h1 class="text-sm md:text-md text-amber-200 font-bold mb-2 paraf">
                  {{ article.title }}
                </h1>
                <div class="text-sm hidden md:block paraf">
                  {{ article.desc }}
                </div>
              </div>
              <div>
                <div class="w-20 h-20 md:w-28 flex items-center md:h-28">
                  <img :src="article.image" class="rounded-lg md:rounded-xl" alt="" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="w-full md:w-1/3 h-fit p-8 md:sticky md:top-24">
        <!-- Sidebar -->
        <div class="flex flex-col text-left">
          <div class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">
            {{ blogCopy.tagline }}
          </div>

          <!-- 侧边栏内容 -->
          <div v-for="(asideItem, index) in asideDate" :Key="index">
            <!-- 分割线 -->
            <div class="h-[1px] mt-7 mb-7 w-20 bg-amber-200 aos-init aos-animate mr-2"></div>
            <div class="hidden md:block">
              <div class="text-white text-md font-semibold">{{ blogCopy.topicsTitle }}</div>
              <div class="mt-3 flex flex-wrap gap-1">
                <span v-for="(item, index) in asideItem" :Key="index"
                  class="py-2 px-3 rounded-2xl bg-[#1e1e1f] hover:bg-white/20 text-white text-xs cursor-pointer">{{ item
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appCopy, languageState } from '@/i18n';

const articleAssets = [
  {
    image: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/OCKKKEKK-1711618542279DSC02822.jpg",
    date: "3, 2024",
    id: "1"
  },
  {
    image: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/OEGPHFLP-1711618542279DSC01300.jpg",
    date: "3, 2024",
    id: "2"
  },
  {
    image: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/FGDGLIMI-1711617928428DJI_0056.JPG",
    date: "7, 2022",
    id: "3"
  },
  {
    image: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/CMAAPNNO-1711617928428DJI_0216.JPG",
    date: "6, 2023",
    id: "4"
  },
  {
    image: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/HKCKPHBK-1711617928428moon.png",
    date: "3, 2024",
    id: "5"
  },
];

export default {
  data() {
    return {
      languageState,
      asideDate: {
        Topics: ["flower", "Portrait", "Sunset"],
      },
    };
  },
  computed: {
    blogCopy() {
      return appCopy[this.languageState.locale].blog;
    },
    articles() {
      return this.blogCopy.articles.map((article, index) => ({
        ...articleAssets[index],
        ...article,
      }));
    },
  },
  
};
</script>

<style scoped>
.paraf {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media (min-width: 768px) {
  .paraf {
    display: -webkit-box;
  }
}

@keyframes fadeZoomUp {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-zoom-up {
  animation: fadeZoomUp 1s ease-in-out;
  /* animation-delay: 1000ms; */
}
</style>
