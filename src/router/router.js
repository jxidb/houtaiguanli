// 默认导出路由模块

export default [
  {
    path: '/main',
    component: () => import('@/views/Main/index.vue'),
    name: 'main',
    children: [
      // {
      //   path: 'home',
      //   component: () => import('@/views/Home/index.vue'),
      //   name: 'home'
      // },
      // {
      //   path: 'user',
      //   component: () => import('@/views/User/index.vue'),
      //   name: 'user'
      // },
      // {
      //   path: 'mall',
      //   component: () => import('@/views/Mall/index.vue'),
      //   name: 'mall'
      // },
      // {
      //   path: 'page1',
      //   component: () => import('@/views/Other/pageOne.vue'),
      //   name: 'page1'
      // },
      // {
      //   path: 'page2',
      //   component: () => import('@/views/Other/pageTwo.vue'),
      //   name: 'page2'
      // }
    ]
  },
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/Login/index.vue') }
]
