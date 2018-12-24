<template>
  <div class="taoke">
    <t-header>
      <el-dropdown  @command="logout">
        <span style="color:#ffffff;" class="el-dropdown-link">
          您好：{{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
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
import util from '../assets/js/util.js'
export default {
  name: 'taoke',
  data(){
    return {
      nickName:"",
      userType:"",
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
    tLeftTab
  },
  created:function(){
    this.pagePath();
  },
  mounted:function(){
    let _this = this;
    let userInfo = util.getStorJson("userInfo");
    _this.nickName = userInfo.nickname;
    _this.userType = userInfo.user_type;
    if(_this.userType!=1){
      _this.$message({
        type:"error",
        message:"你没有此权限"
      });
      setTimeout(function(){
        _this.$router.push({path:"/"})
      },500)
      
    }
  },
  methods:{
    logout:function(){
      util.clearStorage();
      this.$router.push({path:"/"})
    },
    pagePath:function(){
      let _this = this;
      let _path = this.$route.path;
      switch (_path) {
        case '/taoke/info':
          _this.def = 0;
          break;
        case '/taoke/add':
          _this.def = 1;
          break;
        case '/taoke/goods':
          _this.def = 2;
          break;
        case '/taoke/user':
          _this.def = 3;
          break;
        default:
          _this.def = 0;
          break;
      }
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

