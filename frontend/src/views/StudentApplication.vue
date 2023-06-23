<template>
  <div class="StudentApplication">
    <el-tabs @tab-click="handleTab">
      <el-tab-pane label="unprocessed">
       <ApplicationTable
          :tables="tables"
          :deletable="audit"
          :approvable="audit"
          :table_data="tableData"
          :brief_data="briefData"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
      </el-tab-pane>
      <el-tab-pane label="processed">
        <ApplicationTable
          :tables="tables"
          :deletable="audit"
          :approvable="audit"
          :table_data="tableData"
          :brief_data="briefData"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
      </el-tab-pane>
    </el-tabs>
    <!-- <button type="button"
            @click="showNotProcessed"
            :class="[audit?'dual_pos':'dual_neg']"
    >unprocessed</button>
    <button
        type="button"
        @click="showProcessed"
        :class="[audit?'dual_neg':'dual_pos']"
    >processed</button>
    <div class="showApplication">
      <ApplicationTable
          :tables="tables"
          :deletable="audit"
          :approvable="audit"
          :table_data="tableData"
          :brief_data="briefData"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
    </div> -->
  </div>
</template>

<script src="./StudentApplication.js"></script>

<style lang="scss" scoped>
@import "../css/dual.scss";
@import "../css/el_table.scss";
.StudentApplication{
  text-align: center;
  align-items: center;
  align-content: center;
  margin: 20px;

  .ApplicationTable{
    text-align: center;
  }

  .showApplication{
    margin: 0 auto;
    padding: 5px;
  }
}
</style>