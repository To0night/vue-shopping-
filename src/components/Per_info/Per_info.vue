<template>
  <div>
    <div class="my">
      <div class="user">
        <img :src="userImg" />
        <div class="userName">{{userName}}</div>
      </div>
      <!-- 		我的订单 -->
      <div class="order">
        <div class="myOrder">我的订单</div>
        <div class="line"></div>

        <div class="order_detail">
          <div class="order_detail01" v-for="(item,index) in orders" :key="index" @click="order(item.id)">
            <img :src="item.src" />
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>

      <div class="myMsg">
        <div class="myMsg1">
          <div class="myMsg01">我的信息</div>
          <div class="revise" @click="revise_message">{{revise_msg}}</div>
        </div>
        <div class="myname">
          姓名：
          <input type="text" :disabled="disabled" v-model="person.name" />
        </div>
        <div class="myphone">
          电话：
          <input type="text" :disabled="disabled" v-model="person.telephone" />
        </div>
        <div class="getgoods">自提点</div>
        <div class="place">
          <span
            v-for="item in places"
            :id="item.id"
            :key="item.id"
            :style="{background:item.bac,color:item.col}"
            @click="replace"
          >{{item.place}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      person: {
        name: "wzp",
        telephone: "13272009464",
        place: "place_1"
      },
      disabled: true,
      userName: "天天买家",
      revise_msg: "修改信息",
      userImg: require("@/assets/self.png"),
      places: [
        {
          id: 1,
          place: "place_1",
          bac: "#e9ecf1",
          col: "black"
        },
        {
          id: 2,
          place: "place_2",
          bac: "#e9ecf1",
          col: "black"
        },
        {
          id: 3,
          place: "place_3",
          bac: "#e9ecf1",
          col: "black"
        },
        {
          id: 4,
          place: "place_4",
          bac: "#e9ecf1",
          col: "black"
        },
        {
          id: 5,
          place: "place_5",
          bac: "#e9ecf1",
          col: "black"
        }
      ],
      orders: [
        {
          id: 1,
          src: require("@/assets/images/orders.png"),
          title: "全部订单"
        },
        { id: 2, src: require("@/assets/images/w_p.png"), title: "待付款" },
        { id: 3, src: require("@/assets/images/w_g.png"), title: "待提货" },
        { id: 4, src: require("@/assets/images/w_g.png"), title: "已提货" }
      ]
    };
  },
  created() {
    this.person.name = this.getPersonal.name;
    this.person.telephone = this.getPersonal.telephone;
    this.person.place = this.getPersonal.place;
    this.places.forEach(item => {
      if (item.place == this.person.place) {
        item.bac = "#26a2ff";
        item.col = "white";
      } else {
        item.bac = "#e9ecf1";
        item.col = "black";
      }
    });
  },
  computed: {
    ...mapGetters(["getPersonal"])
  },
  methods: {
    ...mapMutations(["setPersonal"]),
    revise_message(e) {
      this.revise_msg = this.revise_msg == "修改信息" ? "完成修改" : "修改信息";
      this.disabled = this.disabled == true ? false : true;
      this.setPersonal(this.person);
      // console.log(this.getPersonal)
    },
    order(id) {
      this.$router.push({ name: "Order_status", params: {id} });
    },
    replace(e) {
      let id = e.currentTarget.id;
      // console.log(e.currentTarget)
      if (!this.disabled) {
        this.places.forEach(item => {
          if (item.id == id) {
            item.bac = "#26a2ff";
            item.col = "white";
            this.person.place = item.place;
          } else {
            item.bac = "#e9ecf1";
            item.col = "black";
          }
        });
      }
    }
  },
  watch: {
    getPersonal: function(newV, oldV) {
      console.log(newV);
      // this.setPersonal(this.person)
      console.log("00");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my {
  width: 100%;
  position: relative;
}
.user {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 200px;
  background: #26a2ff;
}
.user img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: 10px 10px;
}
.userName {
  line-height: 90px;
  font-size: 20px;
}
.order {
  width: 94%;
  height: 165px;
  position: absolute;
  top: 110px;
  left: 3%;
  background: skyblue;
  border-radius: 5px;
  color: #226;
}
.myOrder {
  line-height: 25px;
  margin: 15px 10px 10px;
  font-size: 20px;
}
.line {
  border-bottom: 1px solid #e9ecf1;
}
.order_detail {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}
.order_detail01 {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.order_detail img {
  width: 60px;
  height: 60px;
}
.order_detail span {
  font-size: 18px;
}
.myMsg {
  background: #e9ecf1;
  margin: 100px 10px 10px 10px;
  font-size: 18px;
}
.myMsg1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  border-bottom: 1px solid white;
}
.myMsg01 {
  margin: 10px 10px 10px;
}
.revise {
  margin: 10px 15px 10px;
}
.myname {
  margin: 5px 5px;
}
.myphone {
  margin: 5px 5px;
}
.getgoods {
  margin: 5px 5px;
}
.place {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.place span {
  border-radius: 25%;
}
</style>
