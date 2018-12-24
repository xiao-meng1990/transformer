<template>
  <div class="box">
    <div class="box-head">
      <div @click="goHome" class="box-logo"></div>
      <div class="box-function">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 't-header',
  data(){
    return {

    }
  },
  methods:{
    goHome:function(){
      this.$router.push({path:"/product"})
    }
  }
}
</script>
<style scoped>
.box{
  position: fixed;
  width: 100%;
  min-width: 600px;
  top: 0;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
  background-color: rgb(69, 175, 252);
  font-size: 12px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 50px;
  z-index: 999;
}
.box-head{
  max-width: 1200px;
  margin: 0 auto;
}
.box-head:after{
  content: "";
  display: block;
  clear: both;
}
.box-logo{
  background-image: url(../assets/images/logo.png);
  background-repeat: no-repeat;
  width: 139px;
  height: 50px;
  background-size: 100% 100%;
  float: left;
  cursor: pointer;
}
.box-title{
  font-size: 28px;
  line-height: 50px;
  margin-left: 10px;
  float: left;
}
.box-function{
  cursor: pointer;
  line-height: 50px;
  font-size: 14px;
  float: right;
  padding-right: 15px;
}
</style>

