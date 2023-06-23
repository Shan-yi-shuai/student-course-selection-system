<template>
  <div class="classroom">
    <el-table :data="classroomTable" style="width: 100%">
      <el-table-column type="expand" prop="courseList">
        <template slot-scope="scope">
          <div class="course-list">
            <el-table style="width: 100%" :data="scope.row.courseList">
              <el-table-column
                prop="number"
                label="课程编号"
                width="300"
              >
              </el-table-column>
              <el-table-column prop="name" label="课程名字" width="300">
              </el-table-column>
              <el-table-column
                prop="capacity"
                label="课程容量"
                width="300"
              >
              </el-table-column>
              <el-table-column
                prop="selectedNumber"
                label="已选人数"
                width="300"
              >
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="教室名称" prop="classroom_name">
      </el-table-column>
      <el-table-column label="教室容量" prop="capacity">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="select_classroom(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" @click="dialogVisible = true">编辑</el-button> -->
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          > -->
          <el-button
            size="mini"
            type="danger"
            @click="delete_classroom(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      style="width: 100%"
      plain
      @click="add_dialogVisible = true"
    ></el-button>
    <!-- 修改弹窗 -->
    <el-dialog
      title="修改教室信息"
      :visible.sync="change_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="key">教室名称</div>
      <el-input
        placeholder=""
        v-model="classroom_name"
        clearable
        style="width: 70%"
      ></el-input>
      <div class="key">教室容量</div>
      <el-input-number
        v-model="classroom_capacity"
        :min="1"
        :max="200"
        label="描述文字"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="change_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeClassroom"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 增加弹窗 -->
    <el-dialog
      title="增加教室信息"
      :visible.sync="add_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="key">教室名称</div>
      <el-input
        placeholder=""
        v-model="classroom_name"
        clearable
        style="width: 70%"
      ></el-input>
      <div class="key">教室容量</div>
      <el-input-number
        v-model="classroom_capacity"
        :min="1"
        :max="200"
        label="描述文字"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassroom"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>

  <!-- <div class="ManageClassroom">
    <div class="showTable">
      <el-table
          :data="tables"
          ref="multipleTable"
          tooltip-effect="dark"
          style="font-size: 18px"
          max-height="700">
        <template v-for='(col) in tableData' :sortable="true" 
              :sort-method="sort">
          <el-table-column
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="150px"
              >
          </el-table-column>
        </template>
        <el-table-column label="delete" text-align="center" width="100px">
          <template slot-scope="scope">
            <el-button size="large" class="del-com" @click="deleteClassroom(scope.row.classroom)">
              <font-awesome-icon icon="far fa-trash-alt"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="addClassroom">
      add new classroom:&nbsp;
      <input type="text" class="inputClassroom" v-model.trim.lazy="addedClassroom"
             placeholder="addedClassroom" maxlength="64"/>
      &nbsp;
      <button type="button" @click="addClassroom">submit</button>
      <div class="ErrorMsg" v-show="addError">{{this.addError}} <br></div>
    </div>
  </div> -->
</template>

<script src="./ManageClassroom.js"></script>

<style lang="scss" scoped>
// @import "../css/button";
@import "../css/error_msg";
.classroom {
  width: 80%;
  margin-left: 100px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.course-list {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.key {
  font-size: 18px;
  margin: 10px;
}

.ManageClassroom {
  text-align: center;
  font-size: 28px;
  width: 100%;
  height: 100%;

  .showTable {
    color: black;
    text-align: center;
    margin: 10px 450px;
    border: #303030;
    height: 75%;

    el-table {
      color: black;
      max-width: 500px;
    }
  }

  .addClassroom {
    font-size: 20px;

    input {
      font-size: 20px;
      outline-style: none;
    }
  }

  .Back {
    font-size: 20px;
    line-height: 0.5;
  }
}
</style>