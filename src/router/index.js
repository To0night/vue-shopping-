import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Cate from '@/components/Cate/Cate'
import Shopping_car from '@/components/Shopping_car/Shopping_car'
import Per_info from "@/components/Per_info/Per_info"
import Detail from '@/components/Detail/Detail'
import Perchase from '@/components/Perchase/Perchase'
import Order from '@/components/Order/Order'
import Order_detail from '@/components/Order_detail/Order_detail'
import Order_status from '@/components/Order_status/Order_status'

Vue.use(Router)

// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onComplete, onAbort) {
//   return routerPush.call(this, location, onComplete, onAbort).catch(error=> error)
// };

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}


export default new Router({
  linkActiveClass: 'link-active',
  mode: 'history',
	name: 'router',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Cate',
      name: 'Cate',
      component: Cate
    },
    {
      path: '/Shopping_car',
      name: 'Shopping_car',
      component: Shopping_car
    },
    {
      path: '/Per_info',
      name: 'Per_info',
      component: Per_info
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
		{
			path: '/Perchase',
			name: 'Perchase',
			component: Perchase
		},
		{
			path: '/Order',
			name: 'Order',
			component: Order
    },
    {
      path: '/Order_detail',
      name: 'Order_detail',
      component: Order_detail
    },
    {
      path: '/Order_status',
      name: 'Order_status',
      component: Order_status
    }
  ]
})
