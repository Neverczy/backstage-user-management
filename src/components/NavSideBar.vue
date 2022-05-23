<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#eee"
    active-text-color="#ffd04b">
    <h3>{{ isCollapse === false ? '通用后台管理系统' : '后台' }}</h3>
    <el-menu-item @click="goPage(nocItem)" v-for="nocItem in noChild" :index="nocItem.name" :key="nocItem.name">
      <i :class="'el-icon-'+nocItem.icon"></i>
      <span slot="title">{{ nocItem.label }}</span>
    </el-menu-item>
    <el-submenu :index="hcItem.icon" v-for="hcItem in hasChild" :key="hcItem.icon">
      <template slot="title">
        <i :class="'el-icon-'+hcItem.icon"></i>
        <span slot="title">{{ hcItem.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="cItem.name"
          v-for="cItem in hcItem.children"
          :key="cItem.name"
          @click="goPage(cItem)">
          {{ cItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "NavSideBar",
  data() {
    return {
      //menu数据
      menu: []
    };
  },
  computed: {
    noChild() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChild() {
      return this.asyncMenu.filter(item => item.children)
    },
    ...mapState({
      isCollapse: state => state.tab.iscollapse,
      asyncMenu: state => state.tab.menu
    }),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goPage(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('SELECTMENU', item)
    },
    changeCollapse() {
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>

<style scoped lang="less">

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    font-weight: 700;
    text-align: center;
    color: #fff;
  }
}
</style>
