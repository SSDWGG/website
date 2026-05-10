import { createRouter, createWebHistory } from 'vue-router'
import AllView from '../views/AllView.vue'

const routes = [
  {
    path: '/',
    name: 'WGG',
    component: AllView,
    meta: { title: 'WGG', titleKey: 'root' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Home', titleKey: 'home' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About', titleKey: 'about' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: 'Profile', titleKey: 'profile' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'Portfolio', titleKey: 'portfolio' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { title: 'Blog', titleKey: 'blog' }
  },
  {
    path: '/read/:slug/:id',
    name: 'articleDetail',
    component: () => import('../views/ArticleView.vue'),
    meta: { title: 'Blog', titleKey: 'article' }
  },


  // 未归纳自定义页面路由

  // 仅适配pc
  {
    path: '/Index',
    name: 'Index',
    component: () => import(`../views/IndexView.vue`),
    meta: { title: 'Index', titleKey: 'index' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - WGG';
  window.scrollTo(0,0)
  next();
});

export default router
