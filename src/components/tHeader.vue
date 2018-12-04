<template>
  <div class="box">
    <div class="box-head">
      <div class="box-logo"></div>
      <div class="box-title">樊登读书</div>
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
  }
}
</script>
<style scoped>
.box{
  position: fixed;
  width: 100%;
  min-width: 1200px;
  top: 0;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
  background-color: #ffffff;
  font-size: 12px;
  padding: 15px;
  height: 50px;
  z-index: 999;
}
.box-head{
  width: 1200px;
  margin: 0 auto;
}
.box-logo{
  background-image: url(../assets/images/logotransformer2.png);
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
  float: left;
}
.box-title{
  font-size: 28px;
  line-height: 50px;
  margin-left: 10px;
  float: left;
}
.box-function{
  line-height: 50px;
  font-size: 14px;
  float: right;
}
</style>

