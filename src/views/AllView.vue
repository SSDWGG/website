<template>
  <div>
   
    <!-- 首页介绍 -->
    <HomeView />
    <!-- 个人信息详细介绍 -->
    <AboutView />
    <!-- 编程项目分享 -->
    <PortfolioView />

    <!-- 联系我 -->
    <ContactView/>


  </div>
</template>

<script>
import HomeView from "./HomeView.vue";
import AboutView from "./AboutView.vue";
import PortfolioView from "./PortfolioView.vue";
import ContactView from "./ContactView.vue";

export default {
  name: 'AllView',
  components: {
    HomeView,
    AboutView,
    ContactView,
    PortfolioView,

  }
}
</script>

<style></style>
../components/LxBg/LxBg.vue