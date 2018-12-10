<template>
  <div class="my-goods">
    <div class="goods-screen">
      <div class="m-t-20">
        <label class="m-r-10">劵后价</label>
        <el-input size="small" class="el-input" v-model="goodsEndPriceBefore">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-10 m-l-10">—</label>
        <el-input size="small" class="el-input" v-model="goodsEndPriceAfter">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-5 m-l-30">券面额 ></label>
        <el-input size="small" class="el-input" v-model="ticketPrice">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-10 m-l-30">类别</label>
        <el-select class="goods-type" v-model="classify" size="small" placeholder="分类" >
          <el-option v-for="item in typeList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="m-t-20">
        <el-button size="small" type="" plain>昨天</el-button>
        <el-button size="small" type="primary" plain>今天</el-button>
        <el-date-picker
          class="m-l-20"
          size="small"
          v-model="dates"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-button class="float-r" style="margin-left:10px" size="small" type="primary">选中并导出</el-button>
        <el-button class="float-r" size="small" type="primary">查询</el-button>
      </div>
    </div>
    <div class="list m-t-30">
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
      <t-goods></t-goods>
    </div>

    <div class="m-t-20">
      <t-pages 
        :currentPage="currentPage"
        :totalNum="totalNum"></t-pages>
    </div>
  </div>
</template>
<script>
import tGoods from '@/components/tGoods.vue'
import tPages from '@/components/tPages.vue'
export default {
  name:"t-all-goods",
  data(){
    return {
      goodsEndPriceBefore:"",
      goodsEndPriceAfter:"",
      ticketPrice:"",
      dates:"",
      classify:"",
      typeList:[],
      currentPage: 1,
      totalNum:1000
    }
  },
  mounted:function(){
    let _this = this;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
  },
  components: {
    tPages,
    tGoods
  },
  methods:{

  }
}
</script>
<style scoped>
.my-goods{
  float: left;
  width: 970px;
}
.goods-screen{
  padding: 20px;
  background-color: #ffffff;
  position: relative;
}
.el-input{
  width: 100px;
  vertical-align: middle;
}
.goods-type{
  width:120px;
}
.float-r{
  float: right;
}
.list{
  width: 100%;
}
.list:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>

