<template>
  <div class="taoke">
    <t-header>
      <el-dropdown>
        <span style="color:#ffffff;" class="el-dropdown-link">
          您好：{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </t-header>
    <t-main>
      <div class="tab-box">
        <t-left-tab class="m-r-20" :def="def" :list="option"></t-left-tab>
        <router-view/>
        <!-- <t-to-audit></t-to-audit> -->
      </div>
    </t-main>
    <t-footer></t-footer>
  </div>
  
</template>
<script>

import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tLeftTab from '@/components/tLeftTab.vue'
import tPages from '@/components/tPages.vue'
import util from '../assets/js/util.js'
export default {
  name: 'taoke',
  data(){
    return {
      userName:"",
      option:[{
        name:"首页",
        url:"/taoke/info"
      },{
        name:"发布商品",
        url:"/taoke/add"
      },{
        name:"我的商品",
        url:"/taoke/goods"
      },{
        name:"个人信息",
        url:"/taoke/user"
      }],
      def:0
    }
  },
  components: {
    tFooter,
    tHeader,
    tMain,
    tPages,
    tLeftTab
  },
  mounted:function(){
    let _this = this;
    let userInfo = util.getStorJson("userInfo");
    _this.userName = userInfo.username;
  },
  methods:{
    clickSelect:function(){

    }
  }
}
</script>

<style scoped>
  .taoke{
    background-color: #F7FAFF;
    margin-top: 20px;
    padding: 1px;
    min-width: 1260px;
  }
  .tab-box:after{
    content: "";
    display: block;
    clear: both;

  }
</style>

