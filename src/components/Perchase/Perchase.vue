<template>
  <div>
    <!--   提交订单的结算页面 -->
    <div class="all">
      <!-- 收货人信息 -->
      <div class="person_msg">
        <div class="person_per">收货人</div>
        <div class="msg_input">
          <div class="person_name">
            <span>姓名</span>
            <input type="text" v-model="person.name" />
          </div>
          <div class="person_phone">
            <span>电话</span>
            <input type="tel" v-model="person.telephone" />
          </div>
        </div>
        <img src="@/assets/images/flower.jpg" style="height: 3px;width: 100%" />
      </div>
      <!-- 提取点 -->
      <div class="extraction_point">
        <div class="point1">自提点：</div>
        <div class="point2">
          <input list="place" :placeholder="person.place" type="text" @click="check_place" />
          <datalist id="place">
            <option v-for="(item,index) in  place" :key="index" :value="item"></option>
          </datalist>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="all_shoping">
        <div class="shoping" v-for="item in goods" :key="item.goodsId">
          <img width="130px" height="130px" :src="item.goodsPic" />
          <div class="detail">
            <div class="shoping_name">{{item.goodsName}}</div>
            <div class="shoping_price">
              <div class="price1">￥{{item.goodsPrice}}</div>
              <div class="price2">￥{{item.goodsPrice+15}}</div>
              <div class="shoping_num">x{{item.amount}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 售后 -->
      <div class="after_sale">
        <div>1.如果您购买的商品有任何问题，请直接与购买的门店联系！门店将为您处理，让你购买无忧</div>
        <div>2.如果您找不到购物的提货门店、请致电星星商城热线XXXXXXXXXXX</div>
      </div>
      <!-- 提交订单 -->
      <div class="submit_order">
        <span class="total">合计:</span>
        <div class="total_price">￥{{shoppingPrice}}</div>
        <div class="submit" @click="submit_order">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      person: {
        name: "",
        telephone: "",
        place: ""
      },
      per_info: "",
      goods: [],
      shoppingPrice: "",
      place: ["palce_1", "palce_2", "palce_3", "palce_4", "palce_5"],
      amount: ""
    };
  },
  created() {
    // console.log(this.getPersonal)
    this.person.name = this.getPersonal.name;
    this.person.telephone = this.getPersonal.telephone;
    this.person.place = this.getPersonal.place;
    this.goodsId = this.$route.params.id;
    this.amount = this.$route.params.amount;
    // console.log(this.amount)
    // console.log(this.goodsId)
    if (this.$route.params.id) {
      this.$axios
        .get(`https://xiayuhui.top:8443/search/id`, {
          params: {
            goodsId: this.goodsId
          }
        })
        .then(res => {
          let good = {};
          good.goodsId = res.data.goodsId;
          good.goodsPic = res.data.goodsPic;
          good.goodsName = res.data.goodsName;
          good.goodsPrice = res.data.goodsPrice;
          good.amount = this.amount;
          this.goods.push(good);
          // console.log(this.goods)
          this.shoppingPrice = this.amount * this.goods[0].goodsPrice;
          //  console.log(this.shoppingPrice)
        });
    } else {
      this.$axios(`https://xiayuhui.top:8443/shopping/findAll`, {
        params: {
          user: sessionStorage.getItem("openid")
        }
      }).then(res => {
        this.goods = res.data.shopping;
        this.shoppingPrice = res.data.shoppingPrice;
      });
    }

    this.$axios(`https://xiayuhui.top:8443/user/findUser`, {
      params: {
        userId: sessionStorage.getItem("openid")
      }
    }).then(res => {
      this.per_info = res.data;
    });
  },
  methods: {
    ...mapMutations(["setPersonal"]),
    submit_order() {
      // console.log(this.person)
      this.setPersonal(this.person);
      // let price = this.shoppingPrice
      // this.$router.push({name:'Order', params:{price}})

      if (this.goodsId) {
        let params = {
          userId: sessionStorage.getItem("openid"),
          goodsId: this.goods[0].goodsId,
          amount: this.goods[0].amount,
          userRealname: this.per_info.userRealname,
          userPhone: this.per_info.userPhone
        };
        this.$axios
          .get(`https://xiayuhui.top:8443/order/generateA`, {
            params
          })
          .then(res => {
            if (res.data == 0) Toast("提交失败");
            else Toast("提交成功");
            this.$router.push({
              name: "Order",
              params: {
                money: this.shoppingPrice,
                orderid: res.data,
                amount: this.goods[0].amount
              }
            });
          });
      } else {
        // console.log("购物车");
        let params = {
          userId: sessionStorage.getItem("openid"),
          userRealname: this.per_info.userRealname,
          userPhone: this.per_info.userPhone
        };
        this.$axios
          .get(`https://xiayuhui.top:8443/order/generate`, {
            params
          })
          .then(res => {
            console.log(res);
            if (res.data == 0) Toast("提交失败");
            else Toast("提交成功");
            this.$router.push({
              name: "Order",
              params: {
                money: this.shoppingPrice,
                orderid: res.data
              }
            });
          });
      }
    },
    check_place(e) {
      this.person.place = e.target.value;
      // console.log(e.target.value)
    }
  },
  computed: {
    ...mapGetters(["getPersonal"])
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.all {
  width: 100%;
}

// 收货人信息
.person_msg {
  width: 98%;
  margin: 0 1%;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #e9ecf1;

  .person_per {
    margin: 0 5px;
    font-size: 18px;
  }

  .msg_input {
    display: flex;
    flex-direction: row;

    .person_name {
      width: 50%;

      span {
        width: 25px;
        margin: 2px 5px;
      }

      input {
        width: 120px;
      }
    }

    .person_phone {
      width: 50%;

      span {
        width: 25px;
        margin: 2px 5px;
      }

      input {
        width: 120px;
      }
    }
  }
}

// 自提点
.extraction_point {
  width: 98%;
  height: 40px;
  margin: 5px 1%;
  background-color: #e9ecf1;
  display: flex;
  flex-direction: row;
  line-height: 40px;

  .point1 {
    font-size: 18px;
    color: #26a2ff;
  }

  // .point2 {}
}

// 商品信息
.all_shoping {
  width: 98%;
  margin: 5px 1%;

  .shoping {
    width: 100%;
    background-color: #e9ecf1;
    display: flex;
    flex-direction: row;
    margin: 5px 0;

    img {
      width: 130px;
      height: 130px;
    }

    .detail {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .shoping_name {
        font-size: 18px;
      }

      .shoping_price {
        display: flex;
        flex-direction: row;
        line-height: 20px;

        .price1 {
          font-size: 20px;
          color: #26a2ff;
          font-weight: bold;
          margin-left: 15px;
        }

        .price2 {
          font-size: 16px;
          margin-left: 8px;
          text-decoration: line-through;
        }

        .shoping_num {
          font-size: 16px;
          margin-left: 70px;
        }
      }
    }
  }
}

// 售后
.after_sale {
  width: 98%;
  margin: 5px 1%;
  background-color: #e9ecf1;
  font-size: 15px;
  color: gray;

  div {
    margin: 10px 2px;
  }

  margin-bottom: 60px;
}

//提交订单
.submit_order {
  width: 100%;
  height: 50px;
  background-color: #e9ecf1;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  line-height: 50px;
  font-size: 18px;

  .total {
    margin: 0 5px;
    margin-left: 38%;
  }

  .total_price {
    font-size: 18px;
    color: #26a2ff;
    font-weight: bold;
  }

  .submit {
    background-color: #26a2ff;
    color: #e9ecf1;
    padding: 0 20px;
    margin-left: 23px;
  }
}
</style>
