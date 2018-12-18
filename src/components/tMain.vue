<template>
  <div :style="{minHeight:minH+'px'}" class="main-box">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:"t-main",
  data(){
    return {
      minH:0
    }
  },
  beforeMount(){
    let url = this.$route.path;
    let winH = document.documentElement.clientHeight;
    let minHeight = winH - 206;
    if(url=="/"){
      minHeight = winH - 296;
    }
    this.minH = minHeight;
  }
}
</script>
<style scoped>
.main-box{
  padding-top: 20px;
  width: 1200px;
  margin: 0 auto;
  /* background-color: #ffffff; */
}
</style>

