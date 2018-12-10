<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <t-header>
      <el-button type="text">登录</el-button>
    </t-header>
    <t-main>
      <el-carousel height="150px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div>
        <div class="lebel m-l-20">分类:</div>
        <ul class="p-l-20 p-r-20 m-t-20">
          <li class="classify m-r-10" v-for="list in classify">
            <el-button 
            :type="list.id==selectId?'primary':''" 
            @click="select(list.id)"  
            size="mini" plain>{{list.name}}</el-button>
          </li>
        </ul>
      </div>
      <div>
        <div class="lebel m-l-20">筛查:</div>
        <ul class="p-l-20 p-r-20 m-t-20">
          <el-button size="mini" >昨天</el-button>
          <el-button size="mini" style="margin-right:15px;" >今天</el-button>
          <el-date-picker
            class="m-l-20"
            size="small"
            v-model="dates"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </ul>
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
      <t-pages 
      :currentPage="currentPage"
      :totalNum="totalNum"></t-pages>
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
      classify:[],
      dates: '',
      endDate:"",
      startDate:"",
      selectId:"0",
      currentPage: 1,
      totalNum:1000,

    }
  },
  mounted:function(){
    let _this = this;
    _this.$api.category().then(res => {
      _this.classify = res.data;
    })
    _this.query();
    //审核通过
    this.$api.changeStatus({
      status:1,
      ids:"1011"
    }).then(res =>{

    });
    //审核未通过
    this.$api.changeStatus({
      status:4,
      ids:"1012"
    }).then(res =>{

    });
    // 选中
    this.$api.selects({
      ids:"1011"
    }).then(res =>{
      window.location.href = res.data;
    });
    
  },
  methods:{
    select:function(index){
      this.selectId = index;
    },
    query:function(){
      let _this =this;
      _this.$api.listApp({
        type:_this.selectId,
        status:"",
        s_date:_this.startDate,
        e_date:_this.endDate,
        page:_this.currentPage,
        pageSize:20,
        user_id:""
      }).then(res =>{
        console.log(res);
      });
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

