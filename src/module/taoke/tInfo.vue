<template>
  <div class="taoke-home">
    <div class="home-top">
      <div class="text-style">账户余额</div>
      <p>
        <span style="color: #3eadff;font-weight: 600;">￥</span>
        <span class="money-style">{{money}}</span>
      </p>
      <el-button @click="alipay" style="float:right;font-size:16px;" size="mini" type="text">立即充值</el-button>
    </div>
    <div class="home-bottom">
      <div class="home-selected">
        <p class="font-size-50 green">{{sel}}</p>
        <div>
          <span>已选中</span>
          <el-button type="text">[查看]</el-button>
        </div>
      </div>
      <div class="home-noselected">
        <p class="font-size-50 pink">{{unSel}}</p>
        <div>
          <span>未选中</span>
          <el-button type="text">[查看]</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from "../../assets/js/util.js"
export default {
  name:"tInfo",
  data(){
    return {
      money:0,
      sel:0,
      unSel:0
    }
  },
  mounted:function(){
    let _this = this;
    let userInfo = util.getStorJson("userInfo");
    _this.money = userInfo.money;
    _this.sel = userInfo.selected_num;
    _this.unSel = userInfo.unselected_num;

  },
  methods:{
    alipay:function(){
      this.$message({
        message: '此功能暂未开放',
        type: 'warning'
      });
    }
  }

}
</script>
<style scoped>
.taoke-home{
  height: 500px;
  float: left;
  width: 970px;
}
.home-top{
  padding: 80px;
  height: 28px;
  background-color: #ffffff;
  margin-bottom: 20px;
  position: relative;
}
.home-top>p{
  float: left;
  line-height: 28px;
  font-size: 16px;
}
.home-bottom{
  padding: 20px;
  background-color: #ffffff;
}
.home-bottom p{
  font-size: 50px;
}
.home-bottom:after{
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.home-selected{
  float: left;
  width: 465px;
  text-align: center;
}
.home-noselected{
  float: left;
  width: 465px;
  text-align: center;
}
.money-style{
  color: #3eadff;
  font-size: 60px;
  font-weight: 600;
}
.text-style{
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  color: #666666;
}
.green{
  color: #ade8a5;
}
.pink{
  color: #ff918a;
}
</style>
