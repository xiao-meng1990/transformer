<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <t-header>
      <span v-show="!isLogin" @click="login" style="color:#ffffff;" type="text">登录</span>
      <el-dropdown v-show="isLogin" @command="logout">
        <span style="color:#ffffff;" class="el-dropdown-link">
          您好：{{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </t-header>
    <t-main>
      <el-carousel height="312px" indicator-position="none">
        <el-carousel-item v-for="item in 1" :key="item">
          <img width="1200" height="" src="../assets/images/banner.png" alt="">
        </el-carousel-item>
      </el-carousel>
      <div>
        <ul class="p-l-20 p-r-20 m-t-10">
          <li class="classify m-r-10" v-for="list in classify">
            <el-button 
            :type="list.id==selectId?'primary':''" 
            @click="select(list.id)"
            style="margin-top:10px"
            size="mini" plain>{{list.name}}</el-button>
          </li>
        </ul>
      </div>
      <div>
        <div class="lebel m-l-20">筛选:</div>
        <ul class="p-l-20 p-r-20 m-t-20">
          <label class="m-r-10">活动类型</label>
          <el-select @change="dateRange" class="goods-type" v-model="activeType" size="small" >
            <el-option v-for="item in activeTypeList" :value="item.name"></el-option>
          </el-select>
          <label class="m-r-10 m-l-20">活动开始区间</label>
          <el-date-picker
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="dates"
            type="datetimerange"
            @change="dateRange"
            start-placeholder="区间开始时间"
            end-placeholder="区间结束时间"
            :default-time="['10:00:00', '10:00:00']">
          </el-date-picker>
        </ul>
      </div>
      <div class="list m-t-30">
        <t-goods
        v-for="item in tableData"
        :ticketPrice="item.yhq_price"
        :cardUrl="item.pic_yx"
        :goodName="item.title"
        :storeName="item.shop_name"
        :nickName="item.nickname"
        :goodsCheapPrice="item.price"
        :id="item.id"
        :taobaoUrl="item.url"
      ></t-goods>
      </div>
      <t-pages 
        ref="headerChild"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="currentPage"
        :totalNum="totalNum">
      </t-pages>
    </t-main>
    <t-footer></t-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tGoods from '@/components/tGoods.vue'
import tPages from '@/components/tPages.vue'
import util from '../assets/js/util.js'

export default {
  name: 'home',
  components: {
    tFooter,
    tHeader,
    tMain,
    tGoods,
    tPages
  },
  data(){
    return {
      isLogin:false,
      activeType:"普通",
      activeTypeList:[{
        name:"普通"
      },{
        name:"淘抢购"
      },{
        name:"聚划算"
      }],
      dates:"",
      classify:[],
      tableData:[],
      dates: '',
      endDate:"",
      startDate:"",
      selectId:"0",
      pageSize:"",
      currentPage: 1,
      totalNum:0,
      nickName:"",

    }
  },
  mounted:function(){
    let _this = this;
    let token = util.getStorage("token");
    if(token){
      _this.isLogin = true;
      let userInfo = util.getStorJson("userInfo");
      _this.nickName = userInfo.nickname;
    }else{
      _this.isLogin = false;
    }
    _this.pageSize = this.$refs.headerChild.size;
    _this.$api.category().then(res => {
      _this.classify = res.data;
    })
    _this.table();
    
  },
  methods:{
    select:function(index){
      this.selectId = index;
      this.table();
    },
    handleCurrentChange (val) {
      console.log(val);
      _this.currentPage = val;
      this.table();
    },
    dateRange:function(){
      this.table();
    },
    table:function(){
      let _this =this;
      _this.dates = _this.dates?_this.dates:[];
      _this.startDate = _this.dates[0]?_this.dates[0]:"";
      _this.endDate = _this.dates[1]?_this.dates[1]:"";

      _this.$api.xuanpinku({
        ac_type:_this.activeType,
        type:_this.selectId,
        status:"",
        s_date:_this.startDate,
        e_date:_this.endDate,
        page:_this.currentPage,
        pageSize:_this.pageSize,
      }).then(res =>{
        if(res.code == 0){
          _this.tableData = res.data.list;
          _this.totalNum = parseFloat(res.data.total);
        } 
      });
    },
    login:function(){
      this.$router.push({path:"/"})
    },
    logout:function(){
      util.clearStorage();
      this.$router.push({path:"/"})
    }
  }
}
</script>
<style scoped>
  .home{
    background-color: #F7FAFF;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    text-align: center;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  ul{
    display: inline-block;
  }
  .classify{
    display: inline-block;
  }
  .lebel{
    display: inline-block;
    font-size: 14px;
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
  .m-r-0{
    margin-right: 0!important;
  }
  .block{
    text-align: right;
  }
</style>

