<template>
  <div class="login">
    <el-tabs :value="sel" type="border-card" @tab-click="handleClick" stretch>
      <el-tab-pane name="login" label="登录">
        <div @keyup.enter="login"> 
          <el-input class="m-b-15 m-t-15" v-model="lPhone" type="text" placeholder="请输入手机号"></el-input>
          <el-input class="m-b-15" v-model="lPassword" type="password" placeholder="请输入密码"></el-input>
          <el-button v-focus class="width100" type="primary" @click.stop="login">登录</el-button>
        </div>
        <div>
          <el-button class="left" type="text" @click="forgetPass">忘记密码</el-button>
          <el-button @click="goRegister" class="right m-l-0" type="text">注册</el-button>
          <el-button class="right" type="text" disabled>还没有帐号？</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="register" label="注册">
        <el-input class="m-b-15 m-t-15" v-model="rPhone" type="text" placeholder="请输入手机号"></el-input>
        <div class="login-code">
          <el-input class="m-b-15 code-input" v-model="rCode" type="text" placeholder="请输入验证码"></el-input>
          <el-button type="primary" class="code-button" @click="getCode" :disabled="!codeType">{{codeText}}</el-button>
        </div>
        <el-input class="m-b-15" v-model="rPassword" type="password" placeholder="请输入密码"></el-input>
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
      rCode:"",
      rPassword:"",
      rAgainPassword:"",
      sel:"login",
      codeText:"获取验证码",
      codeType:true
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods:{
    forgetPass:function(){
      this.$message({
        message: '请联系客服',
        type: 'success'
      })
    },
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
    getCode:function(){
      let _this = this;
      let phoneReg = util.isValidMobile(_this.rPhone);
      if(!phoneReg){
        _this.$message({
          type:"error",
          message:"手机号错误，请重新填写"
        })
        return false
      }
      util.settime(10,function(_text,_codeType){
        _this.codeText = _text;
        _this.codeType = _codeType;
      });
      _this.$api.getCode({
        phone:_this.rPhone
      }).then(res => {
        if(res.code==0){
          _this.$message({
            type:"success",
            message:"发送成功，请注意查收"
          })
        }else{
          _this.$message(res.msg)
        }
      });
    },
    register:function(){
      //注册
      let _this = this;
      let phoneReg = util.isValidMobile(_this.rPhone);
      if(!phoneReg){
        _this.$message({
          type:"error",
          message:"手机号错误，请重新填写"
        })
        return false
      }
      if(!_this.rCode){
        _this.$message({
          type:"error",
          message:"请填写验证码"
        })
        return false
      }
      if(!_this.rPassword){
        _this.$message({
          type:"error",
          message:"请填写密码"
        })
        return false
      }
      this.$api.register({
        yzm:_this.rCode,
        phone:_this.rPhone,
        pass:_this.rPassword
      }).then(res => {
        if(res.code==0){
          _this.$message({
            type:"success",
            message:"注册成功，请去登录"
          })
        }else{
          _this.$message(res.msg)
        }
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
  .login-code{
    width: 100%;
    text-align: left;
  }
  .code-input{
    width: 200px;
  }
  .code-button{
    float: right;
    width: 120px;
    margin-left: 14px;
  }
</style>


