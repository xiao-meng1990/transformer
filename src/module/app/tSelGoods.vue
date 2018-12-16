<template>
  <div class="my-goods">
    <div class="goods-screen">
      <div>
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
        <el-button 
          v-for="item in dateButtonList" 
          size="small" :type="item.id==dateId?'primary':''" 
          @click="selectDate(item.id)" 
          plain
        >{{item.name}}</el-button>
        <el-date-picker
          class="m-l-20"
          size="small"
          value-format="yyyy-MM-dd"
          v-model="dates"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateRange"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-button class="float-r" size="small" type="primary">导出</el-button>
      </div>
    </div>
    <div class="list m-t-30">
      <t-app-goods
        v-for="item in tableData"
        :ticketPrice="item.yhq_price"
        :cardUrl="item.pic_yx"
        :goodName="item.title"
        :storeName="item.storeName"
        :nickName="item.nickName"
        :goodsCheapPrice="item.price"
      ></t-app-goods>
    </div>

    <div class="m-t-20">
      <t-pages 
        ref="headerChild"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="currentPage"
        :totalNum="totalNum"></t-pages>
    </div>
  </div>
</template>
<script>
import tAppGoods from '@/components/tAppGoods.vue'
import tPages from '@/components/tPages.vue'
import util from '../../assets/js/util.js'
export default {
  name:"t-all-goods",
  data(){
    return {
      goodsEndPriceBefore:"",
      goodsEndPriceAfter:"",
      ticketPrice:"",
      dates:"",
      classify:"",
      dateButtonList:[{
        name:"昨天",
        id:2
      },{
        name:"今天",
        id:1
      }],
      typeList:[],
      dateId:0,
      startDate:"",
      endDate:"",
      currentPage: 1,
      totalNum:0,
      pageSize:"",
      tableData:[],
      selectId:"2" 
    }
  },
  mounted:function(){
    let _this = this;
    _this.pageSize = this.$refs.headerChild.size;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
    _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
    _this.table();
  },
  components: {
    tPages,
    tAppGoods
  },
  methods:{
    handleCurrentChange (val) {
      console.log(val);
      _this.currentPage = val;
      this.table();
    },
    selectDate:function(index){
      let _this = this;
      _this.dateId = index;
      _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
      _this.endDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
      _this.table();
    },
    dateRange:function(d){
      let _this = this;
      _this.dateId = 0;
      _this.startDate = d[0];
      _this.endDate = d[1];
    },
    query:function(){
      this.table();
    },
    table:function(){
      let _this = this;
      //淘客商品列表
      _this.$api.listApp({
        price:_this.ticketPrice,  //券面额
        s_price:_this.goodsEndPriceBefore,  //筛选券后价  小
        e_price:_this.goodsEndPriceAfter,  //筛选券后价  大
        type:_this.classify,  //商品类型 鞋子等
        status:_this.selectId,   //0 未审核 1 待选中 2 已选中  3 下架 4 未通过审核 5  已审核
        s_date:_this.startDate,
        e_date:_this.endDate,
        page:_this.currentPage,
        pageSize:_this.pageSize
      }).then(res => {
        if(res.code == 0){
          _this.tableData = res.data.list;
          _this.totalNum = parseFloat(res.data.total);
        } 
        
      });
      
    }
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

