<template>
  <div class="t-tab">
    <div 
    v-for="item in list" 
    :class="{sel:item.name==selName}"
    @click="selected(item)"
    >{{item.name}}</div>
  </div>
</template>
<script>
export default {
  name:"t-left-tab",
  data(){
    return {
      selName:""
    }
  },
  props:{
    list:{
      type:Array
    },
    def:{
      type:Number,
      default:0
    }
  },
  mounted:function(){
    let _this = this;
    this.selName = this.list[this.def].name;
    this.$router.push({ path: _this.list[_this.def].url })
  },
  methods:{
    selected:function(obj){
      this.selName = obj.name;
      this.$router.push({ path: obj.url })
    }
  }
}
</script>
<style scoped>
.t-tab{
  float: left;
  width: 200px;
  height: 500px;
  background-color: #339bff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
}
.t-tab>div{
  padding: 25px;
  cursor: pointer;
  border-left:4px solid #339bff;
  box-sizing: border-box;
}
.sel{
  border-left:4px solid #ff918a!important;
  box-sizing: border-box;
  background-color: #57bfff;
}
</style>

