<template>
  <div class="TeacherApplication">
    <h2>Review Application</h2>
        <el-tabs @tab-click="handleTab">
      <el-tab-pane label="unprocessed">
       <ApplicationTable
          :tables="tables"
          :deletable="audit_flag"
          :approvable="audit_flag"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
      </el-tab-pane>
      <el-tab-pane label="processed">
        <ApplicationTable
          :tables="tables"
          :deletable="audit_flag"
          :approvable="audit_flag"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
      </el-tab-pane>
    </el-tabs>
    <!-- <button type="button"
            @click="showNotProcessed"
            :class="[select?'dual_pos':'dual_neg']"
    >unprocessed</button>
    <button
        type="button"
        @click="showProcessed"
        :class="[select?'dual_neg':'dual_pos']"
    >processed</button>
    <div class="showApplication">
      <ApplicationTable
          :tables="tables"
          :deletable="audit_flag"
          :approvable="audit_flag"
          @approve="approveApplication"
          @delete="rejectApplication"
      ></ApplicationTable>
    </div> -->

  </div>
</template>

<script src="./TeacherApplication.js">
</script>

<style lang="scss" scoped>
@import "../css/dual.scss";

.TeacherApplication{
  text-align: center;

  h2{
    font-size: 36px;
  }

  .showApplication{
    padding: 20px 40px;
    font-size: 15px;
  }

}
</style>