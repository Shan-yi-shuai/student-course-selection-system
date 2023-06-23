<template>
  <div class="ApplyCourse">
    <h2>Manage Your Courses</h2>
    <div class="showCourse">
        <el-table
            :data="tables"
            ref="multipleTable"
            tooltip-effect="dark">
          <el-table-column label="modify" align="center">
            <template slot-scope="scope">
              <el-button size="large" class="del-com" @click="modifyCourse(scope.row.number)">
                <font-awesome-icon icon="fa fa-plus-square"/>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="delete" align="center">
            <template slot-scope="scope">
              <el-button size="large" class="del-com" @click="deleteCourse(scope.row.number)">
                <font-awesome-icon icon="far fa-trash-alt"/>
              </el-button>
            </template>
          </el-table-column>
          <template v-for='(col) in tableData'>
            <el-table-column
                sortable
                :show-overflow-tooltip="true"
                :prop="col.dataItem"
                :label="col.dataName"
                :key="col.dataItem"
                width="128px">
            </el-table-column>
          </template>
        </el-table>
    </div>
    <div class="toAddCourse">
      <button type="button" @click="toAddCourse">go to add course</button>
    </div>
    <div class="Back">
      <button class="button" @click="gotoHome">Back to Home</button>
    </div>
  </div>
</template>

<script src="./ApplyCourse.js">
</script>

<style lang="scss" scoped>
@import "../../css/button";

.ApplyCourse{
  text-align: center;
  padding: 10px;
  line-height: 1.5;

  .showCourse{
    padding: 20px 50px;
  }

  .toAddCourse{
    padding: 10px;
  }

  .AddCourse{
    padding: 20px 30px;
    text-align: left;
  }
}
</style>