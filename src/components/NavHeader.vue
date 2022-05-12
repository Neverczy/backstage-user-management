<template>
  <div class="m-content">
    <div class="l-content">
      <el-button plain circle size="mini" icon="el-icon-menu" @click="changeIsColl"></el-button>
      <el-breadcrumb separator-class="el-icon-caret-right">
        <el-breadcrumb-item class="custColor" :to="{ path: '/' }">后台主页</el-breadcrumb-item>
        <el-breadcrumb-item class="custColor">活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown size="small" trigger="click">
      <span class="el-dropdown-link">
        <img src="@/assets/images/user.png" alt="x">
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {}
  },
  methods: {
    changeIsColl() {
      this.$store.commit('SETISCOLLAPSE')
    }
  }
}
</script>

<style lang="less" scoped>

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.m-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.l-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }

  .el-breadcrumb /deep/ .el-breadcrumb__inner {
    color: #fff;
  }
}

.r-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .el-dropdown {
    margin-right: 10px;

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}

</style>
