<template>
  <div class="taoke">
    <t-header>
      <el-button type="text">选品库</el-button>
    </t-header>
    <t-main>
      <div class="tab-box">
        <t-left-tab class="m-r-20" :def="def" :list="option"></t-left-tab>
        <router-view/>
        <!-- <t-to-audit></t-to-audit> -->
      </div>
    </t-main>
    <t-footer></t-footer>
  </div>
  
</template>
<script>

import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tLeftTab from '@/components/tLeftTab.vue'
import tPages from '@/components/tPages.vue'

export default {
  name: 'taoke',
  data(){
    return {
      option:[{
        name:"全部商品",
        url:"/app/allgoods"
      },{
        name:"已选中商品",
        url:"/app/selgoods"
      }],
      def:0
    }
  },
  components: {
    tFooter,
    tHeader,
    tMain,
    tPages,
    tLeftTab
  },
  methods:{
    clickSelect:function(){

    }
  }
}
</script>

<style scoped>
  .taoke{
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

