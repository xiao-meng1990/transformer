<template>
  <div class="taoke-add">
    <div v-show="firstStep" class="goods-first-step">
      <div class="m-t-60">
        <el-input v-model="goodsUrl" size="small" placeholder="请输入商品链接"></el-input>
      </div>
      <div class="m-t-30">
        <el-button @click="checkUrl" class="width100" size="small" :loading="loading">{{buttonType==1?"校验链接":"下一步"}}</el-button>
      </div>
      <div class="hint-info">
        <p class="hint-title">重要提醒：</p>
        <p>1、务必确保信息准确无误再提交！</p>
        <p>2、确保已经和商家对接清楚，切勿中途调整价格和佣金！</p>
        <p>3、若中途商品有变化，请及时在线修改或者下架商品！</p>
      </div>
    </div>

    <!--发布 第二步 -->
    <div v-show="!firstStep" class="goods-second-step">
      <div class="goods-title">
        <p>商品信息</p>
        <el-form size="small" ref="form" :model="form" label-width="100px">
          <el-form-item label="商品地址">
            <div>{{form.goodsUrl}}</div>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.classify" placeholder="分类" >
              <el-option v-for="item in typeList" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="form.goodsTitle" placeholder="例：品牌+品名+样式+规格等，清楚描述商品，10到20个字以内"></el-input>
          </el-form-item>
          <el-form-item label="商品主图">
            <el-input v-model="form.goodsImg" placeholder="请填写淘宝图片空间地址"></el-input>
          </el-form-item>
          <el-form-item label="商品营销图">
            <el-upload
              class="avatar-uploader"
              action="http://101.132.172.234/web/goods/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="推广文案">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
          </el-form-item>
          <p class="m-t-30">优惠券信息</p>
          <el-form-item label="优惠券类型">
            <el-radio-group v-model="form.ticketType">
              <el-radio label="1">阿里妈妈券</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优惠券链接">
            <el-input v-model="form.ticketUrl" placeholder="填写优惠券链接"></el-input>
          </el-form-item>

          <el-form-item label="券总量">
            <el-input placeholder="券原始总量" v-model="form.ticketTotalNum">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <el-form-item label="券单价">
            <el-input placeholder="价格" v-model="form.ticketPrice">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="券后价">
            <el-input placeholder="价格" v-model="form.goodsPrice">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox name="type">
              <span style="color:#999999;">提交即表示同意</span>
              <span style="color:#4089FF;">《信息提交规范》</span>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发布商品</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"t-add",
  data(){
    return {
      goodsUrl:"",
      firstStep:true,
      buttonText:"校验链接",
      buttonType:"1",//1 校验 2 下一步
      loading:false,
      taobao_id:"",
      shopName:"",
      form: {
        goodsUrl:"",
        classify:"",
        ticketType:"1",
        goodsTitle:"",
        goodsImg:"",
        goodsImgYx:"",
        goodsDesc:"",
        ticketUrl:"",
        ticketTotalNum:"",
        ticketPrice:"",
        goodsPrice:"",
        type:[]
      },
      typeList:[],
      imageUrl:"",
      currentPage: 1,
      totalNum:1000
    }
  },
  mounted:function(){
    let _this = this;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
  },
  methods:{
    handleAvatarSuccess(res, file) {
      let _this = this;
      _this.form.goodsImgYx = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    checkUrl:function(){
      let _this = this;
      let url = this.goodsUrl;
      _this.loading = true;
      //校验链接
      if(_this.buttonType==1){
        this.$api.checkUrl({
          "url":url
        }).then(res => {
          _this.loading = false;
          if(res.code==0){
            _this.$message({
              message: '校验通过',
              type: 'success'
            });
            _this.taobao_id = res.data.taobao_id;
            _this.shopName = res.data.shop_name;
            _this.form.goodsUrl = "https://item.taobao.com/item.html?id="+_this.taobao_id;
            _this.buttonType = 2;
            console.log(res);
          }else{
            _this.$message.error(res.msg);
          }
          
        }).catch(res => {
          _this.loading = false;
        });
      }else if(_this.buttonType==2){
        _this.firstStep = false;
      }
      
    },
    onSubmit:function(){
      let _this = this;
      _this.$api.addGoods({
        url:_this.form.goodsUrl,
        goods_type:_this.form.classify,
        title:_this.form.goodsTitle,
        pic:_this.form.goodsImg,
        pic_yx:_this.form.goodsImgYx,
        type:"1",//阿里妈妈券
        yhq_url:_this.form.ticketUrl,
        yhq_num:_this.form.ticketTotalNum,
        price:_this.form.goodsPrice,
        yhq_price:_this.form.ticketPrice,
        taobao_id:_this.taobao_id,
        shop_name:_this.shopName,
        content:_this.form.goodsDesc
      }).then(res => {
        if(res.code == 0){
          _this.$message({
            message: '提交成功',
            type: 'success'
          });
          setTimeout(function(){
            _this.$router.push({path:"/taoke/add"})
          },2000)
        }else{
          _this.$message.error(res.msg);
        }
        console.log(res);
      });
    }
  }
}
</script>
<style scoped>
.taoke-add{
  float: left;
  width: 970px;
  background-color: #ffffff;
}
.goods-first-step{
  width: 400px;
  margin: 0 auto;
}
.m-t-60{
  margin-top: 60px;
}  
.hint-success{
  font-size: 12px;
  color: #67C23A
}
.hint-fail{
  font-size: 12px;
  color: #F56C6C
}
.width100{
  width: 100%;
}
.hint-info{
  border: 1px solid #cccccc;
  padding: 20px;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;
  margin-top: 80px;
  margin-bottom: 80px;
}
.hint-info>p{
  font-size: 14px;
}
.hint-title{
  color: #F56C6C;
  margin-bottom: 10px;
}
.goods-second-step{
  padding: 30px;
  width: 500px;
}
.goods-title  P{
  font-size: 24px;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px solid #cccccc;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>


