<template>
  <div class="admin">
    <t-header>
      <el-button type="text">选品库</el-button>
    </t-header>
    <t-main>
      <div class="tab-box">
        <el-tabs type="border-card" tab-position="left">
          <el-tab-pane class="p-a-20" :label="label[0].name">
            <t-to-audit></t-to-audit>
          </el-tab-pane>
          <el-tab-pane :label="label[1].name">
            2
          </el-tab-pane>
          <el-tab-pane :label="label[2].name">
            3
          </el-tab-pane>
        </el-tabs>
      </div>
    </t-main>
    <t-footer></t-footer>
  </div>
  
</template>
<script>

import tHeader from '@/components/tHeader.vue'
import tMain from '@/components/tMain.vue'
import tFooter from '@/components/tFooter.vue'
import tPages from '@/components/tPages.vue'
import tToAudit from '@/components/tToAudit.vue'

export default {
  name: 'admin',
  data(){
    return {
      label:[{
        name:"待审核"
      },{
        name:"已审核"
      },{
        name:"开通帐号"
      }],
    }
  },
  components: {
    tFooter,
    tHeader,
    tMain,
    tPages,
    tToAudit
  },
}
</script>

<style scoped>
  .admin{
    background-color: #F7FAFF;
    margin-top: 20px;
    padding: 1px;
    min-width: 1260px;
  }
</style>

