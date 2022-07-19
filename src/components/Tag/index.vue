<template>
  <div class="tabs">
    <el-tag size="small" v-for="(item, index) in tags" :key="item.name" :closable="item.name !== 'home'" :effect="$route.name == item.name ? 'dark' : 'plain'" @click="changeMenu(item)" @close="handleClose(item, index)">{{ item.label }}</el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  computed: {
    ...mapState({
      // 这个时候的tags的长度是3
      tags: (state) => state.tab.tabsList
    })
  },

  methods: {
    ...mapMutations({
      close: 'CLOSETAG'
    }),
    changeMenu(item) {
      this.$router.push({
        // 通过name进行路由的跳转
        name: item.name
      })
    },
    handleClose(tag, index) {
      // 点击关闭按钮，这个时候触发close这个函数，tags进行切割，长度减1

      this.close(tag)

      // 这里表示的就是最右边的索引值,因为前面调用mutations里面closetag函数的时候，已经splice了一个，所以这个时候tags的长度就是当前的索引
      const length = this.tags.length
      // 如果删除的标签名和路由标签名不一致的话，就表示，删除的不是当前路由的标签，就不用做任何处理

      if (tag.name != this.$route.name) {
        return
      }
      if (index == length) {
        // 如果关闭是最后一个标签的话，就向左进行跳转
        this.$router.push({
          // 因为删除的是最后一位，索引跳转的时候，直接跳转前一位就可以
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          //  如果不是最后一位的话，就代表这个标签在中间，跳转的话，就直接按照这个索引进行跳转就可以了
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>
<style lang="less">
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
