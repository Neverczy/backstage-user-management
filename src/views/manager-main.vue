<template>
  <el-container>
    <el-aside width="auto">
      <NavSideBar></NavSideBar>
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader></NavHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavSideBar from '@/components/NavSideBar'
import NavHeader from '@/components/NavHeader'

export default {
  name: "manager-main",
  components: {
    NavSideBar,
    NavHeader,
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #333;
  width: 100%;
}

.el-main {
  padding-top: 0;
}

.el-container {
  height: 100%;
  width: 100%;
}
</style>
