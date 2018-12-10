import fetch from './fetch'
//登录
const login = params => {
  return fetch.defaultPost('user/login',params)
}
//注册
const register = params => {
  return fetch.defaultPost('user/register',params)
}
//获取用户信息
const getUserInfo = params => {
  return fetch.post('user/user-info',params)
}
//修改用户信息
const setUserInfo = params => {
  return fetch.post('user/update',params)
}

//添加用户
const addUser = params => {
  return fetch.post('goods/add-user',params)
}
//分类列表
const category = params => {
  return fetch.post('goods/category',params)
}
//校验商品链接
const checkUrl = params => {
  return fetch.post('goods/check',params)
}
//添加商品
const addGoods = params => {
  return fetch.post('goods/add',params)
}
//admin list
const goodsList = params => {
  return fetch.post('goods/list',params)
}
//审核 通过 1  拒绝 4   status   0 未审核 1 待选中 2 已选中  3 下架 4 未通过审核 5  已审核
const changeStatus = params => {
  return fetch.post('goods/change-status',params)
}
//选品库、app list
const listApp = params => {
  return fetch.post('goods/list-app',params)
}
//淘客list
const taokeList = params => {
  return fetch.post('goods/taoke',params)
}
//选中并导出
const selects = params => {
  return fetch.post('/goods/selects',params)
}
export default {
  login,
  register,
  getUserInfo,
  addUser,
  category,
  addGoods,
  checkUrl,
  goodsList,
  changeStatus,
  selects,
  listApp,
  taokeList,
  setUserInfo
}