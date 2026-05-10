<template>
  <div
    class="bg-[#1e1e1f] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 mb-20">
    <article data-page="about">

      <header>
        <div class="text-2xl font-bold text-white mb-5 fadein-bot title-section flex items-center">
          {{ contactCopy.heading }} &nbsp;
          <div class="h-[1px] w-32 bg-amber-200 md:w-96 aos-init aos-animate" data-aos="zoom-in-left"
            data-aos-duration="600"></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center">
        <div class="flex justify-center">
          <img class="w-9/12 rounded-full mb-3 fadein-up pict"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/common/IDDOHGEI-1711616555997f0b032e9e9f4c7994c3f5ef3fde9b727.JPG"
            alt="Foto">
        </div>
        <div class="md:w-7/12">
          <ul class="mb-3 md:mb-7 fadein-left fadeins-1">
            <li class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">· {{ contactCopy.phone }}：13616549486</li>
            <li class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">· {{ contactCopy.wechat }}：13616549486</li>
            <li class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent">· QQ：1982549567 </li>
            <li class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">· 抖音：<a href="https://v.douyin.com/k8EE8cc/">不秃顶w彦祖（{{ contactCopy.douyinAction }}）</a></li>
            <li class="bg-clip-text bg-gradient-to-l from-slate-100 to-amber-300 text-transparent">· B站：<a href="https://b23.tv/SZ0yXIG">不秃顶w彦祖（{{ contactCopy.bilibiliAction }}）</a></li>
            <li class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">· INS：<a href="https://instagram.com/ssdwgg?igshid=YmMyMTA2M2Y=">ssdwgg（{{ contactCopy.instagramAction }}）</a></li>
          </ul>
        </div>
      </section>
    </article>
  </div>

  
</template>

<script>
import { appCopy, languageState } from '@/i18n';

export default {
  data() {
    return {
      languageState,
    };
  },
  computed: {
    contactCopy() {
      return appCopy[this.languageState.locale].contact;
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
