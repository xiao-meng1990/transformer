<template>
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
      <el-form-item label="确认">
        <el-input v-model="accountsForm.verify" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">开通</el-button>
      </el-form-item>
    </el-form>
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
        verify:""
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
  mounted:function(){
    let _this = this;
  },
  methods:{
    submit:function(){
      
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
</style>


