<template>
  <div v-on:mouseover="mouseover"  v-on:mouseout="mouseout" class="goods">
    <div class="goods-ticket">券￥{{ticketPrice}}</div>
    <div class="goods-select">
      <img :src="selImg">
    </div>
    <div @click="selectGoods" class="goods-img">
      <img :src="cardUrl" alt="商品图片">
    </div>
    <div class="goods-info">
      <div class="goods-center">
        <div class="goods-name">{{goodName}}</div>
        <div class="goods-price">券后<span class="price-style">￥{{goodsCheapPrice}}</span></div>
      </div>
      <div class="goods-bottom">
        <div>店铺：{{storeName}}</div>
        <div>放单人：{{nickName}}</div>
      </div>
    </div>
    <!-- 详情 -->
    <div v-show="focus" @click="lookDetail" class="goods-detail">查看详情</div>
  </div>
</template>
<script>
import avatar from '@/assets/images/zhanwei.png'
import selOff from '@/assets/images/sel-off.png'
import selOn from '@/assets/images/sel-on.png'
export default {
  name:"t-app-goods",
  data(){
    return {
      focus:false,
      selImg:'',
      checkedNames:false
    }
  },
  props:{
    ticketPrice:{
      type:String,
      default:"0"
    },
    cardUrl:{
      type:String,
      default:avatar
    },
    goodName:{
      type:String,
      default:"商品名称"
    },
    storeName:{
      type:String,
      default:"店铺名称"
    },
    nickName:{
      type:String,
      default:"昵称"
    },
    goodsCheapPrice:{
      type:String,
      default:"0"
    },
    id:{
      type:String,
      default:0
    },
    taobaoUrl:{
      type:String,
      default:""
    },
    statusId:{
      type:Number,
      default:0
    }
  },
  mounted:function(){
    this.selImg = this.statusId == 2?selOn:selOff;
    this.checkedNames = this.statusId == 2?true:false;
  },
  methods:{
    mouseover:function(){
      this.focus = true;
    },
    mouseout:function(){
      this.focus = false;
    },
    lookDetail:function(){
      let _this = this;
      window.open(_this.taobaoUrl)
    },
    selectGoods:function(){
      let _this = this;
      if(_this.statusId==2){
        return false;
      }else{
        if(_this.selImg==selOff){
          _this.selImg = selOn;
          _this.$emit('add', _this.id);
        }else{
          _this.selImg = selOff;
          _this.$emit('minus', _this.id);
        }
        
      }
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
  .goods-img{
    width: 228px;
    height: 228px;
    cursor: pointer;
  }
  .goods-img>img{
    width: 228px;
    height: 228px;
  }
  .goods-center{
    padding: 8px;
  }
  .goods-name{
    top: 186px;
    font-size: 16px;
    text-align: center;
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
    padding-top: 4px;
    padding-bottom: 5px;
  }
  .goods-bottom div{
    font-size: 16px;
    color: #999999;
    padding: 3px;
    text-align: center;
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
  .goods-detail{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 67px;
    line-height: 67px;
    text-align: center;
    background-color: #339bff;
    color: #ffffff;
    font-size: 20px;
  }
  .goods-select{
    width: 22px;
    height: 22px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .goods-select>img{
    width: 22px;
    height: 22px;
  }
</style>

