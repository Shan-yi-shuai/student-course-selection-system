<template>
  <div class="AddCourse">
    <div class="inputTable">
     <router-link :to="{name:from}">Go back</router-link>
      <div class="simpleInformation">
        <h3>Basic Information</h3>
        <table>
          <tr>
            <td>Course Name</td>
            <td><input type="text" maxlength="128" v-model="addedCourse.name"></td>
            <td class="ErrorMsg" v-show="!this.addedCourse.name">Please fill this blank!</td>
          </tr>
          <tr>
            <td>Hour</td>
            <td>
            <el-input-number
                  v-model="addedCourse.hour"
                  :step="1"
                  :min="1"
                  size="small"
              ></el-input-number></td>
          </tr>
          <td>Credit</td>
            <td>
            <el-input-number
                  v-model="addedCourse.credit"
                  :step="0.5"
                  :min="0.5"
                  size="small"
              ></el-input-number></td>
          </tr>
          <tr>
          <td>Capacity</td>
            <td>
            <el-input-number
                  v-model="addedCourse.capacity"
                  :step="1"
                  :min="1"
                  size="small"
                  @change="selectCapacity"
              ></el-input-number></td>
              <div class="error">{{classroom_error}}</div>
          </tr>
        </table>
      </div>

      <!-- <div>
        <InputCredit :credit="addedCourse.credit" @addToForm="getCredit"></InputCredit>
      </div> -->

      <!-- <div>
        <InputCapacity :capacity="addedCourse.capacity" @addToForm="getCapacity"></InputCapacity>
      </div> -->

      <div class="selectClassroom">
        <h3>Select classroom: {{this.new_location.classroom}}</h3>
        <el-select v-model="new_location" @change="selectLocation" placeholder="select">
          <el-option v-for="(item,index) in all_classrooms" :value="index" :key="index" :label="item.classroom_name">
          </el-option>
        </el-select>
        <!-- <div class="error">{{classroom_error}}</div> -->
      </div>

      <div class="inputInformation">
        <InputIntroduction
            :introduction="addedCourse.introduction"
            @addToForm="getIntroduction"></InputIntroduction>
      </div>

      <div class="selectAcademy" v-show="!isTeacher">
        <h3>Select academy</h3>
          <el-select v-model="select_academy" @change="selectAcademy" placeholder="select">
            <el-option v-for="(item,index) in college_list"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
            </el-option>
          </el-select>
      </div>
      <div class="selectAcademy" v-show="isTeacher">
        <h3>Select academy</h3>
        <div>{{academy}}</div>
        </div>

      <div class="makeList">
        <h3>Add teachers:</h3>
        <table v-show="isTeacher" id="d1" width="400px">
          <tr width="400px">
            <td width="200px">name: {{username}}</td>
            <td width="200px">number: {{user.number}}</td>
          </tr>
        </table>
        <div v-show="!isTeacher">
          <el-select v-model="add_a_teacher" @change="selectTeacher" placeholder="select">
            <el-option v-for="(item,index) in for_selected_user" :value="index" :key="index" :label="item.name">
            </el-option>
          </el-select>
          <button v-on:click="addTeacher">add teacher</button>
          <el-table
            :data="this.addedCourse.userInfo"
            ref="multipleTable"
            tooltip-effect="dark"
            style="font-size: 15px"
            max-height="300">
          <el-table-column label="Teachers" text-align="center" width="100px">
            <template slot-scope="scope">
              <el-button size="large" class="del-com" @click="deleteTeacher(scope.row)">
                <font-awesome-icon icon="far fa-trash-alt"/>
              </el-button>
            </template>
          </el-table-column>
          <template v-for='(col) in this.userForm'>
          <el-table-column
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="150px"
          >
          </el-table-column>
          </template>
        </el-table>
        </div>

      </div>

      <div class="makeList">

        <SelectClassTime @addToForm="_addTime" :buttonVisible="true"></SelectClassTime>
        <el-table
            :data="this.addedCourse.timeInfo"
            ref="multipleTable"
            tooltip-effect="dark"
            style="font-size: 15px"
            max-height="300">
          <el-table-column label="Time" text-align="center" width="100px">
            <template slot-scope="scope">
              <el-button size="large" class="del-com" @click="deleteTime(scope.row)">
                <font-awesome-icon icon="far fa-trash-alt"/>
              </el-button>
            </template>
          </el-table-column>
          <template v-for='(col) in this.timeForm'>
            <el-table-column
                :show-overflow-tooltip="true"
                :prop="col.dataItem"
                :label="col.dataName"
                :key="col.dataItem"
                width="150px"
            >
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="setLimit">
        <h3>Set major limits</h3>
        <!-- <input :indeterminate="false" v-model="majorCheckAll"
                        type="checkbox"
                        @change="majorCheckAllHandle">全选
        <div v-for="(major,index) in all_major" v-bind="major_length" v-bind:key="index">
          <input :indeterminate="false"
                 type="checkbox"
                 @change="addLimits(major.name)">{{major.name}}
        </div> -->
        <el-checkbox :indeterminate="isIndeterminate" v-model="majorCheckAll" @change="majorCheckAllHandle">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedMajors" @change="addLimits">
          <el-checkbox v-for="(item,index) in all_major" :label="item" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="time">
        <span style="margin-right:20px;">选择授课学期</span>
        <el-cascader
          v-model="time"
          :options="semester_options"
          @change="changeSemester"
        ></el-cascader>
      </div>

      <button type="button"
        style="margin-top: 20px;"
       @click="addCourse">submit</button>
    </div>
  </div>
</template>

<script src="./AddCourse.js"></script>
<style lang="scss" scoped>
@import "../css/button";
@import "../css/course_form";
.AddCourse{
  padding: 30px;
  .inputTable{
    #d1 table td{border:10px solid white;}

    textarea{
      resize: none;
      height: 100px;
      width: 400px;
    }

    .makeList,.setLimit,.simpleInformation,.selectAcademy,.inputInformation{
      padding: 15px;
    }
    .selectClassroom {
      display: flex;
    }
  }
  .error {
    font-size: 15pt;
    color:chocolate;
    padding-left: 20px;
    text-align: left;
  }

}
</style>