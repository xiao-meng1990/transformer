<template>
  <div class="t-tab">
    <div 
    v-for="item in list" 
    :class="{sel:item.url==selUrl}"
    @click="selected(item)"
    >{{item.name}}</div>
  </div>
</template>
<script>
export default {
  name:"t-left-tab",
  data(){
    return {
      selUrl:""
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
  created:function(){
    this.historyWatch()
  },
  methods:{
    selected:function(obj){
      this.$router.push({ path: obj.url })
    },
    historyWatch () {
     let _this = this;
     console.log(this.$route.path);
     this.selUrl = this.$route.path;
    }
  },
  watch: {
    '$route': 'historyWatch'
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

