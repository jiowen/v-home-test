import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import _ from 'lodash'
import ElementUI from 'element-ui';
import menu from './plugins/menu'
import 'element-ui/lib/theme-chalk/index.css';
import "./css/main.css";

Vue.prototype._ = _
Vue.use(ElementUI)
Vue.use(menu)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
