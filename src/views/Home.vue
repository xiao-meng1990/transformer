<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <t-header>
      <el-button type="text">选品库</el-button>
    </t-header>
    <t-main class="text-right">
      <t-login class="location"></t-login>
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
import Qs from 'qs'

export default {
  name: 'home',
  components: {
    tFooter,
    tHeader,
    tMain,
    tLogin
  },
  mounted:function(){
    this.$api.getIndex({
      username:"admin",
      password:"123456"
    }).then(res => {
      console.log(res)
    });
    
  },
  methods:{

  }
}
</script>
<style scoped>
  .home{
    background-color: #ffffff;
    padding: 1px;
  }
  .location{
    margin-top: 100px;
    display: inline-block;
  }
  .text-right{
    text-align: right;
  }
</style>

