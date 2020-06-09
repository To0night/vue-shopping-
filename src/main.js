import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//mint-ui
import Mint_ui from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint_ui);
//引入更改的mint-ui控件样式
import './assets/css/mint-ui.css'

// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);

//axios
import axios from 'axios'
Vue.prototype.$axios = axios

//vuex store
import store from './store/store';

//Vue-preview是一个非常好用的移动端图片预览的组件，简单易用是它的一大特点，支持滑动换图，支持手势缩放，显示当前时第几张和总共多少张。
// import VuePreview from 'vue-preview';
// Vue.use(VuePreview);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})
