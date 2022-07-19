import requests from '@/api/axios.js'
export const reqgetMenu = (data) => {
  return requests({
    url: '/permission/getmenu',
    method: 'POST',
    data
  })
}

export const reqgetData = () => {
  return requests({
    url: '/home/getData',
    method: 'GET'
  })
}

// 新增数据接口
export const reqAdd = (data) => {
  return requests({
    url: '/user/add',
    method: 'POST',
    data
  })
}

// 修改数据接口
export const reqEdit = (data) => {
  return requests({
    url: '/user/edit',
    method: 'POST',
    data
  })
}

// 获取数据接口
export const reqGetList = (params) => {
  return requests({
    url: '/user/getUser',
    method: 'GET',
    params
  })
}

// 删除数据接口
export const reqDel = (data) => {
  return requests({
    url: '/user/del',
    method: 'POST',
    data
  })
}

// export const reqgetMenu=()=>{
//   return requests({
//     url
//   })
// }
