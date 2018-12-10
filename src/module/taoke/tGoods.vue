<template>
  <div class="my-goods">
    <div class="goods-screen">
      <el-button 
        v-for="item in selButtonList" 
        size="small" :type="item.id==selectId?'primary':''" 
        @click="select(item.id)" 
        plain
      >{{item.name}}({{item.count}})</el-button>
      <el-button size="small" type="primary" style="float:right">发布商品</el-button>
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
          v-model="dates"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
    </div>
    <div class="m-t-30">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-Row="true">
        <el-table-column
          prop="date"
          label="提交时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="选中商家"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pic_yx"
          label="主图">
        </el-table-column>
        <el-table-column
          prop="title"
          label="短标题"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文案"
          width="100">
        </el-table-column>
        <el-table-column
          prop="price"
          label="券后价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="yhq_price"
          label="优惠券"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="m-t-20">
      <t-pages 
        :currentPage="currentPage"
        :totalNum="totalNum"
        :size="pageSize"></t-pages>
    </div>
  </div>
</template>
<script>
import tPages from '@/components/tPages.vue'
import util from '../../assets/js/util.js'
export default {
  name:"t-goods",
  data(){
    return {
      dates:"",
      selButtonList:[{
        name:"已选中",
        id:1,
        count:0
      },{
        name:"未选中",
        id:2,
        count:0
      }],
      dateButtonList:[{
        name:"昨天",
        id:2
      },{
        name:"今天",
        id:1
      }],
      selectId:1,
      dateId:0,
      startDate:"",
      endDate:"",
      currentPage: 1,
      pageSize:20,
      totalNum:1000,
      tableData: [],
      count:50,

    }
  },
  mounted:function(){
    let _this = this;
    _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
    _this.table();
  },
  components: {
    tPages
  },
  methods:{
    select:function(index){
      this.selectId = index;
    },
    selectDate:function(index){
      this.dateId = index;
    },
    table:function(){
      let _this = this;
      //淘客商品列表
      _this.$api.taokeList({
        status:_this.selectId, //1未选中 2已选中 3下架 
        s_date:_this.startDate,
        e_date:_this.endDate,
        page:_this.currentPage,
        pageSize:_this.pageSize
      }).then(res => {
        if(res.code == 0){
          _this.tableData = res.data.list;
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
</style>

