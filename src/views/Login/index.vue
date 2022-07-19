<template>
  <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px" class="login-container">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" label-width="80px" prop="username" class="username">
      <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码" label-width="80px" prop="password" class="password">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item class="LoginSubmit">
      <el-button type="primary" @click="login" class="LoginSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import Mock from 'mockjs'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$API.reqgetMenu(this.form).then((res) => {
        console.log(res, 'asd')
        if (res.code === 20000) {
          this.$store.commit('CLEARMENU')
          this.$store.commit('SETMENU', res.data.menu)
          this.$store.commit('SETTOKEN', res.data.token)

          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
      // 模拟生成token
      // const token = Mock.Random.guid()

      // this.$store.commit('SETTOKEN', token)
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #1a1a1a;
  box-shadow: 0 0 25px #cacac6;
}
.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.LoginSubmit {
  margin: 10px auto 0 auto;
}
</style>
