<template>
  <div class="box">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <Tag> </Tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header/index.vue'
import Aside from '@/components/Aside/index.vue'
import Tag from '@/components/Tag/index.vue'
export default {
  name: 'Main',
  components: {
    Aside,
    Header,
    Tag
  }
}
</script>
<style lang="less" scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.box {
  height: 100%;
}
.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
  // text-align: center;
}
</style>
