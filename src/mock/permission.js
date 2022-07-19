import Mock from 'mockjs'
export default {
  getMenu: (config) => {
    // console.log(config)
    const { username, password } = JSON.parse(config.body)
    // console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/main/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/index'
            },
            {
              path: '/main/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/index'
            },
            {
              path: '/main/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User/index'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/main/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'Other/pageOne.vue'
                },
                {
                  path: '/main/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'Other/pageTwo.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/main/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/index'
            },
            {
              path: '/main/mall',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
