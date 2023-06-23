<template>
  <div class="VisitApplication">
    <h2>My Applications</h2>
    <el-tabs @tab-click="handleTab">
      <el-tab-pane label="unprocessed">
        <ApplicationTable
            :tables="this.tables"
            :deletable="deletable"
            :approvable="false"
            @delete="recallApplication"
        ></ApplicationTable>
      </el-tab-pane>
      <el-tab-pane label="processed">
        <ApplicationTable
            :tables="this.tables"
            :deletable="deletable"
            :approvable="false"
            @delete="recallApplication"
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
    <ApplicationTable
        :tables="this.tables"
        :deletable="deletable"
        :approvable="false"
        @delete="recallApplication"
    ></ApplicationTable> -->
    <div class="ErrorMsg">{{this.error_msg}}</div>
  </div>
</template>

<script src="./VisitApplication.js"></script>

<style lang="scss" scoped>
@import "../../css/dual";
.VisitApplication{
  text-align: center;
  margin: 20px;
}
</style>