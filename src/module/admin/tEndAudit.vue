<template>
  <div class="audit-box">
    <div class="audit-screen">
      <el-button 
        v-for="item in selButtonList" 
        size="small" :type="item.id==selectId?'primary':''" 
        @click="select(item.id)" 
        plain
      >{{item.name}}</el-button>
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
        <span v-show="selectId==1?true:false">
          <label class="m-r-10 m-l-30">状态</label>
          <el-radio v-model="radio" label="2">已选中</el-radio>
          <el-radio v-model="radio" label="1">未选中</el-radio>
        </span>
        
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
        <el-button @click="query" class="float-r" size="small" type="primary">查询</el-button>
      </div>
    </div>
    <div class="m-t-30 audit-data">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-Row="true">
        <el-table-column
          label="发布人/提交时间"
          width="130">
          <template slot-scope="scope">
            <div v-html="scope.row.nickname"></div>
            <div v-html="scope.row.created_at"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="选中商家"
          width="90">
          <template slot-scope="scope">
            <div v-html="scope.row.get_nick_name==''?'暂无':scope.row.get_nick_name"></div>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="营销图">
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.pic_yx" alt="营销图">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="短标题"
          width="100">
        </el-table-column>
        <el-table-column
          prop="content"
          label="文案"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="券后价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="yhq_price"
          label="优惠券"
          width="70">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="70">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="detail(scope.row.url)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="selectId==1?true:false"
              @click="soldOut(scope.row.id)">下架</el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="selectId==1?false:true"
              @click="pass(scope.row.id)">撤销</el-button>
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
        id:1,
        count:0
      },{
        name:"已拒绝",
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
      goodsEndPriceBefore:"",
      goodsEndPriceAfter:"",
      ticketPrice:"",
      typeList:[],
      classify:"",
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
    _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
    _this.table();
  },
  methods:{
    handleCurrentChange (val) {
      console.log(val);
      _this.currentPage = val;
      this.table();
    },
    select:function(index){
      this.selectId = index;
      this.table();
    },
    selectDate:function(index){
      let _this = this;
      _this.dateId = index;
      _this.startDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
      _this.endDate = _this.dateId == 1?util.getDay(0,"-"):_this.dateId == 2?util.getDay(-1,"-"):"";
      // _this.table();
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
      _this.statusId = _this.selectId==1?_this.radio:4;
      //淘客商品列表
      _this.$api.goodsList({
        price:_this.ticketPrice,  //券面额
        s_price:_this.goodsEndPriceBefore,  //筛选券后价  小
        e_price:_this.goodsEndPriceAfter,  //筛选券后价  大
        type:_this.classify,  //商品类型 鞋子等
        status:_this.statusId,   //0 未审核 1 待选中 2 已选中  3 下架 4 未通过审核 5  已审核
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
          _this.totalNum = parseFloat(res.data.total);
        } 
        
      });
      
    },
    detail:function(url){
      window.open(url)
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
</style>

<style>
.el-input-group__append{
  padding: 0 8px!important;
}
.el-radio+.el-radio {
    margin-left: 10px!important;
}
</style>


