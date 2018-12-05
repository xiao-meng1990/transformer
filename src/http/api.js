import fetch from './fetch'
import Qs from 'qs'
//登录
const login = params => {
  return fetch({
    url: 'user/login',
    method: 'post',
    data: Qs.stringify(params)
  })
}
//注册
const register = params => {
  return fetch({
    url: 'user/register',
    method: 'post',
    data: Qs.stringify(params)
  })
}
//添加用户
const addUser = params => {
  return fetch({
    url: 'goods/add-user',
    method: 'post',
    data: Qs.stringify(params)
  })
}


export default {
  login,
  register,
  addUser
}
