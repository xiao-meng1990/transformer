<template>
  <div class="goods-title">
    <div class="user-screen">
      <p>个人信息</p>
      <el-form size="small" ref="form" :model="userInfoForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="userInfoForm.name" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfoForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
            <el-radio label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系QQ">
          <el-input v-model="userInfoForm.qq" placeholder="请填写qq号"></el-input>
        </el-form-item>
        <el-form-item label="账户余额">
          <div>{{price}}</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUserInfo">确认并保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name:"t-user",
  data(){
    return {
      userInfoForm:{
        name:"",
        sex:"",
        qq:"",
      },
      price:0
    }
  },
  methods:{
    submitUserInfo:function(){
      let _this = this;
      this.$api.setUserInfo({
        sex: _this.userInfoForm.sex,
        qq: _this.userInfoForm.qq,
        nickname: _this.userInfoForm.name
      }).then(res => {
        if(res.code == 0){
          _this.$message({
            type:"success",
            message: '保存成功!'
          })
        }
      });
    }
  }
}
</script>
<style scoped>
.goods-title{
  float: left;
  width: 970px;
  background-color: #ffffff;
}
.user-screen{
  width: 400px;
  padding: 20px;
  background-color: #ffffff;
}
.goods-title  P{
    font-size: 24px;
    margin-bottom: 20px;
  }
</style>
