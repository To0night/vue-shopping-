<template>
  <div>
    <!-- 订单详情页面 -->
    <div class="all">
      <!-- 已付款 -->
      <div class="payment-received">
        <div class="payed">
          <img src="@/assets/images/n_pay.png" width="20px;height:20px" />已付款
        </div>
        <div>
          <img src="@/assets/images/flower.jpg" style="height: 3px;width: 100%" />
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="person-msg">
        <div class="person">收货人：{{person.name}}</div>
        <div class="tel">电话：{{person.telephone}}</div>
        <div class="place">自提点：{{person.place}}</div>
      </div>
      <!-- 商品信息 -->
      <div class="shop-msg" v-for="(item) in goods" :key="item.goodsId">
        <img :src="item.goodsPic" alt="商品图片" />
        <div class="shop-msg1">
          <div class="name">{{item.goodsName}}</div>
          <div class="price">
            <div class="price1">
              <span class="p1">￥{{item.goodsPrice}}</span>
              <span class="p2">￥{{item.goodsPrice+10}}</span>
            </div>
            <div class="num">x{{item.amount}}</div>
          </div>
        </div>
      </div>
      <!-- 订单号 -->
      <div class="order-id">订单号编号{{orderId}}</div>
      <!-- 购物须知 -->
      <div class="purchase-notes">
        <div>1.如果您购买的商品有任何问题，请直接与购买的门店联系！门店将为您处理，让你购买无忧</div>
        <div>2.如果您找不到购物的提货门店，请致电天天商城热线xxxxxxxxxxx</div>
      </div>
      <!-- 提货 -->
      <div class="take-goods">
        <div class="total">合计</div>
        <div class="money">￥{{shoppingPrice}}</div>
        <div class="go-take-goods" @click="take_goods">{{tips}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      person: {},
      goods: [],
      shoppingPrice: "100",
      title: "",
      tips: "去提货",
      sta: "",
      orderId: "255"
    };
  },
  created() {
    this.person = this.getPersonal;
    this.amount = this.$route.params.amount;
    this.orderId = this.$route.params.orderid;
    this.$axios
      .get(`https://xiayuhui.top:8443/order/xiang`, {
        params: { orderId: this.$route.params.orderid }
      })
      .then(res => {
        console.log(res);
        this.goods = res.data.goods;
        this.shoppingPrice = res.data.order.orderPrice;
        this.orderId = res.data.order.orderId;
        if (res.data.order.orderState == `0`) {
          this.title = "未支付";
          this.tips = "去付款";
        } else if (res.data.order.orderState == `1`) {
          this.title = "已付款";
          this.tips = "去提货";
        } else if (res.data.order.orderState == `2`) {
          this.title = "交易完成";
          this.tips = "确定";
        }
      });
  },
  methods: {
    take_goods() {
      if (this.tips == "去提货") {
        this.$axios
          .get(`https://xiayuhui.top:8443/order/finished`, {
            params: {
              userId: sessionStorage.getItem("openid"),
              orderId: this.orderId
            }
          })
          .then(() => {
            this.tips = `已提货`;
            Toast("提货成功");
          });
      } else if (this.tips == "去付款") {
        this.$router.push({
          name: "order",
          params: {
            money: this.shoppingPrice,
            orderid: this.orderId,
            amount: this.amount
          }
        });
      } else {
        console.log(1);
      }
    }
  },
  computed: {
    ...mapGetters(["getPersonal"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.all {
  width: 100%;
  background: #e9ecf1;
}
//已付款
.payment-received {
  width: 100%;
  background: white;
  .payed {
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    padding-top: 10px;
  }
}
// 用户信息
.person-msg {
  margin: 10px 1%;
  background: white;
  width: 98%;
  height: 100px;
  font-size: 20px;
  font-weight: 600;
}
//商品信息
.shop-msg {
  width: 98%;
  background: white;
  margin: 10px 1%;
  display: flex;
  flex-direction: row;
  img {
    width: 120px;
    height: 120px;
    margin: auto 0;
  }
  .shop-msg1 {
    width: 255px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-size: 20px;
      margin: 10px;
      overflow: auto;
    }
    .price {
      position: relative;
      font-size: 18px;
      width: 100%;
      height: 40px;
      .price1 {
        float: left;
        margin: 10px;
        .p1 {
          font-size: 20px;
          color: #26a2ff;
        }
        .p2 {
          font-size: 16px;
          text-decoration: line-through;
        }
      }
      .num {
        float: right;
        margin: 10px;
      }
    }
  }
}
.order-id {
  margin: 10px 5px;
  font-size: 18px;
  opacity: 0.5;
  background: white;
}
.purchase-notes {
  width: 98%;
  margin: 10px 1%;
  font-size: 16px;
  letter-spacing: 1px;
  opacity: 0.5;
  background: white;
  div {
    margin: 8px 5px;
  }
}
.take-goods {
  position: fixed;
  bottom: 0px;
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 3;
  line-height: 55px;
  font-size: 20px;
  background: #e9ecf1;
  .money {
    margin: 0 20px 0 10px;
    color: #26a2ff;
    font-weight: 500;
  }
  .go-take-goods {
    width: 120px;
    background: #26a2ff;
    text-align: center;
    color: white;
  }
}
</style>
