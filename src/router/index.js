import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Timeline from '../views/Timeline.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: Timeline,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
