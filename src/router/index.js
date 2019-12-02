import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import Timeline from '../views/Timeline.vue';
import TimelineCombined from '../views/TimelineCombined.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        return next('/timeline');
      }
      return next();
    },
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: Timeline,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('user')) {
        return next('/');
      }
      return next();
    },
  },
  {
    path: '/timeline/combined',
    name: 'timeline-combined',
    component: TimelineCombined,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('user')) {
        return next('/');
      }
      return next();
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
