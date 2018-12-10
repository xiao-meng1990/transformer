<template>
  <div class="goods">
    <div class="goods-ticket">券￥100</div>
    <img src="../assets/images/card.jpg" alt="">
    <div class="goods-info">
      <div class="goods-center">
        <div class="goods-name">恒源祥男士羊毛衫纯色高领毛衣加厚韩版冬季线衣保暖打底针织衫潮</div>
        <div class="goods-price">券后<span class="price-style">￥2132</span></div>
      </div>
      <div class="goods-bottom">
        <div>店铺：兴宇地毯家居旗舰店</div>
        <div>放单人：sir联盟-小六</div>
      </div>
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
    height: 362px;
    float: left;
    margin-right: 6px;
    margin-left: 6px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 20px;
    background-color: #ffffff;
    cursor: pointer;
  }
  .goods-ticket{
    position: absolute;
    top: 0;
    left: 69px;
    width: 90px;
    height: 30px;
    background-color: #ff918a;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #ffffff;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
  }
  .goods>img{
    width: 228px;
    height: 228px;
  }
  .goods-center{
    padding: 8px;
  }
  .goods-name{
    top: 186px;
    font-size: 16px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  .goods-price{
    text-align: center;
    color: #333333;
    font-size: 16px;
    font-weight: 600;
  }
  .goods-price>span{
    color: #ff918a;
    font-size: 20px;
    font-weight: 400;
  }
  .goods-bottom{
    background-color: #f7f7f7;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .goods-bottom div{
    font-size: 16px;
    color: #999999;
    padding: 3px;
    text-align: center;
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

