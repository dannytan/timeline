<template>
  <div>
    <div id="landing" v-if="showLanding">
      <router-view @goToApp="goToApp"></router-view>
    </div>
    <div id="app" v-else>
      <Header @startOver="startOver"></Header>
      <div id="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  data() {
    return {
      showLanding: true,
    };
  },
  methods: {
    goToApp() {
      this.showLanding = false;
      this.$router.push('/timeline');
    },
    startOver() {
      this.showLanding = true;
      this.$router.push('/');
    },
  },
  created() {
    if (localStorage.getItem('user')) {
      this.showLanding = false;
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
