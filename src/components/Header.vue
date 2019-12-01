<template>
  <div id="header">
    <el-row type="flex" align="middle" class="header-row">
      <el-col :span="12">
        <img alt="HMF Logo" src="../assets/hmf-logo.png" class="header-logo" :class="$mq">
      </el-col>
      <el-col :span="12">
        <el-dropdown class="profile-dropdown" @command="handleCommand">
          <div>
            <div v-if="!isXs" id="header-profile-name">Hi, {{userName}}</div>
            <el-avatar v-if="!isXs" id="header-profile-avatar" :src="profileImg"></el-avatar>
            <el-button v-if="isXs" id="xs-menu" type="text" icon="el-icon-menu"></el-button>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="header-profile-details">
              <div class="profile-name">{{userName}}</div>
            </el-dropdown-item>
            <el-dropdown-item divided command="how-it-works">How it Works</el-dropdown-item>
<!--            <el-dropdown-item>Share timeline</el-dropdown-item>-->
            <el-dropdown-item command="start-over">Start Over</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isXs() {
      return this.$mq === 'xs';
    },
  },
  data() {
    return {
      userName: 'there.',
      profileImg: 'https://nutrition.tufts.edu/sites/default/files/styles/profile_photo/public/site_reserved_graphics/profile_image_placeholder_red.jpg?itok=lMc9e4Ky',
    };
  },
  methods: {
    handleCommand(command) {
      if (command === 'how-it-works') {
        console.log('Go to How it Works page...');
      } else if (command === 'start-over') {
        this.confirmStartOver();
      }
    },
    confirmStartOver() {
      this.$confirm('Are you sure you want to start over? Your changes will not be saved.', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.startOver();
      });
    },
    startOver() {
      localStorage.clear();
      this.$emit('startOver');
    },
  },
  created() {
    if (localStorage.getItem('user')) {
      this.userName = localStorage.getItem('user');
    }
  },
};
</script>

<style scoped lang="scss">
  #header {
    box-shadow: 0 4px 8px rgba(87, 87, 87, 0.16);
    background: #F9F9F9;
    z-index: 12;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    .header-row {
      padding: 8px 20px;
    }

    .header-logo {
      width: 240px;

      &.xs {
        width: 150px;
      }
    }

    .profile-dropdown {
      float: right;
      .el-dropdown-selfdefine {
        display: flex;
        align-items: center;
      }
      #header-profile-name {
        display: inline-flex;
        margin-right: 10px;
        font-size: 16px;
      }
      #header-profile-avatar {
        display: inline-flex;
      }
      #xs-menu {
        font-size: 24px;
      }
    }
  }

  // profile dropdown menu
  .el-dropdown-menu {
    .el-dropdown-menu__item {
      &.header-profile-details {
        pointer-events: none;
        line-height: 25px;

        .profile-name {
          color: #ba334f;
          font-weight: bold;
        }
      }
    }
  }
</style>
