<template>
  <div class="manage">
    <!-- title表示的是打开谈弹窗，左上角显示的标题是什么 -->

    <el-dialog :title="operateType == 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <Form :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form"></Form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <div>
        <el-button type="primary" @click="addUser" class="aaa">新增</el-button>
      </div>
      <div>
        <Form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form"> <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button></Form>
      </div>
    </div>

    <div>
      <TaBel :tabelData="tabelData" :tabelLabel="tabelLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></TaBel>
    </div>
  </div>
</template>
<script>
import Form from '@/components/Form/index.vue'
// import Tabel from '@/components/Tabel/index.vue'
export default {
  name: 'User',

  components: {
    Form,
    TaBel: () => import('@/components/Tabel/index.vue')
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      opertateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchFrom: {
        keyword: ''
      },
      tabelData: [],
      tabelLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$API.reqEdit(this.operateForm).then((res) => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$API.reqAdd(this.operateForm).then((res) => {
          console.log(res)

          this.isShow = false
          this.getList()
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.$API
        .reqGetList({
          page: this.config.page,
          name
        })
        .then((res) => {
          this.tabelData = res.list.map((item) => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })

          this.config.total = res.count
          this.config.loading = false
        })
    },
    editUser(row) {
      // console.log(row)
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      // 这个confirm是一个全局的API  传递三个参数  第一个参数是提示内容  第二个参数是标题  第三个参数是相关配置
      this.$confirm('此操作将永久删除该文件,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        const id = row.id
        this.$API.reqDel(id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // console.log(res)
          // 删除数据之后重新获取数据,渲染新页面
          if (res.code === 20000) {
            this.getList()
          }
        })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="less">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 100px;
}
</style>
