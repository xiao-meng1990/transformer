<template>
  <div class="admin">
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
  name: 'admin',
  data(){
    return {
      nickName:"",
      option:[{
        name:"待审核",
        url:"/admin/start"
      },{
        name:"已审核",
        url:"/admin/end"
      },{
        name:"开通帐号",
        url:"/admin/dredge"
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
    if(_this.userType!=2){
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
        case '/admin/start':
          _this.def = 0;
          break;
        case '/admin/end':
          _this.def = 1;
          break;
        case '/admin/dredge':
          _this.def = 2;
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
  .admin{
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

