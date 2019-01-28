<template>
<div class="admin">
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
          <el-form size="small" ref="form" label-width="100px">
            <el-form-item label="商品地址">
              <div>{{info.url}}</div>
            </el-form-item>
            <el-form-item label="商品活动">
              <div>{{info.ac_type}}</div>
            </el-form-item>
            <el-form-item label="商品分类">
              <div>{{typeName}}</div>
            </el-form-item>
            <el-form-item label="商品标题">
              <div>{{info.title}}</div>
            </el-form-item>
            <el-form-item label="商品主图">
            <div>{{info.pic}}</div>
            </el-form-item>
            <el-form-item label="商品营销图">
              <img :src="info.pic_yx" class="avatar">
            </el-form-item>
            <el-form-item label="推广文案">
              <div>{{info.content}}</div>
            </el-form-item>
            <el-form-item label="开始时间">
              <div>{{sTime}}</div>
            </el-form-item>
            <el-form-item label="券到期时间">
              <div>{{eTime}}</div>
            </el-form-item>
            <p class="m-t-30">优惠券信息</p>
            <el-form-item label="优惠券类型">
              <div>阿里妈妈券</div>
            </el-form-item>
            <el-form-item label="优惠券链接">
              <div>{{info.yhq_url}}</div>
            </el-form-item>
            <el-form-item label="历史推广销量">
              <div>{{info.history_num}}</div>
            </el-form-item>
            <el-form-item label="券总量">
              <div>{{info.yhq_num}}</div>
            </el-form-item>
            <el-form-item label="券面额">
              <div>{{info.yhq_price}}元</div>
            </el-form-item>
            <el-form-item label="券后价">
              <div>{{info.price}}元</div>
            </el-form-item>
            <el-form-item label="佣金比例">
              <div>{{info.yong_jin}}%</div>
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
  name:"t-ticketinfo",
  data(){
    return {
      nickName:"",
      typeName:"",
      info:{},
      sTime:"",
      eTime:"",
      typeList:[]
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
    _this.nickName = userInfo.nickname;
    
    _this.$api.ticketInfo({
      id:_this.$route.params.id
    }).then(res => {
      _this.info = res.data;
      _this.sTime = util.formatTime(new Date(res.data.yhq_stime))
      _this.eTime = util.formatTime(new Date(res.data.yhq_etime))
      console.log(_this.info)
      _this.$api.category().then(result => {
        _this.typeList = result.data;
        _this.typeName = _this.typeList[_this.info.goods_type].name
      });
    });
  },
  methods:{
    logout:function(){
      util.clearStorage();
      this.$router.push({path:"/"})
    },

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
  .admin{
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

