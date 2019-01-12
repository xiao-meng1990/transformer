<template>
  <div class="audit-box">
    <div class="audit-screen">
      <el-button 
        v-for="item in selButtonList" 
        size="small" :type="item.id==selectId2?'primary':''" 
        @click="select(item.id)" 
        plain
      >{{item.name}}</el-button>
      <div class="m-t-20">
        <label class="m-r-10">活动类型</label>
        <el-select class="goods-type" v-model="activeType" size="small" >
          <el-option v-for="item in activeTypeList" :value="item.name"></el-option>
        </el-select>
        <span v-show="selectId2!=9?true:false">
          <label class="m-r-10 m-l-30">状态</label>
          <el-radio v-model="radio" label="2">已选中</el-radio>
          <el-radio v-model="radio" label="1">未选中</el-radio>
          <el-radio v-model="radio" label="w">未开始</el-radio>
        </span>
        
      </div>
      <div class="m-t-20">
        <label class="m-r-10">活动开始区间</label>
        <el-date-picker
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="dates"
          type="datetimerange"
          start-placeholder="区间开始时间"
          end-placeholder="区间结束时间"
          :default-time="['10:00:00', '10:00:00']">
        </el-date-picker>
        <el-button @click="query" class="float-r" size="small" type="primary">查询</el-button>
      </div>
    </div>
    <div class="m-t-30 audit-data">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-Row="true">
        <el-table-column
          label="提交时间"
          width="90">
          <template slot-scope="scope">
            <div v-html="scope.row.created_at"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="淘宝Id"
          width="120">
          <template slot-scope="scope">
            <div class="btn" v-html="scope.row.taobao_id" @click="detail(scope.row.url)"></div>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="营销图">
          <template slot-scope="scope">
            <img width="80" height="80" :src="scope.row.pic_yx" alt="营销图">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="短标题"
          width="100">
          <template slot-scope="scope">
            <div class="row-height" v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="券后价"
          width="70">
        </el-table-column>
        <el-table-column
          prop="yhq_price"
          label="优惠券"
          width="80">
        </el-table-column>
        <el-table-column
          prop="yong_jin"
          label="佣金比例"
          width="80">
        </el-table-column>
        <el-table-column
          label="起止时间"
          width="100">
          <template slot-scope="scope">
            <div v-html="scope.row.yhq_stime"></div>
            <div>至</div>
            <div v-html="scope.row.yhq_etime"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="70">
        </el-table-column>
        <el-table-column
          prop="history_num"
          label="推广销量"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="70">
          <template slot-scope="scope">
            <div class="btn" @click="ticketInfo(scope.row.id)">查看</div>
            <div v-show="selectId2!=9" class="btn" @click="tsoldOut(scope.row.id)">下架</div>
            <div v-show="selectId2!=9" class="btn" @click="pass(scope.row.id)">撤销</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="audit-page m-t-20">
      <t-pages 
        ref="headerChild"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="currentPage"
        :totalNum="totalNum"></t-pages>
    </div>
  </div>
</template>
<script>
import tPages from '@/components/tPages.vue'
import util from '../../assets/js/util.js'
export default {
  name:"t-end-audit",
  data(){
    return {
      dates:"",
      selButtonList:[{
        name:"已通过",
        id:1
      },{
        name:"无效商品",
        id:9
      }],
      activeType:"普通",
      activeTypeList:[{
        name:"普通"
      },{
        name:"淘抢购"
      },{
        name:"聚划算"
      }],
      selectId:1,
      selectId2:1,
      startDate:"",
      endDate:"",
      currentPage: 1,
      totalNum:0,
      radio: '2',
      pageSize:"",
      tableData:[],
      statusId:2,
    }
  },
  components: {
    tPages
  },
  mounted:function(){
    let _this = this;
    _this.pageSize = this.$refs.headerChild.size;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
    _this.table();
  },
  methods:{
    handleCurrentChange (val) {
      console.log(val);
      _this.currentPage = val;
      this.table();
    },
    select:function(index){
      this.selectId2 = index;
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
      _this.statusId2 = _this.selectId2!=9?_this.radio:_this.selectId2;
      //淘客商品列表
      _this.$api.goodsList({
        ac_type:_this.activeType,  //商品类型 鞋子等
        status:_this.selectId,  //0 未审核 1 待选中 2 已选中  3 下架 4 未通过审核 5  已审核
        status2:_this.statusId2, //
        s_date:_this.startDate,
        e_date:_this.endDate,
        page:_this.currentPage,
        pageSize:_this.pageSize
      }).then(res => {
        if(res.code == 0){
          _this.tableData = res.data.list;
          util.forInTime(_this.tableData,"created_at");
          util.forInSelName(_this.tableData,"get_user_id");
          util.forInStatus(_this.tableData,"status");
          util.forInPrice(_this.tableData,"price")
          util.forInPrice(_this.tableData,"yhq_price")
          util.forInYongjin(_this.tableData,"yong_jin")
          util.forInTime3(_this.tableData,"yhq_stime")
          util.forInTime3(_this.tableData,"yhq_etime")
          _this.totalNum = parseFloat(res.data.total);
        } 
        
      });
      
    },
    detail:function(url){
      window.open(url)
    },
    ticketInfo:function(id){
      this.$router.push({
        path: `/ticketinfo/${id}`,
      })
    },
    //下架
    soldOut:function(id){
      let _this = this;
      util.soldOut(this,id).then(() => {
        _this.table();
      });
      
    },
    //撤销拒绝 即通过审核
    pass:function(id){
      let _this = this;
      util.pass(this,id).then(() => {
        _this.table();
      });
      
    }
  }
}
</script>
<style scoped>
.audit-box{
  float: left;
  width: 970px;
}
.audit-screen{
  padding: 20px;
  background-color: #ffffff;
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
.btn{
  color: #007bff;
  font-size: 13px;
  cursor: pointer;
}
.row-height{
  max-height: 113px;
  overflow: hidden;
}
</style>

<style>
.el-input-group__append{
  padding: 0 8px!important;
}
.el-radio+.el-radio {
    margin-left: 10px!important;
}
</style>


