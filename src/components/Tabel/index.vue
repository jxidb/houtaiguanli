<template>
  <div class="common-tabel">
    <!-- :data属性用于接收data的数据 -->
    <el-table :data="tabelData" style="height: 350px" stripe>
      <!-- show-overflow-tooltip表示当内容过长被隐藏时显示 tooltip -->
      <el-table-column class-name="aaa" :label="item.label" show-overflow-tooltip v-for="item in tabelLabel" :key="item.prop" :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- layout	组件布局，子组件名用逗号分隔 -->
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"> </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Tabel',
  props: {
    tabelData: Array,
    tabelLabel: Array,
    config: Object
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('del', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
<style lang="less">
.common-tabel {
  height: calc(100%-62px);
  background-color: #fff;
  position: relative;
  .el-table {
    overflow: scroll;
  }
  .pager {
    position: absolute;
    bottom: -50px;
    // right: 20px;
  }
}
</style>
