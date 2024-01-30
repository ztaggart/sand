import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import CanvasContainerVue from './components/CanvasContainer.vue';
import HomePageVue from './components/HomePage.vue';
import TestVue from './components/Test.vue';

const router = createRouter({
  history: createWebHistory('/sand'),
  routes: [
    {
      path: '/classic',
      component: CanvasContainerVue
    },
    {
      path: '/hello',
      component: TestVue
    },
    {
      path: '/',
      component: HomePageVue
    }
  ]
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
