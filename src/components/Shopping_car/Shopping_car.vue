<template>
  <div>
  	<!--     购物车页面 -->
  	<div class="all">
		
  	  <div class="edit"><span @click='edit'>{{edit_text}}</span></div>

  	  <div  class="shops">

  	  	<div class="shop"  v-for='item in  goods' 
              :key='item.goodsId'
              :id='item.goodsId'
              @click="show_detail">
          <div class="check" @click='check($event)'  :id='item.goodsId' 
                :style='{visibility:show, background:item.check}'></div>
  	  		<img :src="item.goodsPic" class="shop_img">
  	  		<div class="shop_detail">
  	  			<div class="shop_name">{{item.goodsName}}</div>
  	  			<div class="shop_num">
  	  				<div class="price">￥{{item.goodsPrice}}</div>
  	  				<div class="num">
  	  					<div class="num-" @click='num_reduce($event)' :id='item.goodsId' >-</div>
  	  					<div class="num0">{{item.amount}}</div>
  	  					<div class="numadd" @click='num_add' :id='item.goodsId' >+</div>
  	  				</div>
  	  			</div>
  	  		</div>
  	  	</div>

  	  </div>
  	  <!-- 结算 -->
  	  <div class="end">
  	  	<div class="total">合计</div>
  	  	<div class="sum">￥{{shoppingPrice}}</div>
  	  	<div class="settlement" @click="settlement">结算</div>
  	  </div>
      <!-- 编辑中 -->
      <div class="editing" :style="{zIndex:index}">
        <div class="select">
          <div></div>
          <span>全选</span>
        </div>
        <div class="opration">
          <div>清空</div>
          <div>删除</div>
        </div>
      </div>
  	</div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui';
import {Toast} from 'mint-ui';

export default {
  data () {
    return {
      index: -1,
      goods: [],
      show: 'hidden',
      shoppingPrice: 0,
      edit_text: '编辑'
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$axios(`https://xiayuhui.top:8443/shopping/findAll`, {params: {user: sessionStorage.getItem('openid')}})
      .then(res => {
        let goods = res.data.shopping
				goods.forEach(value => {
          value.check = 'white'
        })
        this.goods = goods
        this.shoppingPrice = res.data.shoppingPrice
      })
    },
    edit(){
      this.edit_text = this.edit_text == '编辑' ? '完成' : '编辑'
      this.index = this.index == -1 ? 1 : -1
      this.show = this.show == 'hidden' ? 'visible' : 'hidden'
    },
    show_detail(e){
      let id = e.currentTarget.id
      this.$router.push({name:'Detail', params:{id}})
    },
    check(e){
      e.stopPropagation()
      let id = e.target.id
      this.goods.forEach( val => {
        if(val.goodsId == id){
          val.check = val.check == '#26a2ff' ? 'white' : '#26a2ff'
        }
      })
    },
		settlement(){
			if(this.goods.length >= 1){
				this.$router.push('/Perchase')
			}else{
				Toast('购物车空空如也！') 
			}
		},
    num_add(e){
     let id = e.target.id
     this.goods.forEach(value => {
      if (value.goodsId == id) {
        this.shoppingPrice += value.goodsPrice
        value.amount++
        this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
          {params: {goodsId: id, user: sessionStorage.getItem('openid'), amount: 1}})
        .then(() => {
          console.log(`修改成功`)
        })
      }
    })
     e.stopPropagation()
    },
    num_reduce(e){
     let id = e.target.id
     this.goods.forEach((value, index) => {
      if (value.goodsId == id) {
        this.shoppingPrice -= value.goodsPrice
        value.amount--
        this.$axios.get(`https://xiayuhui.top:8443/shopping/reduce`,
          {params: {goodsId: id, user: sessionStorage.getItem('openid'), amount: 1}})
        .then(() => {
          console.log(`修改成功`)
        })
      }
      if (value.amount == 0) {
        MessageBox({
          title: '提示',
          message: '确定删除此商品吗?',
          showCancelButton: true
        }).then(res => {
          if (res == 'cancel') {
            this.shoppingPrice += value.goodsPrice
            value.amount++
          } else if (res == 'confirm') {
            this.$axios.get(`https://xiayuhui.top:8443/shopping/reduceSome`, {
              params: {user: sessionStorage.getItem('openid'), goodsId: value.goodsId}
            }).then(() => {
              Toast('删除成功')
            })
            this.goodsPrice -= this.goods[index].goodsPrice
            this.goods.splice(index, 1)
          } else {
            this.shoppingPrice += value.goodsPrice
            value.amount++
          }
        });
      }
    })
     e.stopPropagation()
   }
 },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all{
  width: 100%;
}
/*编辑*/
.edit{
  height: 30px;
  width: 100%;
  background: #26a2ff;
  color: white;
  font-size: 18px;
  padding-left: 320px;
  letter-spacing: 3px;
  line-height: 30px;
  position: fixed;
  top: 39px;
}
/*商品*/
.shops{
	width: 358px;
  margin-top: 35px;
	margin-bottom: 110px;
	margin-left: 3px;
	margin-right: 3px;
}
.shop{
	background: #e9ecf1;
	margin-top: 5px;
	margin-bottom: 8px;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 140px;
	padding: 5px;
	border-radius: 15px;
}
.check{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-top: 60px;
  margin-left: 10px;
  border: 1.5px solid #26a2ff;
}
.shop_img{
	width: 40%;
	height: 85%;
	border: 1px solid pink;
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
}
.shop_detail{
	display: flex;
	flex-direction: column;
	width: 50%;
  margin-left: 35px;
}
.shop_name{
	height: 80%;
	font-size: 20px;
	font-weight: bold;
	overflow: scroll;
}
.shop_num{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 36px;
	line-height: 36px;
}
.price{
	color: #26a2ff;
	font-size: 16px;
	font-weight: bold;
	margin-left: 10px;
}
.num{
	display: flex;
	flex-direction: row;
	margin-right: 10px;	
	text-align: center;
	height: 26px;
	line-height: 26px;
}
.num-{
  line-height: 16px;
  margin-top: 4px;
	width: 20px;
  height: 20px;
	color: #26a2ff;
	border: 1px solid #26a2ff;
	border-radius: 50%;
}
.num0{
	font-size: 18px;
	margin: 0 10px;
}
.numadd{
  line-height: 16px;
  margin-top: 4px;
	width: 20px;
  height: 20px;
	color: white;
	background: #26a2ff;
	border: 1px solid #26a2ff;
	border-radius: 50%;
}
/*结算*/
.end{
	width: 100%;
	height: 50px;
	line-height: 50px;
	position: fixed;
	bottom: 55px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	background: #e9ecf1;
	text-align: center;
}
.total{
    width: 40px;
}
.sum{
    width: 70px;
    color: #2562f9;
    font-weight: bold;
}
.settlement{
	background: #26a2ff;
	width: 100px;
	font-size: 18px;
	color: black;
	letter-spacing: 4px;
}
/*编辑中*/
.editing{
  position: fixed;
  bottom: 55px;
  width: 100%;
  height: 50px;
  background: #eeecf8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 50px;
}
.select{
  margin-left: 10px;
  display: flex;
  flex-direction: row;
}
.select  div{
  width: 25px;
  height: 25px;
  border: 1.5px solid gray;
  border-radius: 50%;
  margin-top: 12.5px;
}
.select span{
  color: gray;
  margin-left: 8px;
  font-size: 18px;
}
.opration{
  display: flex;
  flex-direction: row;
  color: #26a2ff;
}
.opration div{
  margin: 0 8px;
  margin-top: 5px;
  line-height: 40px;
  height: 40px;
  width: 80px;
  text-align: center;
  border-radius: 45%;
  font-size: 18px;
  background: #26a2ff;
  color: black;
}
</style>
