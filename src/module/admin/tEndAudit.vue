<template>
  <div class="audit-box">
    <div class="audit-screen">
      <el-button size="small" type="primary" plain>已通过({{count}})</el-button>
      <el-button size="small" type="" plain>已拒绝({{count}})</el-button>
      <div class="m-t-20">
        <label class="m-r-10">劵后价</label>
        <el-input size="small" class="el-input" v-model="goodsEndPriceBefore">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-10 m-l-10">—</label>
        <el-input size="small" class="el-input" v-model="goodsEndPriceAfter">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-5 m-l-30">券面额 ></label>
        <el-input size="small" class="el-input" v-model="ticketPrice">
          <template slot="append">元</template>
        </el-input>
        <label class="m-r-10 m-l-30">类别</label>
        <el-select class="goods-type" v-model="classify" size="small" placeholder="分类" >
          <el-option v-for="item in typeList" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <label class="m-r-10 m-l-30">状态</label>
        <el-radio v-model="radio" label="1">已选中</el-radio>
        <el-radio v-model="radio" label="2">未选中</el-radio>
      </div>
      <div class="m-t-20">
        <el-button size="small" type="" plain>昨天</el-button>
        <el-button size="small" type="primary" plain>今天</el-button>
        <el-date-picker
          class="m-l-20"
          size="small"
          v-model="dates"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-button class="float-r" size="small" type="primary">查询</el-button>
      </div>
    </div>
    <div class="m-t-30 audit-data">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-Row="true">
        <el-table-column
          prop="date"
          label="发布人/提交时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="选中商家"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="主图">
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
    <div class="audit-page m-t-20">
      <t-pages 
        :currentPage="currentPage"
        :totalNum="totalNum"></t-pages>
    </div>
  </div>
</template>
<script>
import tPages from '@/components/tPages.vue'
export default {
  name:"t-end-audit",
  data(){
    return {
      count:50,
      goodsEndPriceBefore:"",
      goodsEndPriceAfter:"",
      ticketPrice:"",
      typeList:"",
      classify:"",
      dates:"",
      currentPage: 1,
      totalNum:1000,
      radio: '1',
      tableData:[]
    }
  },
  components: {
    tPages
  },
  mounted:function(){
    let _this = this;
    _this.$api.category().then(res => {
      _this.typeList = res.data;
    });
  }
}
</script>
<style scoped>
.audit-box{
  float: left;
  width: 970px;
}
.audit-screen{
  padding: 20px;
  background-color: #ffffff;
}
.el-input{
  width: 100px;
  vertical-align: middle;
}
.goods-type{
  width:120px;
}
.float-r{
  float: right;
}
</style>

<style>
.el-input-group__append{
  padding: 0 8px!important;
}
.el-radio+.el-radio {
    margin-left: 10px!important;
}
</style>


