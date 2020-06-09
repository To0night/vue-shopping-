<template>
  <div class="all">
    <!--  商品详情页面 -->
    <!-- 商品介绍 -->
    <div class="product_introduction" ref="pro">
      <img :src="detail.goodsPic" class="int_img1" />
      <div class="int_price">
        <span class="price1">￥{{detail.goodsPrice}}</span>
        <span class="price2">￥{{detail.goodsPrice+8}}</span>
      </div>
      <div class="int_n1">
        <div class="int_name">{{detail.goodsName}}</div>
        <div class="int_pn">
          <span class="int_perple">关注人数</span>
          <span class="int_perpleNumber">16.5万</span>
        </div>
      </div>
      <div class="shop">
        <div>
          <span class="shop_name">天天商城</span>
          <div>为您提供优质服务</div>
        </div>
        <span class="shop_number">限量50000份</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="product_detail">
      <div class="detail1">商品详情</div>
      <div class="detail2">供应商:{{detail.shopName}}</div>
      <div class="detail3">{{detail.goodsJianjie}}</div>
    </div>
    <!-- 购物指南 -->
    <div class="shopping_directory">
      <div class="dir_name">天天商城购物指南</div>
      <div v-for="(item,index) in tips" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 加入购物车，购买弹出内容 -->
    <div class="eject_content" v-show="isshow">
      <div class="pic_price">
        <img :src="detail.goodsPic" />
        <span class="eject_money">￥{{detail.goodsPrice}}</span>
        <span class="eject_x" @click="cancel">x</span>
      </div>
      <div class="eject_name">{{detail.goodsName}}</div>
      <div class="eject_num">
        <span class="eject_sp1">购买数量</span>
        <div>
          <span class="eject_sp2" @click="reduce">-</span>
          <span class="eject_sp3">{{goods_num}}</span>
          <span class="eject_sp4" @click="add">+</span>
        </div>
      </div>
      <div class="eject_determine" @click="determine">确定</div>
    </div>
    <!-- 加入购物车，购买 -->
    <div class="car_buy">
      <div class="first" @click="goto_home">
        <img src="https://www.htmlstudio.top/imgs/others/home" />
        <span>首页</span>
      </div>
      <div class="purchase">
        <img src="@/assets/images/shopping_car.png" />
        <span>预购</span>
      </div>
      <div class="add_to_cart" @click="add_to_cart">加入购物车</div>
      <div class="buy_now" @click="bug_now">立即购买</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      isshow: false,
      goods_num: 1,
      height: "0px",
      img_height: "0px",
      perchase: false,
      goodsId: "",
      tips: [
        {
          title: "1.在线下单",
          content: "每天可购买商品时间:00:00-23:00"
        },
        {
          title: "2.物流配送",
          content:
            "每天16:00之前，物流会将您昨日购买的商品，配送到您购买时选择的自提门店"
        },
        {
          title: "3.门店自提",
          content:
            "每天16:00之后,(门店不同，到货时间会有差异),您需要到购买时选择的自提门店提货"
        },
        {
          title: "4.售后无忧",
          content:
            "如果您购买的商品有任何问题,请直接与购买的门店联系,门店将为您处理,让您售后无忧!"
        },
        {
          title: "6.XX优选全国热线",
          content:
            "r如果您找不到购物的自提门店,请致电XX优选帮帮忙热线！电话:XXXXXXXXXX"
        }
      ],
      detail: {}
    };
  },
  created() {
    this.goodsId = this.$route.params.id;
    // this.goodsId = this.$route.query.id;
    // console.log(this.goodsId)
    this.$axios
      .get(`https://xiayuhui.top:8443/search/id`, {
        params: {
          goodsId: this.goodsId
        }
      })
      .then(res => {
        this.detail = res.data;
        // console.log(this.detail)
      });
  },
  mounted() {
    if (this.$refs.pro) {
      // console.log(this.$refs.pro)
      this.$refs.pro.scrollIntoView();
    }
  },
  methods: {
    add() {
      this.goods_num++;
    },
    reduce() {
      if (this.goods_num > 1) {
        this.goods_num--;
      }
    },
    determine() {
      if (this.perchase) {
        this.$router.push({
          name: "Perchase",
          params: { id: this.goodsId, amount: String(this.goods_num) }
        });
      } else {
        this.$axios
          .get(`https://xiayuhui.top:8443/shopping/add`, {
            params: {
              goodsId: this.goodsId,
              user: sessionStorage.getItem("openid"),
              amount: this.goods_num
            }
          })
          .then(() => {
            Toast("成功加入购物车");
          });
      }
    },
    cancel() {
      this.isshow = false;
      this.perchase = false;
    },
    add_to_cart() {
      this.isshow = true;
    },
    bug_now() {
      this.isshow = true;
      this.perchase = true;
    },
    goto_home() {
      this.$router.push("/home");
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all {
  position: relative;
  width: 373px;
  margin: 2px;
  overflow: scroll;
  margin-top: 40px;
  margin-bottom: 65px;
}

/*商品介绍*/
.product_introduction {
  width: 99%;
  background: #e9ecf1;
}

.int_img1 {
  width: 100%;
  height: 350px;
  text-align: center;
}

.int_price {
  background: #26a8ff;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2px;
}

.price1 {
  font-size: 22px;
}

.price2 {
  text-decoration: line-through;
  font-size: 18x;
  color: white;
  margin-left: 10px;
  margin-top: 10px;
}

.int_n1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 65px;
  margin-bottom: 2px;
}

.int_name {
  width: 295px;
  font-size: 20px;
  overflow: scroll;
  height: 65px;
  border-bottom: 0.3px solid gray;
}

.int_pn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70px;
  font-size: 16px;
  color: #26a2ff;
  border-bottom: 0.3px solid gray;
  border-left: 0.3px solid gray;
}

.int_perple {
  font-weight: bold;
}

.shop {
  height: 50px;
  line-height: 25px;
  width: 100%;
  color: #1e90ff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.shop_number {
  margin-top: 20px;
  margin-right: 5px;
}

/*商品详情*/
.product_detail {
  width: 98%;
  background: #e9ecf1;
  margin: 3px 3px;
  border-radius: 5px;
  text-align: center;
}

.detail1 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 4px;
  padding-top: 5px;
}

.detail2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.detail3 {
  font-size: 16px;
  letter-spacing: 0.6px;
  padding-bottom: 12px;
}

/*购物指南*/
.shopping_directory {
  background: #e9ecf1;
  border-radius: 5px;
  margin: 3px 3px;
}

.dir_name {
  padding-top: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 4px;
  text-align: center;
}

.title {
  font-weight: bold;
  line-height: 22px;
}

.content {
  color: gray;
}

/*弹出购物车、购买*/
.eject_content {
  width: 370px;
  bottom: 66.7px;
  left: 1px;
  position: fixed;
  background-color: white;
  opacity: 0.8;
}

.pic_price img {
  width: 100px;
  height: 100px;
}

.pic_price .eject_money {
  color: #26a2ff;
  font-weight: bold;
  margin-left: 15px;
  font-size: 18px;
}

.pic_price .eject_x {
  color: gray;
  float: right;
  font-size: 20px;
  margin: 8px;
}

.eject_name {
  font-size: 30px;
  width: 80%;
  margin: 0 auto;
}

.eject_num {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.eject_sp1 {
  font-size: 18px;
  color: gray;
  margin-left: 10px;
}

.eject_num div {
  margin-right: 10px;
  font-size: 22px;
}

.eject_sp3 {
  margin: 0 3px;
}

.eject_determine {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #e9ecf1;
  background-color: #26a2ff;
}

/*购物车、购买*/
.car_buy {
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  position: fixed;
  bottom: 0px;
  background: #e9ecf1;
}

.first {
  display: flex;
  flex-direction: column;
}

.first img {
  width: 40px;
  height: 40px;
}

.purchase {
  display: flex;
  flex-direction: column;
}

.purchase img {
  width: 40px;
  height: 40px;
}

.add_to_cart {
  margin-left: 75px;
  height: 60px;
  width: 120px;
  color: white;
  font-size: 20px;
  line-height: 60px;
  background: orange;
}

.buy_now {
  height: 60px;
  width: 100px;
  color: white;
  font-size: 20px;
  line-height: 60px;
  background: red;
}
</style>
