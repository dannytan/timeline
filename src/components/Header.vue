<template>
  <div id="header">
    <el-row type="flex" align="middle" class="header-row">
      <el-col :span="12">
        <img alt="HMF Logo" src="../assets/hmf-logo.png" class="header-logo">
      </el-col>
      <el-col :span="12">
        <el-dropdown class="profile-dropdown">
          <div>
            <div id="header-profile-name">Hi, Danny</div>
            <el-avatar id="header-profile-avatar" :src="profileImg"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="header-profile-details">
              <div class="profile-name">Danny Tan</div>
            </el-dropdown-item>
            <el-dropdown-item divided>Edit profile</el-dropdown-item>
<!--            <el-dropdown-item>Share timeline</el-dropdown-item>-->
            <el-dropdown-item>Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      profileImg: 'https://nutrition.tufts.edu/sites/default/files/styles/profile_photo/public/site_reserved_graphics/profile_image_placeholder_red.jpg?itok=lMc9e4Ky',
    };
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
      width: 250px;
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
