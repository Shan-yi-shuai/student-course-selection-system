<template>
  <div class="ManageSelectPermission">
    <!-- <h2>权限</h2>
    <br /> -->
    <div class="open">
      <el-switch
        v-model="open"
        active-text="选课开放"
        inactive-text="选课关闭"
        @change="initialization"
        :disabled="status!=4&&open"
      >
      </el-switch>
    </div>
    <div class="showStatus" v-show="open">
      <el-steps :active="status" finish-status="success">
        <el-step title="第一轮选课开始"></el-step>
        <el-step title="第一轮选课结束"></el-step>
        <el-step title="第二轮选课开始"></el-step>
        <el-step title="第二轮选课结束"></el-step>
      </el-steps>

      <el-button style="margin-top: 12px" @click="next"  :disabled="!open">下一步</el-button>
    </div>
    <div class="time">
      <span class="time-title">选择当前学期</span>
      <el-cascader
        v-model="time"
        :options="options"
        @change="changeTime"
        :disabled="open"
      ></el-cascader>
    </div>
  </div>
</template>

<script src="./ManageSelectPermission.js">
</script>

<style lang="scss" scoped>
// @import "../css/button";
h2 {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: black;
}
.open {
  width: 80%;
  margin-left: 100px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.showStatus {
  width: 80%;
  margin-left: 100px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.time {
  width: 80%;
  margin-left: 100px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.time-title {
  margin-right: 20px;
}
</style>