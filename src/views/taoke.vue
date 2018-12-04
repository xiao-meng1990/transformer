<template>
  <div class="taoke-index">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <t-header>
      <el-button type="text">选品库</el-button>
    </t-header>
    <t-main>
      <div class="tab-box">
        <el-tabs type="border-card" tab-position="left">
          <el-tab-pane :label="label[0].name">
            <div class="taoke-home">
              <div class="home-top">
                <p>
                  <span>账户余额：</span>
                  <span>0</span>
                </p>
                <el-button style="float:right;" size="mini" type="primary" plain>充值</el-button>
              </div>
              <div class="home-bottom">
                <div class="selected">
                  <p>13</p>
                  <div>
                    <span>已选中</span>
                    <el-button type="text">[查看]</el-button>
                  </div>
                </div>
                <div class="noselected">
                  <p>12</p>
                  <div>
                    <span>未选中</span>
                    <el-button type="text">[查看]</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="label[1].name">
            <!--发布 第一步 -->
            <div v-show="firstStep" class="goods-first-step">
              <div class="m-t-60">
                <el-input v-model="goodUrl" size="small" placeholder="请输入商品链接"></el-input>
              </div>
              <div v-show="isShow" :class="hintClass" class="f-14 m-t-5">{{hintText}}</div>
              <div class="m-t-10">
                <el-button class="width100" size="small">下一步</el-button>
              </div>
              <div class="hint-info">
                <p class="hint-title">重要提醒：</p>
                <p>1.xxxxxxxxxxxxxxxxxxxxxxxxx</p>
                <p>2.xxxxxxxxxxxxxxxxxxxxxxxxx</p>
                <p>3.xxxxxxxxxxxxxxxxxxxxxxxxx</p>
                <p>4.xxxxxxxxxxxxxxxxxxxxxxxxx</p>
                <p>5.xxxxxxxxxxxxxxxxxxxxxxxxx</p>
              </div>
            </div>

            <!--发布 第二步 -->
            <div v-show="!firstStep" class="goods-second-step">
              <div class="goods-title">
                <p>商品信息</p>

                <el-form size="small" ref="form" :model="form" label-width="100px">
                  <el-form-item label="商品地址">
                    <div>https://detail.tmall.com/item.htm?id=562200283003</div>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-select v-model="form.classify" placeholder="分类">
                      <el-option label="鞋类" value="鞋类"></el-option>
                      <el-option label="家具" value="家具"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="商品标题">
                    <el-input v-model="form.title" placeholder="例：品牌+品名+样式+规格等，清楚描述商品，10到20个字以内"></el-input>
                  </el-form-item>
                  <el-form-item label="商品主图">
                    <el-input v-model="form.img" placeholder="请填写淘宝图片空间地址"></el-input>
                  </el-form-item>
                  <el-form-item label="商品营销图">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="推广文案">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <p class="m-t-30">优惠券信息</p>
                  <el-form-item label="优惠券类型">
                    <el-radio-group v-model="form.ticketType">
                      <el-radio label="阿里妈妈券"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="优惠券链接">
                    <el-input v-model="form.ticketUrl" placeholder="填写优惠券链接"></el-input>
                  </el-form-item>

                  <el-form-item label="优惠券链接">
                    <el-input placeholder="券原始总量" v-model="form.date1">
                      <template slot="append">张</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="券后价">
                    <el-input placeholder="价格" v-model="form.date2">
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
          </el-tab-pane>
          <el-tab-pane :label="label[2].name">
            <div class="my-goods">
              <div class="goods-top">
                <el-button-group style="float:left;">
                  <el-button size="small" type="primary">已选中(25)</el-button>
                  <el-button size="small" >未选中(12)</el-button>
                </el-button-group>
                <el-button style="float:right;" size="small" type="primary">发布商品</el-button>
              </div>
              <ul class="p-r-20 m-t-20">
                <el-button size="mini" >昨天</el-button>
                <el-button size="mini" style="margin-right:15px;" >今天</el-button>
                <el-date-picker
                  size="mini"
                  v-model="value"
                  align="right"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </ul>
              <div style="border:1px solid #cccccc;" class="m-t-30">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  :highlight-current-Row="true">
                  <el-table-column
                    prop="date"
                    label="提交时间"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="选中商家"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="主题">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="短标题"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="文案"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="券后价"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="优惠券"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="状态"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="操作"
                    width="180">
                  </el-table-column>
                </el-table>
              </div>
              <div class="m-t-20">
                <t-pages 
                  :currentPage="currentPage"
                  :totalNum="totalNum"></t-pages>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="goods-user-info" :label="label[3].name">
            <div class="goods-title">
              <p>个人信息</p>
              <el-form size="small" ref="form" :model="userInfoForm" label-width="100px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" placeholder="请填写姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    <el-radio label="保密"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="所在地">
                  <el-select class="m-r-10" v-model="form.province" placeholder="请选择省">
                    <el-option label="上海" value="上海"></el-option>
                    <el-option label="北京" value="北京"></el-option>
                  </el-select>
                  <el-select v-model="form.city" placeholder="请选择市">
                    <el-option label="青浦" value="青浦"></el-option>
                    <el-option label="杨浦" value="杨浦"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系QQ">
                  <el-input v-model="form.qq" placeholder="请填写qq号"></el-input>
                </el-form-item>
                <el-form-item label="账户余额">
                  <div>500</div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitUserInfo">确认并保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </t-main>
    <t-footer></t-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tPages from '@/components/tPages.vue'

export default {
  name: 'taokeIndex',
  data(){
    return {
      label:[{
        name:"首页"
      },{
        name:"发布商品"
      },{
        name:"我的商品"
      },{
        name:"个人信息"
      }],
      goodUrl:"",
      hintClass:"hint-success",
      hintText:"校验通过",
      isShow:true,
      firstStep:false,
      form: {
        name: '',
        classify: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        ticketType: '',
        desc: '',
        imageUrl: ''
      },
      userInfoForm:{

      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      value:"",
      currentPage: 1,
      totalNum:1000
    }
  },
  components: {
    tFooter,
    tHeader,
    tMain,
    tPages
  },
  methods:{
    handleAvatarSuccess(res, file) {
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
    onSubmit() {
      console.log('submit!');
    },
    submitUserInfo(){
      console.log('submitUserInfo!');
    }
  }
}
</script>
<style scoped>
  .taoke-index{
    background-color: #F7FAFF;
    margin-top: 20px;
    padding: 1px;
    min-width: 1260px;
  }
  .taoke-home{
    padding: 20px;
    height: 500px;
  }
  .home-top{
    border: 1px solid #cccccc;
    padding: 20px;
    height: 28px;
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    transition: background-color 0.3s ease-in-out;
    margin-bottom: 40px;
  }
  .home-top>p{
    float: left;
    line-height: 28px;
    font-size: 16px;
  }
  .home-bottom{
    border: 1px solid #cccccc;
    padding: 20px;
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    transition: background-color 0.3s ease-in-out;
    background-color: #F7FAFF
  }
  .home-bottom p{
    font-size: 30px;
  }
  .home-bottom:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .selected{
    float: left;
    width: 489px;
    text-align: center;
  }
  .noselected{
    float: left;
    width: 489px;
    text-align: center;
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
  .goods-user-info{
    padding: 30px;
    width: 500px;
  }
  .goods-title{
    
  }
  .goods-title P{
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
  .my-goods{
    padding: 20px;
  }
  .goods-top:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
</style>