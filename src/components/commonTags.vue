<template>
  <div>
    <el-tag
        v-for="item in tabs"
        :key="item.name"
        :closable="item.name!=='home'"
        :effect="item.name === currentTab.name?'dark':'plain'"
        @click="selectTab(item)"
        @close="closeTab(item)"
    >{{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "commonTags",
  computed: {
    ...mapState({
      tabs: state => state.tab.tabs,
      currentTab: state => state.tab.currentTab
    })
  },
  methods: {
    selectTab(tab) {
      this.$router.push({name: tab.name})
      this.$store.commit('SELECTMENU', tab)
    },
    closeTab(tab) {
      let index = this.tabs.indexOf(tab)
      this.$store.commit('DELETETAGS', index)
      this.$router.push({name: this.currentTab.name})
    }
  }
}
</script>

<style scoped lang="less">
.el-tag {
  margin: 5px 10px -10px 0px;
  padding: 0px 25px;

  &:hover {
    cursor: pointer;
  }
}
</style>
