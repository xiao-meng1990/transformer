<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data(){
    return {
      name:"tPages",
    }
  },
  props:{
    currentPage:{
      type: Number,
      default:1
    },
    totalNum:{
      type: Number
    },
    size:{
      type: Number,
      default:20
    }

  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
  
}
</script>

<style scoped>
  .block{
    text-align: right;
  }
</style>

