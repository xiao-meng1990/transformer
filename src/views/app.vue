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
        name:"全部商品",
        url:"/app/allgoods"
      },{
        name:"已选中商品",
        url:"/app/selgoods"
      }],
      def:0
    }
  },
  //TODO
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
    if(_this.userType!=3){
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
        case '/app/allgoods':
          _this.def = 0;
          break;
        case '/app/selgoods':
          _this.def = 1;
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

