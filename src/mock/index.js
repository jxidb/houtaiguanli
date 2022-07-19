import Mock from 'mockjs'
// 引入home.js文件里面所有的暴露接口
import homeApi from '@/mock/home.js'
import userApi from '@/mock/user.js'
import permission from '@/mock/permission.js'
// 这里表示的是拦截对/api/home/getData路径的请求，拦截之后调用后面的回调函数
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 第一个参数是请求的路径地址，  第二个参数是请求方式，这里写请求方式是因为这个请求没有在api文件里面进行定义，所以需要写请求方式，第三个参数写的是回调函数

// 新增接口
Mock.mock('/api/user/add', 'post', userApi.createUser)

// 编辑接口
Mock.mock('/api/user/edit', 'post', userApi.updateUser)

// 获取数据接口
Mock.mock(/\/api\/user\/getUser/, 'get', userApi.getUserList)

// 删除数据接口
Mock.mock('/api/user/del', 'post', userApi.deleteUser)

Mock.mock('/api/permission/getmenu', 'post', permission.getMenu)
