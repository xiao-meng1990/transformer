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
    var winH = document.documentElement.clientHeight;
    var minHeight = winH - 206;
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

