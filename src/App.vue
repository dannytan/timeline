<template>
  <div>
    <div id="landing" v-if="showLanding">
      <Landing @goToApp="showLanding = false"></Landing>
    </div>
    <div id="app" v-else>
      <Header></Header>
      <div id="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Landing from './views/Landing.vue';

export default {
  name: 'app',
  components: {
    Header,
    Landing,
  },
  data() {
    return {
      showLanding: true,
    };
  },
  created() {
    if (localStorage.getItem('user')) {
      this.showLanding = false;
    } else {
      this.$router.push('/timeline');
    }
  },
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

  body {
    font-family: 'Muli', Helvetica, Arial, sans-serif;
    margin: 0;
    background: #F9F9F9;
  }

  #app {
    font-family: 'Muli', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #main {
    margin-top: 70px;
    padding: 40px 20px;
  }
</style>
