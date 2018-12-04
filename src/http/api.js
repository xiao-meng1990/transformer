import fetch from './fetch'
import Qs from 'qs'
const getIndex = params => {
  return fetch({
    url: 'user/login',
    method: 'post',
    data: Qs.stringify(params)
  })
}


export default {
  getIndex
}
