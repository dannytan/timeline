<template>
  <div id="landing">
    <el-row>
      <el-col :span="24" class="greeting">
        <div>NOT ALL THOSE WHO WANDER ARE <span class="highlight">LOST</span>.</div>
        <div>THIS IS YOUR <span class="highlight">STORY</span>.</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" class="about">
        <p>
          Use this as a tool to create interactive and visual timelines of your life. By looking
          back at past events, experiences, and seasons, you will begin to identify the
          uniqueness of your journey, the purpose of your calling, and a life full of promise and
          hope. Whether it was a time of triumph or tribulation, on the mountaintops or in the
          deepest valley, the hope is that you will be able to see how God was faithful through
          it all.
        </p>
      </el-col>
    </el-row>
    <div class="start">
      <el-input v-if="showNameInput" placeholder="Please enter your name" v-model="name"></el-input>
      <el-button
        v-if="showNameInput"
        type="primary"
        :disabled="disableStart"
        @click="start">
        LET'S GO!
      </el-button>
      <el-button
        v-if="!showNameInput"
        type="primary"
        @click="showNameInput = true">
        GET STARTED
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    disableStart() {
      return this.name === '';
    },
  },
  data() {
    return {
      name: '',
      showNameInput: false,
    };
  },
  methods: {
    start() {
      localStorage.setItem('user', this.name);
      this.$router.push('/timeline');
    },
  },
};
</script>

<style scoped lang="scss">

  #landing {
    height: 100vh;
    margin:0;
    padding:0;
    background: url('../assets/landing.jpg') center top no-repeat;
    background-size:cover;
    .greeting {
      padding: 15vh 10vw 0 10vw;
      font-size: 45px;
      font-weight: bold;
      .highlight {
        color: #AA2F48;
      }
    }
    .about {
      padding: 10px 0 0 10vw;
      font-size: 20px;
    }
    .start {
      padding: 10px 0 0 10vw;
      .el-input {
        width: 350px;
        margin-right: 20px;
      }
    }
  }
</style>
