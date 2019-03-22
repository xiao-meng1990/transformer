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
        <el-button style="margin-left:10px" @click="submit" class="float-r" size="small" type="primary">导出</el-button>
        <el-button @click="query" class="float-r" size="small" type="primary">查询</el-button>
      </div>
    </div>
    <div class="m-t-20">
      <el-table
        :data="tableData"
        style="width: 100%;font-size:13px;"
        ref="table"
        @selection-change="handleSelectionChange"
        :highlight-current-Row="true">
        <!-- <el-table-column
          type="selection"
          :selectable='checkboxInit'
          width="55">
        </el-table-column> -->
         <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          prop="pic_yx"
          width="100"
          label="营销图">
          <template slot-scope="scope">
            <img width="80" height="80" :src="scope.row.pic_yx" alt="营销图">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="短标题"
          width="120">
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
          width="90">
          <template slot-scope="scope">
            <div v-html="scope.row.yhq_stime"></div>
            <div>至</div>
            <div v-html="scope.row.yhq_etime"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="history_num"
          label="推广销量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="70">
          <template slot-scope="scope">
            <div class="btn" @click="ticketInfo(scope.row.id)">查看</div>
          </template>
        </el-table-column>
      </el-table>
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
  name:"t-sel-goods",
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
      startDate:"",
      endDate:"",
      currentPage: 1,
      totalNum:0,
      pageSize:"",
      tableData:[],
      selected:[],
      multipleSelection: [],
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
      this.currentPage = val.val;
      this.table();
    },
    // checkboxInit(row,index){
    //   if (row.status==2) 
    //     return 0;//不可勾选
    //   else
    //     return 1;//可勾选
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
          util.forInTime(_this.tableData,"created_at");
          util.forInSelName(_this.tableData,"get_user_id");
          util.forInPrice(_this.tableData,"price")
          util.forInPrice(_this.tableData,"yhq_price")
          util.forInYongjin(_this.tableData,"yong_jin")
          util.forInTime3(_this.tableData,"yhq_stime")
          util.forInTime3(_this.tableData,"yhq_etime")
          _this.totalNum = parseFloat(res.data.total);
          _this.$nextTick(function(){
            for(let i=0;i<_this.tableData.length;i++){
            if(_this.tableData[i].status==2){
                _this.$refs.table.toggleRowSelection(_this.tableData[i],false);
              }
            }
          });
        }
      });
    },
    submit:function(){
      let _this = this;
      if(_this.multipleSelection.length<1){
        _this.$message({
          message: '至少选一条商品哦！',
          type: 'warning'
        })
        return false;
      }
      let resultArr = _this.multipleSelection.map(function(a) {return a.id;});
      let resultStr = resultArr.join();
      console.log(resultStr)
      _this.$api.selects({
        ids: resultStr
      }).then(res =>{
        window.location.href = res.data;
      });
    },
    detail:function(url){
      window.open(url)
    },
    ticketInfo:function(id){
      this.$router.push({
        path: `/ticketinfo/${id}`,
      })
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
.btn{
  color: #007bff;
  font-size: 13px;
  cursor: pointer;
}
.explain{
  font-size: 16px;
  color: #ee3030;
}
</style>

