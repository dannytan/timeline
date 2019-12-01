<template>
  <div id="landing">
    <el-row>
      <el-col :span="24" class="greeting" :class="$mq">
        <div>NOT ALL WHO WANDER ARE <span class="highlight">LOST</span>.<br v-if="$mq !== 'xs'"/>
          THIS IS YOUR <span class="highlight">STORY</span>.</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :xs="24" class="about" :class="$mq">
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
    <div class="start" :class="$mq">
      <el-input v-if="showNameInput" placeholder="Please enter your name" v-model="name"></el-input>
      <el-button
        v-if="showNameInput"
        class="lets-go-btn"
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
      this.$emit('goToApp');
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

      &.md {
        font-size: 40px;
      }
      &.sm {
        font-size: 30px;
      }
      &.xs {
        font-size: 24px;
        padding-top: 10vh;
      }
    }
    .about {
      padding: 10px 0 0 10vw;
      font-size: 20px;

      &.md {
        font-size: 18px;
      }
      &.sm {
        font-size: 16px;
      }
      &.xs {
        font-size: 14px;
        padding: 10px 10vw 0 10vw;
      }
    }
    .start {
      padding: 10px 0 0 10vw;
      .el-input {
        width: 350px;
        margin-right: 20px;
      }

      &.xs {
        .el-input {
          width: 220px;
          margin-right: 20px;
        }
        .lets-go-btn {
          display: block;
          width: 220px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
