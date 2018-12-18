<template>
  <div class="dredge-bg">
    <div class="dredge-box">
      <el-button 
      v-for="item in buttonList" 
      size="small" :type="item.id==selectId?'primary':''" 
      @click="select(item.id)" 
      plain
      >{{item.name}}</el-button>
      <el-form size="small" class="m-t-30" ref="form" :model="accountsForm" label-width="60px">
        <el-form-item label="手机号">
          <el-input v-model="accountsForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="accountsForm.nickName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="accountsForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">开通</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name:"t-dredge",
  data(){
    return {
      accountsForm:{
        phone:"",
        password:"",
        nickName:""
      },
      buttonList:[{
        name:"淘客",
        id:1
      },{
        name:"后台",
        id:2
      },{
        name:"应用",
        id:3
      }],
      selectId:1
    }
  },
  inject:['reload'],
  mounted:function(){
    let _this = this;
  },
  methods:{
    submit:function(){
      let _this = this;
      _this.$api.addUser({
        user_type:_this.selectId,
        username:_this.accountsForm.phone,
        pass:_this.accountsForm.password,
        nickname:_this.accountsForm.nickName
      }).then(res => {
        if(res.code==0){
          this.$message({
            type:"success",
            message:"创建成功"
          })
          this.reload();
        }else{
          this.$message("创建失败")
        }
        
      });
    },
    select:function(index){
      this.selectId = index;
    }
  }
}
</script>
<style scoped>
.dredge-box{
  float: left;
  width: 300px;
  padding: 0 20px;
}
.dredge-bg{
  background-color: #ffffff;
  float: left;
  padding-top: 20px;
  width: 970px;
}
</style>


