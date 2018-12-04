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
            <el-button size="mini">{{list.name}}</el-button>
          </li>
        </ul>
      </div>
      <div>
        <div class="lebel m-l-20">筛查:</div>
        <ul class="p-l-20 p-r-20 m-t-20">
          <el-button size="mini" >昨天</el-button>
          <el-button size="mini" style="margin-right:15px;" >今天</el-button>
          <el-date-picker
            size="mini"
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期">
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
      classify:[{
        id:1,
        name:"全部"
      },{
        id:2,
        name:"居家日用"
      },{
        id:3,
        name:"美食"
      },{
        id:4,
        name:"母婴"
      },{
        id:5,
        name:"美妆"
      },{
        id:6,
        name:"女装"
      },{
        id:7,
        name:"数码家电"
      },{
        id:8,
        name:"文娱车品"
      },{
        id:9,
        name:"家装家纺"
      },{
        id:9,
        name:"鞋品"
      },{
        id:9,
        name:"男装"
      },{
        id:9,
        name:"配饰"
      },{
        id:9,
        name:"户外运动"
      },{
        id:9,
        name:"箱包"
      }],
      value: '',
      currentPage: 4,
      totalNum:1000
    }
  }
}
</script>
<style scoped>
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

