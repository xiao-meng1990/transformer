<template>
  <div class="amend">
    <t-header>
      <el-dropdown  @command="logout">
        <span style="color:#ffffff;" class="el-dropdown-link">
          您好：{{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </t-header>
    <t-main>
      <div class="taoke-add tab-box">
        <div class="goods-second-step">
          <div class="goods-title">
            <p>商品信息</p>
            <el-form size="small" ref="form" :model="form" label-width="100px">
              <el-form-item label="商品地址">
                <div>{{form.goodsUrl}}</div>
              </el-form-item>
              <el-form-item label="商品活动">
                <el-radio-group v-model="form.goodsActivity">
                  <el-radio label="普通">普通</el-radio>
                  <el-radio label="淘抢购">淘抢购</el-radio>
                  <el-radio label="聚划算">聚划算</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-select v-model="form.classify" placeholder="分类" >
                  <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
              <el-form-item label="开始时间">
                <el-radio-group v-model="form.startTimeType" disabled>
                  <el-radio label="1">立即开始</el-radio>
                  <el-radio label="2">预告</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="form.startTimeType==2">
                <el-select style="width:120px;margin-right:10px;" v-model="form.startTime" @change="timeRange" disabled>
                  <el-option
                    v-for="item in timeList"
                    :label="item.label"
                    :value="item.type">
                  </el-option>
                </el-select>
                <el-select style="width:120px;" v-model="form.startHour" disabled>
                  <el-option
                    v-for="item in hourList"
                    :label="item.label"
                    :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="券到期时间">
                <el-date-picker
                  disabled
                  v-model="form.endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="券到期时间">
                </el-date-picker>
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
              <el-form-item label="历史推广销量">
                <el-input placeholder="历史推广销量" v-model="form.historyCount">
                  <template slot="append">张</template>
                </el-input>
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
              <el-form-item label="佣金比例">
                <el-input placeholder="佣金比例" v-model="form.goodsRatio">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox name="type" checked>
                  <span style="color:#999999;">提交即表示同意</span>
                  <span style="color:#4089FF;">《信息提交规范》</span>
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="amend">修改</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>
      </div>
    </t-main>
    <t-footer></t-footer>
  </div>
</template>
<script>
import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import util from '../assets/js/util.js'
export default {
  name:"t-ticketamend",
  data(){
    return {
      nickName:"",
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
        type:[],
        //新增
        goodsActivity:"1",
        startTimeType:"1",
        startTime:"",
        start:"",
        end:"",
        startHour:"",
        endTime:"",
        goodsRatio:"",
        historyCount:""
      },
      beforeHour:"00:00",
      timeList:[],
      typeList:[],
      hourList:[],
      imageUrl:"",
    }
  },
  components: {
    tFooter,
    tHeader,
    tMain
  },
  mounted:function(){
    let _this = this;
    let userInfo = util.getStorJson("userInfo");
    let hour = new Date().getHours()+1;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
    for(let i=hour>23?1:0;i<4;i++){
      _this.timeList.push({
        label:i==0?"今天":util.getDay(i,"/"),
        type:util.getDay(i,"-")
      })
    }
    _this.form.startTime = _this.timeList[0].type;
    _this.timeRange()
    _this.nickName = userInfo.nickname;
    _this.$api.ticketInfo({
      id:_this.$route.params.id
    }).then(res => {
      let info = {};
      let hour = new Date(res.data.ac_time).getHours();
      info.goodsUrl = res.data.url
      info.classify = parseFloat(res.data.goods_type)
      info.ticketType = "1"
      info.goodsTitle = res.data.title
      info.goodsImg = res.data.pic
      info.goodsImgYx = res.data.pic_yx
      info.goodsDesc = res.data.content
      info.ticketUrl = res.data.yhq_url
      info.ticketTotalNum = res.data.yhq_num
      info.ticketPrice = res.data.yhq_price
      info.goodsPrice = res.data.price
      info.goodsActivity = res.data.ac_type
      info.startTimeType = res.data.ac_time_type  
      info.startTime = util.formatShortDate(res.data.yhq_stime)
      info.startHour = hour<10?"0"+hour+":00":hour + ":00"
      info.endTime = util.formatTime(new Date(res.data.yhq_etime))
      info.goodsRatio = res.data.yong_jin
      info.historyCount = res.data.history_num
      _this.imageUrl = res.data.pic_yx
      _this.form = info;
      
    });
  },
  methods:{
    timeRange(){
      let _this = this;
      let first = _this.timeList[0].type;
      let hour = new Date().getHours()+1;
      
      if(first==_this.form.startTime){
        _this.hourList = [];
        for(let i=hour;i<24;i++){
          _this.hourList.push({
            label:i<10?"0"+i+":00":i + ":00",
            type:i<10?"0"+i+":00":i + ":00"
          })
        }
      }else{
        _this.hourList = [];
        for(let i=0;i<24;i++){
          _this.hourList.push({
            label:i<10?"0"+i+":00":i + ":00",
            type:i<10?"0"+i+":00":i + ":00"
          })
        }
      }
      _this.form.startHour = _this.hourList[0].type
    },
    handleAvatarSuccess(res, file) {
      let _this = this;
      _this.form.goodsImgYx = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPGorPng = file.type === 'image/jpeg'||file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPGorPng) {
        this.$message.error('上传头像图片只支持JPG格式或PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPGorPng && isLt2M;
    },
    logout:function(){
      util.clearStorage();
      this.$router.push({path:"/"})
    },
    amend:function(){
      let _this = this;
      if(_this.form.startTimeType==1){
        _this.form.start = util.formatTime(new Date());
      }else{
        _this.form.start = _this.form.startTime + " " + _this.form.startHour
      }
      console.log(_this.form.endTime)
      if(!_this.form.goodsTitle){
        this.$message.error('请填写商品标题！');
        return false;
      }
      if(!_this.form.goodsImg){
        this.$message.error('请填写商品主图！');
        return false;
      }
      if(!_this.form.goodsImgYx){
        this.$message.error('请填写商品营销图！');
        return false;
      }
      if(!_this.form.goodsDesc){
        this.$message.error('推广文案！');
        return false;
      }
      if(!_this.form.goodsImgYx){
        this.$message.error('请填写商品营销图！');
        return false;
      }
      if(!_this.form.endTime){
        this.$message.error('请填写券到期时间！');
        return false;
      }
      if(!_this.form.ticketUrl){
        this.$message.error('请填写优惠券链接！');
        return false;
      }
      if(!_this.form.historyCount){
        this.$message.error('请填写历史推广销量！');
        return false;
      }
      if(!_this.form.ticketTotalNum){
        this.$message.error('请填写券总量！');
        return false;
      }
      if(!_this.form.ticketPrice){
        this.$message.error('请填写券单价！');
        return false;
      }
      if(!_this.form.goodsPrice){
        this.$message.error('请填写券后价！');
        return false;
      }
      if(!_this.form.goodsRatio){
        this.$message.error('请填写佣金比例！');
        return false;
      }
      _this.$api.ticketAmend({
        id:_this.$route.params.id,
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
        content:_this.form.goodsDesc,
        history_num:_this.form.historyCount,
        yong_jin:_this.form.goodsRatio
      }).then(res => {
        if(res.code == 0){
          _this.$message({
            message: '修改成功',
            type: 'success'
          });
          setTimeout(function(){
            // _this.$router.push({path:"/taoke/add"})
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
    background-color: #ffffff;
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
  .amend{
    background-color: #F7FAFF;
    margin-top: 20px;
    padding: 1px;
    min-width: 1260px;
  }
  .tab-box:after{
    content: "";
    display: block;
    clear: both;

  }
</style>