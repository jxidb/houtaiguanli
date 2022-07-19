<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini" @click="changeCollapse"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: `${item.path}` }" v-for="item in tags" :key="item.path">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img :src="userImg" class="user" style="width: 40px; height: 40px" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userImg: require('@/assets/tx.jpeg')
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  },

  methods: {
    changeCollapse() {
      // console.log(this)
      this.$store.commit('COLLAPSEMENU')
    },
    loginOut() {
      this.$store.commit('CLEARTOKEN')
      this.$store.commit('CLEARMENU')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less">
header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}
img {
  border-radius: 50%;
}
// .l-content {
//   display: flex;
//   align-items: center;
//   height: 100%;
//   .el-button {
//     margin-right: 20px;
//     color: black;
//     background-color: #fff;
//     border: 0;
//   }
//   h3 {
//     color: white;
//   }
// }

// .r-content {
//   .user {
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//   }
// }

// .el-button:hover {
//   border: 1px solid skyblue;
// }
</style>
