import axios from "axios";
import config from "./config";
import util from "../assets/js/util.js";
import Qs from "qs";
// todo
const http = function $axios(url, param, type) {
  return new Promise((resolve, reject) => {
    const options = {
      url: url,
      data: Qs.stringify(param),
      method: type
    };
    const instance = axios.create({
      baseURL: config.baseUrl,
      // timeout: 10000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        // 'Content-Type': 'application/json'
      }
    });
    instance(options)
      .then(res => {
        if (res.data.code == 1001) {
          setTimeout(function() {
            window.location.href = "/";
          }, 1200);
        }
        resolve(res.data);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
};
const post = (url, param = {}) => {
  Object.assign(param, {
    "access-token": util.getStorage("token")
  });
  return http(url, param, "post");
};
const defaultPost = (url, param = {}) => {
  return http(url, param, "post");
};
export default {
  post,
  defaultPost
};
