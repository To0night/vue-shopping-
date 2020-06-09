<template>
  <div>
    <div class='input_div'>
      <mt-search v-model="searchValue"
          cancel-text="取消" placeholder="搜索"
          @focus='search_goods' class='search'>
      </mt-search>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      searchValue: null
    }
  },
  created(){

  },
  methods:{
  	search_goods(){
      console.log(searchValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* 搜索框 */
    .input_div {
        width: 100%;
        height: 52px;
    }
</style>
