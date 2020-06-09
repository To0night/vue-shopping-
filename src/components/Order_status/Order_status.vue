<template>
  <div class="z">
    <!-- 订单管理页面 -->
    <div class="all">
      <!-- 管理订单 -->
      <div class="order-manage">
        <div
          class="order-manage1"
          :style="{color:item.color}"
          v-for="item in status"
          :key="item.id"
          :id="item.id"
          @click="selectOrderStatus(item.id)"
        >{{item.title}}</div>
      </div>
      <!-- 订单列表 -->
      <div class="order"  v-for="item in orders" :key="item.orderId" :id="item.orderId">
        <div class="order1">
          <div class="order-num">订单号{{item.orderId}}</div>
          <div class="order-person">收货人{{item.userRealname}}</div>
        </div>
        <div class="order2">
          <div class="order-status">订单状态：{{item.orderState==0?`未付款`:`已付款`}}</div>
          <div class="order-price">￥{{item.orderPrice}}</div>
          <div class="order-take" @click='take_goods(item.orderId)'>{{item.tips}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      status: [
        { id: 1, color: "lightgrey", title: "全部订单" },
        { id: 2, color: "lightgrey", title: "待付款" },
        { id: 3, color: "lightgrey", title: "待提货" },
        { id: 4, color: "lightgrey", title: "已提货" }
      ],
      orders: [],
      orderStutas_1: [],
      orderStutas_2: [],
      orderStutas_3: [],
      orderStutas_4: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$axios
      .get(`https://xiayuhui.top:8443/order/searchAll`, {
        params: { userId: sessionStorage.getItem("openid") }
      })
      .then(res => {
        res.data.forEach(value => {
          this.orderStutas_1.push(value);
          if (value.orderState == 0) {
            this.orderStutas_2.push(value);
            value.tips = "去付款";
          } else if (value.orderState == 1) {
            this.orderStutas_3.push(value);
            value.tips = "去提货";
          } else if (value.orderState == 2) {
            this.orderStutas_4.push(value);
            value.tips = "已提货";
          }
        });
      });
    switch (this.$route.params.id) {
      case 1:
        this.orders = this.orderStutas_1;
        break;
      case 2:
        this.orders = this.orderStutas_2;
        break;
      case 3:
        this.orders = this.orderStutas_3;
        break;
      case 4:
        this.orders = this.orderStutas_4;
        break;
    }
    this.m2other(this.$route.params.id);
  },
  methods: {
    selectOrderStatus(id) {
      this.status.forEach((item, index) => {
        // console.log(item)
        if (item.id === id) {
          this.status[index].color = "#26a2ff";
        } else {
          this.status[index].color = "lightgray";
        }
      });
      if (id == 1) {
        this.orders = this.orderStutas_1;
      } else if (id == 2) {
        this.orders = this.orderStutas_2;
      } else if (id == 3) {
        this.orders = this.orderStutas_3;
      } else if (id == 4) {
        this.orders = this.orderStutas_4;
      }
    },
    take_goods(id){
      this.$router.push({ name: "Order_detail", params: { orderid: id } });
    }
  },
  watch: {
    id: function(newId, oldId) {
      this.status.forEach((item, index) => {
        // console.log(item)
        if (item.id === newId) {
          this.status[index].color = "#26a2ff";
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.z {
  background: #e9ecf1;
}
.all {
  width: 100%;
  background: #e9ecf1;
}
// 订单管理
.order-manage {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: white;
  height: 40px;
  line-height: 40px;
  .order-manage1 {
    width: 25%;
    text-align: center;
    font-size: 18px;
    // opacity: 0.5;
    border: 1px solid rgb(219, 215, 215);
  }
}
// 订单列表
.order {
  width: 98%;
  height: 120px;
  margin: 5px 1%;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .order1 {
    opacity: 0.5;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .order-num {
      margin: 10px;
    }
    .order-person {
      margin: 10px;
    }
  }
  .order2 {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #26a2ff;
    .order-status {
      font-size: 15px;
      font-weight: 600;
      margin: 10px;
    }
    .order-price {
      font-size: 20px;
      font-weight: 600;
      margin: 0 10px;
    }
    .order-take {
      font-size: 18px;
      line-height: 25px;
      font-weight: 500;
      margin: 10px;
      width: 100px;
      height: 25px;
      text-align: center;
      border: 1px solid #26a2ff;
      border-radius: 10px;
    }
  }
}
</style>
