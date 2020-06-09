<template>
  <div id="app">
  	<mt-header fixed :title="header" slot="left">
      <mt-button icon="back" @click="back" slot="left">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <transition name='fade' mode='out-in'>
      <router-view :style="{height:r_height}" class="main"></router-view>
    </transition>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/Tabbar'
import { mapGetters,mapMutations,mapActions } from 'vuex'

export default {
  name: 'App',
  data(){
  	return{
  		header: '天天商城',
      r_height: ''
  	}
  },
  created(){
    if (parseInt(document.documentElement.clientWidth)>1000)
      // alert('该项目做了屏幕适配,调成手机设备调试更佳')
      // console.log(document.documentElement.clientWidth)
      this.r_height = document.documentElement.clientHeight-100+'px'
      // this.$store.commit('setHeight',this.r_height)
      this.setHeight(this.r_height);
      // console.log(this.getHeight)
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    ...mapMutations([
        'setHeight'
    ])
  },
  computed:{
    ...mapGetters([
      'getHeight'
    ])
  },
  watch:{
    $route:function (new_page) {
      switch (new_page.name) {
        case 'Cate':
          this.header='商品分类'
          break;
        case 'Shopping_car':
          this.header='购物车'
          break;
        case 'Serchase':
          this.header='提交订单'
          break;
        case 'Order':
          this.header='在线支付'
          break;
        case 'Order_status':
          this.header='订单管理'
          break;
        default:
          this.header='天天商城'
     }
}
  },
  components: {
  	Tabbar,
  }
}
</script>

<style >
/*
vue中的transtion是一个动画过渡封装组件，常见的情景时用transition标签包裹的DOM含有动画效果。transition组件的动画效果过渡设置基于css的transition属性设置。
<transition>中的name=fade: 
  fade-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
  fade-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在transition/animation完成之后移除。
  fade-leave:
  定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
  fade-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在transition/animation完成之后移除。
 */
    .fade-enter-active, .fade-leave-active{
        transition: opacity .1s;
    }
/*
 transition: opacity 1s, transform 1s;该元素的透明和旋转如果发生变化时会有1秒的过度效果。也就是渐隐渐显，和旋转的动画。
 */
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    @media screen and (min-width: 2000px) and (max-width: 2500px) {
        #app{
            width: 80%;
            margin: 0 auto;
        }
    }
    @media screen and (min-width: 2501px) {
        #app{
            width: 60%;
            margin: 0 auto;
        }
    }
    .main {
        position: relative;
        width: 100%;
        margin-top: 40px;
        overflow: auto;
    }
    body{
      padding: 0;
      margin: 0;
    }
    a{
        background: white;
        text-decoration: none;
        color: black;
    }
    a:link{
        text-decoration: none;
    }


</style>
