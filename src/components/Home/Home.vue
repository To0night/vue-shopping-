<template>
  <!-- home页面 -->
  <div id="containt">
    <!-- 标题 -->
    <div class="market_title">
      <span>做一家有温度的社区电商</span>
    </div>
    <!-- 搜索区域 -->
    <Search></Search>
    <!--     <div class='input_div'>
      <mt-search v-model="serchValue"
          cancel-text="取消" placeholder="搜索"
          @focus='search_goods' class='search'>
      </mt-search>
    </div>-->
    <div class="input_cate">
      <!-- 种类区域 -->
      <div class="food_cate">
        <div
          class="food_selecte"
          @click="choose_cate"
          v-for="item in food_cate"
          :id="item.id"
          :key="item.id"
        >
          <img :src="item.img_src" />
          <span>{{item.food_name}}</span>
        </div>
      </div>
      <!-- 更多 -->
      <div class="more">更多</div>
    </div>
    <!-- 推荐区域 -->
    <div class="Recommend_area">
      <div
        class="rec_item"
        v-for="item in goods_arr"
        :key="item.goodsId"
        :id="item.goodsId"
        @click="choose_detail($event)"
      >
        <div class="rec_provide">由{{item.shopName}}独家提供</div>
        <div class="rec_goods">
          <img v-lazy="item.goodsPic" />
          <div class="goods_detail">
            <div class="goods_name">{{item.goodsName}}</div>
            <div class="goods_mail">包邮</div>
            <div class="buy">
              <span class="b_money">￥</span>
              <span class="b_price">{{item.goodsPrice}}</span>
              <img :src="carIcon" @click="add_to_cart(item,$event)" :id="item.goodsId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search/Search";
import { Toast } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      serchValue: "",
      cart: {
        number: 1,
        goodsId: 0
      },
      carts: [],
      len: 0,
      carIcon: require("@/assets/images/shopping_car.png"),
      goods_arr: [],
      food_cate: [
        {
          id: 1,
          img_src: require("@/assets/images/fruit.png"),
          food_name: "水果馆"
        },
        {
          id: 2,
          img_src: require("@/assets/images/vegtable.png"),
          food_name: "蔬菜馆"
        },
        {
          id: 3,
          img_src: require("@/assets/images/cookie.jpg"),
          food_name: "休闲零食馆"
        },
        {
          id: 4,
          img_src: require("@/assets/images/Seasoning.jpg"),
          food_name: "粮油调味馆"
        },
        {
          id: 5,
          img_src: require("@/assets/images/furniture.jpg"),
          food_name: "家居清理馆"
        },
        {
          id: 6,
          img_src: require("@/assets/images/clothes.jpg"),
          food_name: "服饰穿戴馆"
        },
        {
          id: 7,
          img_src: require("@/assets/images/meat.png"),
          food_name: "肉肉馆"
        },
        {
          id: 8,
          img_src: require("@/assets/images/egg.png"),
          food_name: "豆腐馆"
        },
        {
          id: 9,
          img_src: require("@/assets/images/fish.png"),
          food_name: "水产馆"
        }
      ]
    };
  },
  created() {
    sessionStorage.setItem(`openid`, `oirXv0KkAGi93DA79GEKFj9FUZVw`);
    this.$axios
      .get(`https://xiayuhui.top:8443/search/suiji`)
      .then(res => {
        this.goods_arr = res.data;
        // console.log(this.goods_arr);
      })
      .then(res => {
        // console.log('未找到goods_arr数据');
      });
  },
  watch: {
    // $route: function(newR, oldR) {
    // 	this.setCarts(this.carts)
    // }
  },
  computed: {
    ...mapGetters(["getCarts"])
  },
  methods: {
    // add_to_cart(goods, event) {
    // 	event.stopPropagation()
    // 	let gid = goods.goodsId
    // 	let repeat = false
    // 	this.carts = this.getCarts
    // 	this.carts.forEach((item, index) => {
    // 		if (item.goodsId === gid) {
    // 			// console.log(item.goodsId)
    // 			this.carts[index].number++
    // 			repeat = true
    // 		}
    // 	})
    // 	if (!repeat) {
    // 		this.cart.goodsId = gid
    // 		this.cart.number = 1
    // 		// console.log(this.cart)
    // 		let car = JSON.parse(JSON.stringify(this.cart))
    // 		this.carts.push(car)
    // 	}
    // 	console.log(this.carts)
    // },
    ...mapMutations(["setCarts"]),
    add_to_cart(goods, e) {
      let goodsId = e.target.id;
      this.$axios
        .get(`https://xiayuhui.top:8443/shopping/add`, {
          params: { goodsId, user: sessionStorage.getItem("openid"), amount: 1 }
        })
        .then(() => {
          Toast("成功加入购物车");
        });
      e.stopPropagation();
    },
    choose_cate(event) {
      // console.log(event.currentTarget.id)
      let id = event.currentTarget.id;
      this.$router.push({
        name: "Cate",
        params: { id }
      });
    },
    choose_detail(e) {
      let id = e.currentTarget.id;
    //   console.log(id);
      this.$router.push({
        name: "Detail",
        params: { id }
      });
    }
  },
  components: {
    Search
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#containt {
  width: 100%;
  background-color: #e9ecf1;
  min-height: 500px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 标题栏 */
.market_title {
  background: #26a2ff;
  text-align: center;
  height: 40px;
  width: 100%;
  line-height: 40px;
  color: #e9ecf1;
}

/* 分类 */
.input_cate {
  background: white;
  padding: 5px;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 5px;
  border-radius: 5px;
}

.food_cate {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.food_selecte {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-top: 5px;
}

.span {
  font-size: 16px;
}

.food_cate img {
  width: 40px;
  height: 40px;
}

/*更多*/
.more {
  width: 70%;
  border-radius: 20px;
  margin: 10px auto;
  text-align: center;
  background: #26a2ff;
  color: white;
}

/* 推荐区域 */
.Recommend_area {
  background-color: #e9ecf1;
  width: 94%;
  margin: 5px auto 5px;
  border-radius: 5px;
}

.rec_item {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background: white;
  margin-top: 5px;
}

.rec_provide {
  margin: 0 auto;
  font-size: 16px;
}

.rec_goods {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 2px auto 2px;
}

.rec_goods img {
  width: 130px;
  height: 130px;
}

.goods_detail {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.goods_name {
  width: 100%;
  height: 54%;
  margin: 2px 2px;
  overflow: hidden;
  font-size: 18px;
}

.goods_mail {
  margin-left: 5px;
  opacity: 0.5;
}

.buy {
  width: 100%;
  height: 20px;
  margin-left: 5px;
}

.b_money {
  font-size: 20px;
  font-weight: bold;
}

.b_price {
  font-size: 20px;
  font-weight: bold;
}

.buy img {
  width: 30px;
  height: 30px;
  margin-left: 45%;
}
</style>
