import Vue from 'vue';
import VueMq from 'vue-mq';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import './theme/index.css';

Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: {
    xs: 768,
    sm: 992,
    md: 1200,
    lg: 1920,
    xl: Infinity,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
