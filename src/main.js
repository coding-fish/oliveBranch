import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import qs from "qs";
import echarts from 'echarts'
import Clipboard from "clipboard";

//import './assets/css/user/general.css';
import './assets/css/blog/all.css'
import './assets/css/blog/blogstyle.css'
import './assets/css/blog/style1.css'
import './assets/css/blog/demo.css'
import './assets/css/blog/demo1.css'
import './assets/css/blog/normalize.css'
import './assets/css/blog/style-salal.css'
import './assets/iconfontBlog/iconfont.css'
import './assets/iconfontBlog/iconfont.js'
import './assets/iconfontCard/iconfont.js'
import './assets/iconfontCard/iconfont.css'
import Base64 from './assets/js/base64.js'
//import './assets/css/manage/all.css'
//import './assets/css/manage/button_tabnav.css'
import './assets/css/manage/style.css'
import './assets/css/manage/style1.css'
import './assets/css/manage/tailwind.min.css'
import './assets/css/user/general.css'

import './assets/css/navigatorAndSearch/animate.min.css';
//import './assets/css/navigatorAndSearch/style.css';
import './assets/css/navigatorAndSearch/forSearch/iconfont.css';
// import './assets/css/navigatorAndSearch/forSearch/demo.css';

// axios.defaults.baseURL = "/api"
axios.defaults.headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
Vue.use(Element);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.prototype.Clipboard = Clipboard;
Vue.prototype.qs = qs;
Vue.prototype.$Base64 = Base64;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
