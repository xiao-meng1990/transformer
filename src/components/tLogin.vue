<template>
  <div class="login">
    <el-tabs :value="sel" type="border-card" @tab-click="handleClick" stretch>
      <el-tab-pane name="login" label="登录">
        <el-input class="m-b-15 m-t-15" v-model="lPhone" type="text" placeholder="请输入手机号"></el-input>
        <el-input class="m-b-15" v-model="lPassword" type="password" placeholder="请输入密码"></el-input>
        <el-button class="width100" type="primary" @click="login">登录</el-button>
        <div>
          <el-button class="left" type="text">忘记密码</el-button>
          <el-button @click="goRegister" class="right m-l-0" type="text">注册</el-button>
          <el-button class="right" type="text" disabled>还没有帐号？</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="register" label="注册">
        <el-input class="m-b-15 m-t-15" v-model="rPhone" type="text" placeholder="请输入手机号"></el-input>
        <el-input class="m-b-15" v-model="rPassword" type="password" placeholder="请输入密码"></el-input>
        <el-input class="m-b-15" v-model="rAgainPassword" type="password" placeholder="重新输入密码"></el-input>
        <el-button class="width100" type="primary" @click="register">注册</el-button>
        <div>
          <el-button @click="goLogin" class="right m-l-0" type="text">登录</el-button>
          <el-button class="right" type="text" disabled>已有帐号？</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import util from '../assets/js/util.js'
export default {
  data(){
    return {
      lPhone:"",
      lPassword:"",
      rPhone:"",
      rPassword:"",
      rAgainPassword:"",
      sel:"login"
    }
  },
  methods:{
    handleClick:function(tab, event){
      this.sel=tab.name;
    },
    goRegister:function(){
      this.sel="register";
    },
    goLogin:function(){
      this.sel="login";
    },
    login:function(){
      //登录
      let _this = this;
      console.log(_this.lPhone+"....."+_this.lPassword);
      _this.$api.login({
        username:_this.lPhone,
        password:_this.lPassword
      }).then(res => {
        console.log(res)
        if(res.code == 0){
          util.setStorage("token",res.data["access-token"])
          _this.userInfo();
        }else{
          _this.$message.error(res.msg);
        }
      });
    },
    register:function(){
      //注册
      let _this = this;
      console.log(_this.rPhone+"....."+_this.rPassword);
      this.$api.register({
        phone:_this.rPhone,
        pass:_this.rPassword
      }).then(res => {
        console.log(res)
      });
    },
    userInfo:function(){
      let _this = this;
      _this.$api.getUserInfo().then(res => {
        console.log(res)
        if(res.code == 0){
          util.setStorJson("userInfo",res.data);
          _this.judge(res.data.user_type)
        }else{
           _this.$message.error(res.msg);
        }
      })
    },
    // 判断用户角色
    judge:function(type){
      let _this =this;
      switch (type) {
        case "1":
          _this.$router.push({path: "/taoke/info"});
          break;
        case "2":
          _this.$router.push({path: "/admin/start"});
          break;
        case "3":
          _this.$router.push({path: "/app/allgoods"});
          break;
        default:
          _this.$router.push({path: "product"});
          break;
      }
    }
  }
}
</script>
<style scoped>
  .login{
    width: 400px;
  }
  .m-b-15{
    margin-bottom: 15px;
  }
  .m-t-15{
    margin-top: 15px;
  }
  .m-l-0{
    margin-left: 0px!important;
  }
  .width100{
    width: 100%;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
</style>


