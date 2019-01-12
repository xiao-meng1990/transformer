<template>
  <div class="my-goods">
    <div class="goods-screen">
      <el-button 
        v-for="item in selButtonList" 
        size="small" :type="item.id==selectId?'primary':''" 
        @click="select(item.id)" 
        plain
      >{{item.name}}</el-button>
      <el-button @click="release" size="small" type="primary" style="float:right">发布商品</el-button>
      <div class="m-t-20">
        <el-date-picker
          size="small"
          value-format="yyyy-MM-dd"
          v-model="dates"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateRange"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
    </div>
    <div class="m-t-30">
      <el-table
        :data="tableData"
        style="width: 100%;font-size:13px;"
        :highlight-current-Row="true">
        <el-table-column
          prop="created_at"
          label="提交时间"
          width="80">
          <template slot-scope="scope">
            <div v-html="scope.row.created_at"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="选中商家"
          width="80">
          <template slot-scope="scope">
            <div v-html="scope.row.get_nick_name==''?'暂无':scope.row.get_nick_name"></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="pic_yx"
          width="90"
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
          prop="content"
          label="文案"
          width="160">
          <template slot-scope="scope">
            <div class="row-height" v-html="scope.row.content"></div>
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
          width="70">
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
          prop="yong_jin"
          label="佣金比例"
          width="80">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="70">
        </el-table-column>
        <el-table-column
          label="操作"
          width="60">
          <template slot-scope="scope">
            <div class="btn" @click="detail(scope.row.url)">查看</div>
            <div class="btn" @click="amend(scope.row.id)">修改</div>
            <div class="btn" @click="soldOut(scope.row.id)">下架</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="m-t-20">
      <t-pages
        ref="headerChild"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="currentPage"
        :totalNum="totalNum"
      ></t-pages>
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
      },{
        name:"未选中",
        id:2,
      },{
        name:"未开始",
        id:3,
      },{
        name:"无效商品",
        id:4,
      }],
      selectId:1,
      startDate:"",
      endDate:"",
      currentPage: 1,
      pageSize:"",
      totalNum:0,
      tableData: [],
      count:50,

    }
  },
  components: {
    tPages
  },
  inject:['reload'],
  mounted:function(){
    let _this = this;
    let userInfo = util.getStorJson("userInfo");
    let _id = this.$route.query.id;
    if(_id){
      _this.selectId = _id;
    }
    _this.pageSize = this.$refs.headerChild.size;
    _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
    _this.table();
  },
  methods:{
    handleCurrentChange (val) {
      this.currentPage = val;
      this.table();
    },
    select:function(index){
      this.selectId = index;
      this.table();
    },
    dateRange:function(d){
      let _this = this;
      _this.dateId = 0;
      _this.startDate = d[0];
      _this.endDate = d[1];
      _this.table();
    },
    table:function(){
      let _this = this;
      //淘客商品列表
      _this.$api.taokeList({
        status:_this.selectId, // 1已选中 2未选中 3未开始 4无效商品
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
    release:function(){
      this.$router.push({path:"../taoke/add"})
      this.reload();
    },
    detail:function(url){
      window.open(url)
    },
    soldOut:function(id){
      let _this = this;
      util.soldOut(this,id).then(() => {
        _this.table();
      });
      
    },
    amend:function(id){
      this.$router.push({
        path: `/ticketamend/${id}`,
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

