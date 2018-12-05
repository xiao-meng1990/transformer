<template>
  <div class="login">
    <el-tabs :value="sel" type="border-card" stretch>
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
export default {
  data(){
    return {
      lPhone: '',
      lPassword: '',
      rPhone:"",
      rPassword:"",
      rAgainPassword:"",
      sel:"login"
    }
  },
  methods:{
    goRegister:function(){
      this.sel="register";
    },
    goLogin:function(){
      this.sel="login";
    },
    login:function(){
      //登录
      let _this = this;
      console.log(_this.data.lPhone+"....."+_this.data.lPassword);
      this.$api.login({
        username:_this.data.lPhone,
        password:_this.data.lPassword
      }).then(res => {
        console.log(res)
      });
    },
    registe:function(){
      //注册
      let _this = this;
      console.log(_this.data.rPhone+"....."+_this.data.rPassword);
      this.$api.register({
        phone:_this.data.rPhone,
        pass:_this.data.rPassword
      }).then(res => {
        console.log(res)
      });
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


