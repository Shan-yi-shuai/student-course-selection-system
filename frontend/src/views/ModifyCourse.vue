<template>
  <div class="ModifyCourse">
    <div class="inputTable">
      <router-link :to="{name:from}">Go back</router-link>
      <div class="simpleInformation">
        <h3>Basic Information</h3>
        <table>
          <tr>
            <th>Course Name</th>
            <th><input type="text" maxlength="128" v-model="addedCourse.name" disabled="disabled"></th>
          </tr>
          <tr v-show="is_admin">
            <th>Course Number</th>
            <th><input type="text" maxlength="16" v-model="addedCourse.number" disabled="disabled"></th>
          </tr>
          <tr v-show="is_admin">
            <th>Capacity</th>
            <th><el-input-number
                  v-model="addedCourse.capacity"
                  size="small"
                  :step="1"
                  :min="1"
                  @change="checkCapacity"
              ></el-input-number>
            </th>
            <td><div class="error">{{capacity_error}}</div></td>
            
          </tr>
          <tr v-show="is_admin">
            <th>Hour</th>
            <th><el-input-number
                  v-model="addedCourse.hour"
                  size="small"
                  :step="1"
                  :min="1"
              ></el-input-number>
              </th>
          </tr>
          <tr v-show="is_admin">
            <th>Credit</th>
            <th><el-input-number
                  v-model="addedCourse.credit"
                  size="small"
                  :step="0.5"
                  :min="0.5"
              ></el-input-number>
              </th>
          </tr>

        </table>
      </div>

      <div class="selectClassroom">
        <h3>Select classroom: {{this.addedCourse.classroom.classroom_name}}</h3>
        <el-select v-model="new_location" @change="selectLocation">
          <el-option v-for="(value,index) in all_classrooms" :value="value" :key="index">{{value.classroom_name}}</el-option>
        </el-select>
        <div class="error">{{classroom_error}}</div>
      </div>

      <div class="inputInformation" v-show="is_admin">
        <h3>Provide some information about the course</h3>
        <textarea
            cols="65"
            rows="10"
            maxlength="512"
            v-model="addedCourse.introduction">
        </textarea>
        <br>
      </div>

      <div class="selectAcademy" v-show="is_admin">
        <h3>Select academy</h3>
        <select class="select" v-model="addedCourse.academy" @change="selectMajor" disabled="disabled">
          <option value="">Please select academy</option>
          <option v-for="item in college_list"
                  v-bind:key="item.id"
                  v-text="item.name"
                  v-show="!college_selected"
          ></option>
        </select>
      </div>

      <div class="makeList" v-show="is_admin">
        <h3>Add teachers:</h3>
        <table v-show="isTeacher" id="d1" width="400px">
          <tr width="400px">
            <td width="200px">name: {{username}}</td>
            <td width="200px">number: {{user.number}}</td>
          </tr>
        </table>
        <div v-show="!isTeacher">
          <el-select v-model="add_a_teacher" @change="selectTeacher">
          <el-option v-for="(value,index) in username_list" :value="value.name" :key="index">{{value.name}}</el-option>
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
        <SelectClassTime @addToForm="_addTime" :buttonVisible="true">></SelectClassTime>
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

      <div class="setLimit" v-show="is_admin">
        <h3>Set major limits</h3>

        <div v-for="(major,index) in all_major" v-bind="major_length" v-bind:key="index">
          <input :indeterminate="false"
                 type="checkbox"
                 disabled="disabled"
                 :checked="major.checked"
                 @change="addLimits(major.name)">{{major.name}}
        </div>
      </div>

      <button type="button" @click="addCourse">submit</button>
    </div>
  </div>
</template>

<script src="./ModifyCourse.js"></script>

<style lang="scss" scoped>
@import "../css/button";
@import "../css/course_form";
.ModifyCourse{
  padding: 30px;
  .inputTable{
    textarea{
      resize: vertical;
    }

    .selectAcademy,.setLimit,.makeList,.simpleInformation,.inputInformation{
      padding: 15px;
    }
  }
  .error {
    font-size: 12pt;
    color:chocolate;
    padding-left: 20px;
    text-align: left;
  }
}
</style>