<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <t-header>
      <span @click="product" class="xuan-pin" type="text">选品库</span>
    </t-header>
    <t-main class="text-right">
      <div class="home-box">
        <div class="home-img">
          <img width="440" height="528" src="../assets/images/login.png" alt="">
        </div>
        <t-login class="location"></t-login>
      </div>
      
    </t-main>
    <t-footer></t-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tLogin from '@/components/tLogin.vue'

export default {
  name: 'home',
  components: {
    tFooter,
    tHeader,
    tMain,
    tLogin
  },
  mounted:function(){
    //登录
    // this.$api.login({
    //   username:"18621904918",
    //   password:"123456"
    // }).then(res => {
    //   console.log(res)
    // });
    //注册
    // this.$api.register({
    //   phone:"18621904918",
    //   pass:"123456"
    // }).then(res => {
    //   console.log(res)
    // });
    //添加用户
    // this.$api.addUser({
    //   user_type:"1",
    //   username:"18612345678",
    //   pass:"000000"
    // }).then(res => {
    //   console.log(res)
    // });
    
  },
  methods:{
    product:function(){
      this.$router.push({path:"/product"})
    }
  }
}
</script>
<style scoped>
  .home{
    background-color: #ffffff;
    padding: 1px;
  }
  .location{
    margin-top: 70px;
    margin-right: 100px;
    display: inline-block;
  }
  .text-right{
    text-align: right;
  }
  .xuan-pin{
    color: #ffffff;
    font-size: 14px;
  }
  .home-box{
    border: 1px solid #fff;
    border-radius: 20px;
    width: 1200px;
    box-shadow: 0px 0px 30px rgb(169, 217, 252);
    position: relative;
    height: 461px;
  }
  .home-img{
    position: absolute;
    top: 40px;
    left: 50px;
  }
</style>

