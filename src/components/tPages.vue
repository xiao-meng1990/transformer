<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data(){
    return {
      name:"tPages",
      sizes:[50,100,150,200],
      size:50
    }
  },
  props:{
    currentPage:{
      type: Number,
      default:1
    },
    totalNum:{
      type: Number
    }

  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
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

