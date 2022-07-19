import Vuex from 'vuex'
import Vue from 'vue'
import tab from '@/store/tab.js'
import user from '@/store/user.js'
// 因为必须在调用Vuex之前把Vuex挂载到Vue身上，所以需要在index.js文件中调用Vue.use进行注册挂载
Vue.use(Vuex)
export default new Vuex.Store({
  // 模块:将小仓库合并为大仓库
  // 将这些小的仓库合并到一起
  modules: {
    tab,
    user
  }
})
