import fetch from './fetch'

//登录
const login = params => {
  return fetch.defaultPost('user/login',params) //all
}
//注册
const register = params => {
  return fetch.defaultPost('user/register',params) //taoke
}
//获取用户信息
const getUserInfo = params => {
  return fetch.post('user/user-info',params)  //all
}
//修改用户信息
const setUserInfo = params => {
  return fetch.post('user/update',params) //all
}
//添加用户
const addUser = params => {
  return fetch.post('goods/add-user',params)  // admin
}
//分类列表
const category = params => {
  return fetch.post('goods/category',params) //all
}
//校验商品链接
const checkUrl = params => {
  return fetch.post('goods/check',params)  //all
}
//添加商品
const addGoods = params => {
  return fetch.post('goods/add',params)  //all
}
//admin list
const goodsList = params => {
  return fetch.post('goods/list',params)  //admin
}
//审核 通过 1  拒绝 4   status   0 未审核 1 待选中 2 已选中  3 下架 4 未通过审核 5  已审核
const changeStatus = params => {
  return fetch.post('goods/change-status',params)  //taoke 可以下架自己的商品;   admin 所有权限;  app 无权限;
}
//选品库、app list
const listApp = params => {
  return fetch.post('goods/list-app',params)  //  all
}
//淘客list
const taokeList = params => {
  return fetch.post('goods/taoke',params)   // taoke 
}
//选中并导出
const selects = params => {
  return fetch.post('/goods/selects',params)  //app
}
//获取验证码
const getCode = params => {
  return fetch.post('',params)
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
  setUserInfo,
  getCode
}