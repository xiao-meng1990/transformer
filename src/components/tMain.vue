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
    var minHeight = winH - 226;
    this.minH = minHeight;
  }
}
</script>
<style scoped>
.main-box{
  padding-top: 20px;
  width: 1200px;
  margin: 20px auto 0;
  /* background-color: #ffffff; */
}
</style>

