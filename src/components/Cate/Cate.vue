<template>
  <div>
    <!--     <Search></Search> -->
    <!-- 商品列表 -->
    <div class="cate">
      <div class="cate_title">
        <div
          class="title"
          v-for="(item, index) in cate_arr"
          :id="item.typeId"
          :key="item.typeId"
          :class="{active: index==isshow}"
          @click="choose_cate(item)"
        >{{item.typeName}}</div>
      </div>
        <!-- 商品详情 -->
      <div class="cate_content">
        <div
          class="content"
          v-for="(item,index) in cate_goods"
          :key="index"
          :id="item.goodsId"
          ref="goods"
          @click="choose_detail(item.goodsId)"
        >
          <img v-lazy="item.goodsPic" />
          <div class="con_1">
            <div class="con_name">{{item.goodsName}}</div>
            <div class="con_01">
              <span class="perple">关注人数</span>
              <span class="number">{{12}}万</span>
            </div>
          </div>
          <div class="con_2">
            <span class="provide">{{item.shopName}}</span>
            <span class="limit">限量10000份</span>
          </div>
          <div class="con_3">
            <span class="price">￥{{item.goodsPrice}}</span>
            <div @click="addcar" :id='item.goodsId' class="car">购物车</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search/Search";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      isshow: -1,
      cate_arr: [
        {
          typeId: 1,
          typeName: "水果馆"
        },
        {
          typeId: 2,
          typeName: "蔬菜馆"
        },
        {
          typeId: 3,
          typeName: "休闲零食馆"
        },
        {
          typeId: 4,
          typeName: "粮油调味馆"
        },
        {
          typeId: 5,
          typeName: "家居清理馆"
        },
        {
          typeId: 6,
          typeName: "服饰穿戴馆"
        },
        {
          typeId: 7,
          typeName: "肉肉馆"
        },
        {
          typeId: 8,
          typeName: "豆腐馆"
        },
        {
          typeId: 9,
          typeName: "水产馆"
        }
      ],
      cate_goods: [],
      cate_color: "grey",
      cate_item: {}
    };
  },
  created() {
    this.minHeight = parseInt(this.getHeight);

    if (this.$route.params.id) {
      this.cate_item = this.cate_arr[this.$route.params.id - 1];
      console.log(this.cate_item);
      this.choose_cate(this.cate_item);
    } else {
      this.choose_cate(this.cate_arr[0]);
    }
  },
  methods: {
    choose_cate(item) {
      if (this.$refs.goods instanceof Array) {
        this.$refs.goods[0].scrollIntoView();
      }
      this.cate_detail(item.typeId);
      this.isshow = item.typeId - 1;
    },
    cate_detail(id) {
      this.$axios
        .get(`https://xiayuhui.top:8443/search/type`, {
          params: { type: id }
        })
        .then(res => {
          this.cate_goods = res.data;
          // console.log(this.cate_goods)
        });
    },
    addcar(e) {
      e.target.style.color = "blue";
      e.target.style.background = "#98F5FF";
      let goodsId = e.target.id;
      console.log(goodsId)
      this.$axios
        .get(`https://xiayuhui.top:8443/shopping/add`, {
          params: { goodsId, user: sessionStorage.getItem("openid"), amount: 1 }
        })
        .then(() => {
          Toast("成功加入购物车");
        });

      e.stopPropagation();
    },
    choose_detail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  },
  computed: {
    ...mapGetters(["getHeight"])
  },
  components: {
    Search
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cate {
  width: 100%;
  position: relative;
  margin: 2px 0;
}
/*标题*/
.cate_title {
  position: fixed;
  float: left;
  width: 28%;
}
.title {
  width: 100%;
  height: 50px;
  background: skyblue;
  color: #226;
  line-height: 50px;
  text-align: center;
  border: 1px solid #26a2ff;
}
.active {
  color: black;
  background: #25a2ee;
}
/*内容*/
.cate_content {
  width: 70%;
  float: right;
}
.content {
  width: 100%;
  margin: 2px 0 5px;
  display: flex;
  flex-flow: column wrap;
  background: #e9ecf1;
}
.content img {
  width: 98%;
}
.con_1 {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  flex-direction: space-between;
}
.con_name {
  width: 70%;
  height: 100px;
  overflow: hidden;
  font-size: 25px;
  margin: 3px 3px;
  font-weight: bold;
  color: #335;
}
.con_01 {
  width: 25%;
  border: 0.5px solid #e9ecf1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.perple {
  color: #26a2ff;
  font-weight: bold;
}
.number {
  color: #26a2ff;
}
.con_2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.provide {
  color: skyblue;
  font-weight: bold;
}
.limit {
  color: #26a2ff;
}
.con_3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.price {
  line-height: 35px;
  font-weight: bold;
  font-size: 25px;
  color: blue;
}
.car {
  width: 80px;
  height: 35px;
  background: skyblue;
  text-align: center;
  line-height: 35px;
  border-radius: 15px;
  margin-right: 10px;
}
</style>
