import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import api from "./http/index.js";
import "./plugins/element.js";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(api);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
