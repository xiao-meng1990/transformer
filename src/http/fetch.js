import axios from 'axios'
import config from './config'
import util from '../assets/js/util.js'
import Qs from 'qs'
// import store from '@/store/index'
// access-token: "aab6fb8b825ndpae0ooqac13d9"
const http =  function $axios(url,param,type) {
  return new Promise((resolve, reject) => {
    const options = {
      url:url,
      data:Qs.stringify(param),
      method:type
    }
    const instance = axios.create({
      baseURL: config.baseUrl,
      // timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      },
    })
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // request 拦截器
    // instance.interceptors.request.use(
    //   config => {
    //     // 加载动画
    //     // store.dispatch('setLoading', true);
    //     return config;
    //   },
    //   error => {
    //     // store.dispatch('setLoading', false);
    //     // store.dispatch('setToast', "请求错误");
    //     // console.log('request:', error)
    //     return Promise.reject(error);
    //   }
    // )

    // response 拦截器
    // instance.interceptors.response.use(
    //   response => {
    //     // store.dispatch('setLoading', false);
    //     return response;
    //   },
    //   err => {
    //     // store.dispatch('setLoading', false);
    //     // if(err.response.data.message.indexOf("今日机会已用完") == -1){
    //     //   store.dispatch('setToast', err.response.data.message);
    //     // }
    //     // console.log('response:', err)
    //     return Promise.reject(err);
    //   })
    instance(options)
      .then(res => {
        resolve(res.data)
        return false
      }).catch((error) => {
        reject(error)
      })
  })

}
const post = (url,param={}) => {
  Object.assign(param, {
    "access-token":util.getStorage("token")
  });
  return http(url, param, "post");
};
const defaultPost = (url,param={}) => {
  return http(url, param, "post");
};
export default {
  post,
  defaultPost
}
