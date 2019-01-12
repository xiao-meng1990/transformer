<template>
  <div class="my-goods">
    <div class="goods-screen">
      <div>
        <label class="m-r-10">活动类型</label>
        <el-select class="goods-type" v-model="activeType" size="small" >
          <el-option v-for="item in activeTypeList" :value="item.name"></el-option>
        </el-select>
        <label class="m-r-10 m-l-20">活动开始区间</label>
        <el-date-picker
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="dates"
          type="datetimerange"
          start-placeholder="区间开始时间"
          end-placeholder="区间结束时间"
          :default-time="['10:00:00', '10:00:00']">
        </el-date-picker>
        <el-button @click="submit" class="float-r" size="small" type="primary">导出</el-button>
      </div>
    </div>
    <div class="list m-t-30">
      <t-app-goods
        v-for="item in tableData"
        :ticketPrice="parseFloat(item.yhq_price)"
        :cardUrl="item.pic_yx"
        :goodName="item.title"
        :storeName="item.shop_name"
        :nickName="item.nickname"
        :goodsCheapPrice="parseFloat(item.price)"
        :id="item.id"
        :taobaoUrl="item.url"
        :statusId="item.status"
        :taobaoId="item.taobao_id"
        :yongjin="parseFloat(item.yong_jin)"
        :historyCount="item.history_num"
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
      activeType:"普通",
      activeTypeList:[{
        name:"普通"
      },{
        name:"淘抢购"
      },{
        name:"聚划算"
      }],
      dates:"",
      typeList:[],
      dateId:0,
      startDate:"",
      endDate:"",
      currentPage: 1,
      totalNum:0,
      pageSize:"",
      tableData:[],
      selected:[],
      selectId:"2" 
    }
  },
  mounted:function(){
    let _this = this;
    _this.pageSize = this.$refs.headerChild.size;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
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
    query:function(){
      this.table();
    },
    table:function(){
      let _this = this;
      _this.dates = _this.dates?_this.dates:[];
      _this.startDate = _this.dates[0]?_this.dates[0]:"";
      _this.endDate = _this.dates[1]?_this.dates[1]:"";
      //淘客商品列表
      _this.$api.listApp({
        ac_type:_this.activeType,
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
    },
    submit:function(){
      let _this = this;
       _this.$api.allcsv().then(res => {
         window.location.href = res.data;
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

