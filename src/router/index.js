import Vue from 'vue';
import VueRouter from 'vue-router';
import Timeline from '../views/Timeline.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'timeline',
    component: Timeline,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
