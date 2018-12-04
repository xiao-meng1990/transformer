<template>
  <div class="goods">
    <img src="../assets/images/card.jpg" alt="">
    <div class="goods-name">
      鲁茜 智能控温调奶器
    </div>
    <div class="goods-info">
      <div class="goods-detail">
        <div class="goods-left">
          <div class="font">券</div>
          <div class="font-mian">￥7</div>
        </div>
        <div class="goods-right">
          <div class="font">券后价</div>
          <div class="font-mian2">￥16</div>
        </div>
      </div>
      <div class="m-b-10">
        <el-button type="primary" plain size="mini">详情</el-button>
      </div>
      <div>店铺：兴宇地毯家居旗舰店</div>
      <div>放单人：sir联盟-小六</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"goods",
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>
  .goods{
    width: 228px;
    height: 380px;
    float: left;
    margin-right: 6px;
    margin-left: 6px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 20px;
  }
  .goods>img{
    width: 226px;
    height: 226px;
  }
  .goods-name{
    position: absolute;
    top: 186px;
    width: 211px;
    font-size: 14px;
    color: #ffffff;
    padding: 0 5px 0 10px;
    height: 40px;
    overflow: hidden;
    line-height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* background-color:rgba(255,68,0,.8); */
    background-color: rgba(0, 0, 0,0.6);
  }
  .goods-info{
    padding: 8px;
  }
  .goods-detail{
    width: 208px;
    text-align: center;
    margin-bottom: 7px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 7px;
  }
  .goods-detail:after{
    width: 208px;
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .goods-left{
    float: left;
    width: 104px;
    border-right: 1px solid #cccccc;
    box-sizing: border-box;
  }
  .goods-right{
    float: left;
    width: 104px;
  }
  .font{
    font-size: 12px;
    color: #999999;
  }
  .font-mian{
    font-size: 18px;
    color: #db3a00;
  }
  .font-mian2{
    font-size: 18px;
    color: #1b72a8;
  }
</style>

