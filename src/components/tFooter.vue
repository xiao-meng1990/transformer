<template>
  <div class="box">
    <div style="margin-bottom:10px;">
      <span style="margin-right:100px;">联系我们：{{callUs}}</span>
      <span>客服电话：{{serviceTel}}</span>
    </div>
    <div>
      <span>{{companyInfo}}</span>
    </div>
    
  </div>
</template>


<script>
export default {
  name: 't-footer',
  data(){
    return {
      companyInfo: "© CopyRight 2011-2018  |  沪ICP备237816378号  |  经营许可证：沪B2-20288229  |  经营许可证：沪B2-20288229 ",
      serviceTel:"400-3728-3238",
      callUs:"188-8888-8888"
    }
  }
}
</script>
<style scoped>
.box{
  position: relative;
  min-width: 1200px;
  bottom: 0;
  text-align: center;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
  background-color: #ffffff;
  font-size: 12px;
  padding: 15px;
  margin-top: 30px;
}
</style>


