<template>
  <div v-show='isshow'  >
    <!-- tabbar -->
    <mt-tabbar v-model="selected" fixed>
	    <mt-tab-item :id="item.id" v-for='item in tabbars' :key='item.id'>
	      <img slot="icon" :src="item.src">
	      {{item.title}}
	    </mt-tab-item>
	</mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isshow: 'true',
      selected: 'home',
      tabbars: [
      	{
            id: 'home',
            name: 'Home',
            title:`首页`,
            src: require('@/assets/images/home_1.png'),
        },{
            id: 'cate',
            name: 'Cate',
            title:`分类`,
            src: require('@/assets/images/cate.png'),
        },{
            id: 'shopping_car',
            name: 'Shopping_car',
            title:`购物车`,
            src: require('@/assets/images/shopping_car.png'),
        },{
            id: 'per_info',
            name: 'Per_info',
            title:`我的`,
            src: require('@/assets/images/per_info.png'),
        }
      ]
    }
  },
  created(){

  },
  watch:{
  	selected: function (current) {
        this.tabbars.forEach(value => {
            if (value.name == current){
                 value.src = require(`@/assets/images/${value.id}_1.png`)
            }else{
                value.src = require(`@/assets/images/${value.id}.png`)
            }
        })
        this.$router.push('/'+current)
    },
    $route:function (newRoute) {
        this.selected = newRoute.name
        switch(newRoute.name){
          case 'Home': 
                this.isshow=true 
                break;
          case 'Cate': 
                this.isshow=true 
                break;
          case 'Shopping_car': 
                this.isshow=true
                break;
          case 'Per_info': 
                this.isshow=true  
                break;
          default: 
                this.isshow=false 
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
