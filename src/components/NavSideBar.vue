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
            :key="cItem.name">
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
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    };
  },
  computed: {
    noChild() {
      return this.menu.filter(item => !item.children)
    },
    hasChild() {
      return this.menu.filter(item => item.children)
    },
    ...mapState({
      isCollapse: (state) => {
        return state.tab.iscollapse
      }
    })
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
