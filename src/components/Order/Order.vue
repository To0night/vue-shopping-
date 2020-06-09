<template>
  <div>
    <!-- 支付页面 -->
    <div class="all">
      <div class="order_status">
        <div class="status1">1</div>
        <div class="d1"></div>
        <div class="d2"></div>
        <div class="status2">2</div>
      </div>

      <div class="order_money">
        <div class="order_m">订单金额</div>
        <div class="money">￥{{money}}</div>
        <div class="pay_method">
          支付方式
          <img src="@/assets/images/wechat.png" />微信支付
        </div>
      </div>

      <div class="go_pay" @click="go_pay">去付款</div>

      <!-- 确认支付 -->
      <div v-show="isshow" class="confirm-pay">
        <div class="delete">
          <div class="del-x" @click="remove">x</div>
          <div class="del-use">使用密码</div>
        </div>
        <div class="sky-company">天天有限公司</div>
        <div class="pay-price">￥{{money}}</div>
        <div class="line"></div>
        <div class="pay-way">
          <div class="pay1">支付方式</div>
          <div class="pay2">
            <img
              src="@/assets/images/diamont.png"
              style="width: 20px;height: 20px;margin-left: 100px"
            />零钱通
          </div>
        </div>
        <div class="con-payment" @click="pay">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: 0,
      isshow: false,
      orderId: "",
      amount: ""
    };
  },
  created() {
    this.amount = this.$route.params.amount;
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.orderid = this.$route.params.orderid;
      this.money = this.$route.params.money;
    } else {
      this.orderid = this.$route.params.orderid;
      this.money = this.$route.params.money;
    }
    // console.log(this.$route.params.price)
  },
  methods: {
    go_pay() {
      this.isshow = this.isshow === true ? false : true;
    },
    remove() {
      this.isshow = this.isshow === true ? false : true;
    },
    pay() {
      this.$axios
        .get(`https://xiayuhui.top:8443/order/payForOrder`, {
          params: {
            userId: sessionStorage.getItem("openid"),
            orderId: this.orderid
          }
        })
        .then(() => {
          this.$router.push({
            name: "Order_detail",
            params: { orderid: this.orderid, amount: this.amount }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.all {
  width: 100%;
}
.order_status {
  width: 98%;
  margin: 0 1%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  .status1 {
    height: 20px;
    width: 20px;
    margin-left: 20px;
    color: #e9ecf1;
    background-color: green;
    border-radius: 50%;
  }
  .d1 {
    width: 142px;
    height: 2px;
    margin: 8px 2px;
    background-color: green;
  }
  .d2 {
    width: 142px;
    height: 2px;
    margin: 8px 2px;
    background-color: #d0d0d0;
  }
  .status2 {
    height: 20px;
    width: 20px;
    color: white;
    background-color: #d0d0d0;
    border-radius: 50%;
  }
}
.order_money {
  width: 98%;
  height: 200px;
  margin: 0 1%;
  background-color: #e9ecf1;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .order_m {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .money {
    margin-top: 15px;
    font-size: 25px;
    color: #26a2ff;
    font-weight: bolder;
  }
  .pay_method {
    margin-top: 68px;
    font-size: 16px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}

.go_pay {
  text-align: center;
  margin: 40px 8%;
  height: 40px;
  line-height: 40px;
  background-color: #26a2ff;
  color: #e9ecf1;
  border-radius: 20px;
}
//确认支付
.confirm-pay {
  position: fixed;
  left: 10%;
  top: 25%;
  width: 80%;
  background: #e9ecff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .delete {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
    .del-x {
      margin: 10px;
      color: rgb(91, 106, 145);
    }
    .del-use {
      margin: 10px;
      color: rgb(91, 106, 145);
    }
  }
  .sky-company {
    font-size: 20px;
    font-weight: 400;
  }
  .pay-price {
    font-size: 25px;
    font-weight: 600;
    margin: 30px 0;
  }
  .line {
    height: 1px;
    width: 80%;
    margin: 0 auto;
    background: gray;
  }
  .pay-way {
    width: 100%;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
    .pay1 {
      margin: 20px 10px;
    }
    .pay2 {
      margin: 20px 10px;
    }
  }
  .con-payment {
    width: 140px;
    height: 40px;
    font-size: 20px;
    color: #e9ecf1;
    line-height: 40px;
    text-align: center;
    background: #26a2ff;
    border-radius: 20px;
    margin-bottom: 20px;
  }
}
</style>
