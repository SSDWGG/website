import { reactive } from 'vue';

export const supportedLocales = ['zh', 'en'];

const defaultLocale = 'zh';
const storageKey = 'wgg-locale';

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const storedLocale = window.localStorage.getItem(storageKey);

  return supportedLocales.includes(storedLocale) ? storedLocale : defaultLocale;
}

export const languageState = reactive({
  locale: getInitialLocale(),
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = languageState.locale === 'zh' ? 'zh-CN' : 'en';
}

export function setLocale(locale) {
  if (!supportedLocales.includes(locale)) {
    return;
  }

  languageState.locale = locale;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }
}

export function getLocalized(source, locale = languageState.locale) {
  return source[locale] || source[defaultLocale] || source.en;
}

export const appCopy = {
  zh: {
    nav: {
      home: '主页',
      about: '详情',
      profile: '个人简介',
      portfolio: '编程项目',
      blog: '摄影分享',
      language: 'EN',
      languageLabel: 'Switch to English',
    },
    routeTitles: {
      home: '主页',
      about: '详情',
      profile: '个人简介',
      portfolio: '编程项目',
      blog: '摄影分享',
      article: '文章',
      index: 'Index',
      root: 'WGG',
    },
    home: {
      greeting: "Hello , I'm",
      roles: ['Web Developer', 'Photographer', 'Explorer', 'Drone Controllers', 'Music-lover'],
    },
    about: {
      heading: 'About Me',
      skillsTitle: 'Skills',
    },
    portfolio: {
      heading: 'Personal project',
      subtitle: "Explore the open source projects I've worked on so far",
      sourceTitle: '查看源码',
      demoTitle: '查看',
      items: [
        { name: 'Personal Website', status: '个人简介站.' },
        { name: 'WGG BLOG', status: '一个基于 VitePress 的个性化文档库' },
        { name: 'MP_V2（个人中后台管理系统）', status: '基于 AntDesign Pro 的个人管理系统，包含 todoList 等多种功能' },
        { name: '商城', status: '基于 Vue 和 Spring Boot 的前后端分离电商平台型项目，全套免费开源代码，收到大量学生朋友的正反馈' },
        { name: 'Github', status: 'Github 主页运营和搭建' },
      ],
    },
    blog: {
      tagline: '让我们一起分享美好瞬间',
      topicsTitle: 'Topics',
      articles: [
        { title: '非常棒的张杰人像', desc: '非常棒的张杰人像', slug: '非常棒的张杰人像', content: '非常棒的张杰人像' },
        { title: '温暖的花和阳光', desc: '温暖的花和阳光', slug: '温暖的花和阳光', content: '温暖的花和阳光' },
        { title: '晴朗干净的天空、云和阳光', desc: '晴朗干净的天空、云和阳光', slug: '晴朗干净的天空、云和阳光', content: '晴朗干净的天空、云和阳光' },
        { title: '无限好的夕阳色', desc: '无限好的夕阳色', slug: '无限好的夕阳色', content: '无限好的夕阳色' },
        { title: '令人神往的月亮', desc: '令人神往的月亮', slug: '令人神往的月亮', content: '令人神往的月亮' },
      ],
    },
    contact: {
      heading: 'Contact Me',
      phone: 'phone_手机号',
      wechat: 'wechat_微信',
      douyinAction: '点击直达',
      bilibiliAction: '点击直达',
      instagramAction: '点击直达',
    },
    article: {
      publishedAt: 'Published at',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      profile: 'Profile',
      portfolio: 'Projects',
      blog: 'Photos',
      language: '中',
      languageLabel: '切换到中文',
    },
    routeTitles: {
      home: 'Home',
      about: 'About',
      profile: 'Profile',
      portfolio: 'Projects',
      blog: 'Photos',
      article: 'Article',
      index: 'Index',
      root: 'WGG',
    },
    home: {
      greeting: "Hello , I'm",
      roles: ['Web Developer', 'Photographer', 'Explorer', 'Drone Pilot', 'Music Lover'],
    },
    about: {
      heading: 'About Me',
      skillsTitle: 'Skills',
    },
    portfolio: {
      heading: 'Personal Projects',
      subtitle: "Explore the open source projects I've worked on so far",
      sourceTitle: 'View source',
      demoTitle: 'View demo',
      items: [
        { name: 'Personal Website', status: 'A personal profile website.' },
        { name: 'WGG BLOG', status: 'A personalized documentation library built with VitePress.' },
        { name: 'MP_V2 Personal Admin System', status: 'A personal admin system based on Ant Design Pro, including todo lists and other workflows.' },
        { name: 'Mall Platform', status: 'A free open-source front-end and back-end e-commerce project built with Vue and Spring Boot.' },
        { name: 'Github', status: 'Github profile operation and setup.' },
      ],
    },
    blog: {
      tagline: 'Share beautiful moments together',
      topicsTitle: 'Topics',
      articles: [
        { title: 'A strong portrait session for Zhang Jie', desc: 'A strong portrait session for Zhang Jie', slug: 'zhang-jie-portrait', content: 'A strong portrait session for Zhang Jie' },
        { title: 'Warm flowers and sunlight', desc: 'Warm flowers and sunlight', slug: 'warm-flowers-sunlight', content: 'Warm flowers and sunlight' },
        { title: 'Clear sky, clouds, and sunlight', desc: 'Clear sky, clouds, and sunlight', slug: 'clear-sky-clouds-sunlight', content: 'Clear sky, clouds, and sunlight' },
        { title: 'A rich sunset color', desc: 'A rich sunset color', slug: 'sunset-color', content: 'A rich sunset color' },
        { title: 'A fascinating moon', desc: 'A fascinating moon', slug: 'fascinating-moon', content: 'A fascinating moon' },
      ],
    },
    contact: {
      heading: 'Contact Me',
      phone: 'Phone',
      wechat: 'WeChat',
      douyinAction: 'open',
      bilibiliAction: 'open',
      instagramAction: 'open',
    },
    article: {
      publishedAt: 'Published at',
    },
  },
};
