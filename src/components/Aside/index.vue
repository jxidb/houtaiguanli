<template>
  <el-menu default-active="1-4-1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>

    <el-menu-item v-for="item in noChildren" @click="clickMenu(item)" :index="item.path" :key="item.path">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu :index="index + '1'" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="item1 in item.children" :key="item1.path">
        <el-menu-item :index="item1.path" @click="clickMenu(item1)">{{ item1.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        // { path: '/', name: 'home', label: '首页', icon: 's-home', url: 'Home/home' },
        // { path: '/mall', name: 'mall', label: '商品管理', icon: 'video-play', url: 'MallManage/MallManage' },
        // { path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'UserManage/UserManage' },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
        //     { path: '/page1', name: 'page1', label: '页面1', icon: 'setting', url: 'Other/PageOne' },
        //     { path: '/page2', name: 'page2', label: '页面2', icon: 'setting', url: 'Other/PageTwo' }
        //   ]
        // }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('SELECTMENU', item)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    margin-top: 15px;
    line-height: 15px;
    font-size: 18px;
  }
}
</style>
