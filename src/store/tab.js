import Cookie from 'js-cookie'

const state = {
  isCollapse: false,
  tabsList: [
    {
      path: '/main/home',
      name: 'home',
      label: '首页',
      icon: 'home'
    }
  ],
  currentMenu: null,
  menu: []
}
const actions = {}
const mutations = {
  COLLAPSEMENU(state) {
    state.isCollapse = !state.isCollapse
  },
  SELECTMENU(state, val) {
    if (val.name != 'home') {
      state.currentMenu = val
      let result = state.tabsList.findIndex((item) => item.name === val.name)
      if (result == -1) {
        state.tabsList.push(val)
      } else {
        state.currentMenu = null
      }
    }
  },
  CLOSETAG(state, val) {
    const result = state.tabsList.findIndex((item) => item.name == val.name)
    state.tabsList.splice(result, 1)
  },
  SETMENU(state, val) {
    state.menu = val
    // stringify可以将对象转换为字符串
    Cookie.set('menu', JSON.stringify(val))
  },
  CLEARMENU(state) {
    state.menu = []
    Cookie.remove('menu')
  },
  ADDMENU(state, router) {
    if (!Cookie.get('menu')) {
      return
    }
    // parse可以将字符在转换为对象
    const menu = JSON.parse(Cookie.get('menu'))
    state.menu = menu
    const menuArray = []
    menu.forEach((item) => {
      if (item.children) {
        item.children = item.children.map((a) => {
          a.component = () => import(`@/views/${a.url}`)
          return a
        })
        menuArray.push(...item.children)
      } else {
        item.component = () => import(`@/views/${item.url}`)

        menuArray.push(item)
      }
    })
    // 路由的动态添加
    menuArray.forEach((item) => {
      router.addRoute('main', item)
    })
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
