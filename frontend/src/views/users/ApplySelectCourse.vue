<template>
    <div class="AppplySelectCourse" >
        <el-tabs>
        <el-tab-pane label="课程搜索" style="width:100%;">
          <div v-show="!permission" style="text-align:center;">
            <h3>当前选课申请权限关闭</h3>
          </div>
          <div style="text-align: left; padding: 2px 10px 40px 10px;" v-show="permission">
            <el-input
            maxlength="40"
            placeholder="用户名"
            style="width: 200px;float:left;"
            v-model="searchContent"
            @blur="handleFilter"
            @keyup.enter.native="handleFilter($event)"
          ></el-input>
          <el-button
            style="margin-left: 18px;float:left;height: 40px;"
            class="ebtn-course" @click="goSearch">搜索</el-button>
            <el-button class="ebtn-course" @click="selectReset" style="float:left;height: 40px;">重置</el-button>
          <div class="notify" style="width: 600px;">可以搜索的标签有：课程代码、课程名称、上课地点、上课时间、任课教师。<br>
            其中，上课时间、上课地点必须输入完整！</div>
          </div>
          <div style="padding: 5px 10px; justify-align:center;" v-show="permission">
            <el-table
              style="width:100%;"
              height="800"
              border
              class="table-course"
              :data="all_course"
            >
            <el-table-column
              fixed
              label="序号"
              min-width="5%"
            >
            <template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column
              fixed
              prop="number"
              label="课程代码"
              min-width="11%"
            ></el-table-column>
            <el-table-column
              fixed
              prop="credit"
              label="学分"
              min-width="5%"
            ></el-table-column>
            <el-table-column
              fixed
              prop="hour"
              label="课时"
              min-width="5%"
            ></el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="课程"
              min-width="12%"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="classroom.classroom_name"
              label="教室"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              fixed
              prop="timeInfo"
              label="上课时间"
              min-width="10%"
            >
              <template slot-scope="scope">
                <ul>
                  <li v-for="(item,index) in scope.row.time" :key="index">
                    {{item.week_day}}[{{item.time}}]
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="userInfo"
              label="任课教师"
              min-width="10%"
            >
              <template slot-scope="scope">
                <ul >
                  <li v-for="(item,index) in scope.row.userInfo" :key="index">{{item.user_name}}</li>
                </ul>
            </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="selectedNumber,capacity"
              label="容量"
              min-width="6%"
            >
            <template slot-scope="scope">{{scope.row.selectedNumber}}/{{scope.row.capacity}}</template></el-table-column>
            <el-table-column
              fixed
              prop="academy"
              label="开课院系"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              fixed
              prop="majorList"
              label="开放专业"
              min-width="10%"
            >
            <template slot-scope="scope">
              <ul >
                <li v-for="(item,index) in scope.row.majorList" :key="index">{{item}}</li>
              </ul>
            </template>
            </el-table-column>
            <el-table-column
              fixed
              label="申请"
              min-width="8%"
            >
            <template slot-scope="scope">
              <el-button class="ebtn-course" @click="goApply(scope.row, scope.$index)">申请</el-button>
            </template>
            
            </el-table-column>
          </el-table>
          </div>
          
        </el-tab-pane>
        <el-tab-pane label="我的申请">
            <el-table
            style="width:100%;"
            min-width="1200"
            height="800"
            border
            class="table-course"
            :data="all_apply"
          >
            <el-table-column
              fixed
              label="序号"
            >
            <template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column
              fixed
              prop="course_number"
              label="课程代码"
            ></el-table-column>
            <el-table-column
              fixed
              prop="course_name"
              label="课程"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="reason"
              label="申请原因"
            ></el-table-column>
            <el-table-column
              fixed
              prop="school_year"
              label="申请学年"
            >
            <template slot-scope="scope">
                {{scope.row.school_year}}-{{scope.row.school_year+1}}
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="term"
              label="申请学期"
            >
            </el-table-column>
            <el-table-column
              fixed
              label="审核状态"
              prop="status"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script src="./ApplySelectCourse.js">
</script>

<style lang="scss" scoped>
@import "../../css/button";
@import "../../css/el_table2";
.SelectCourse {
  text-align: center;
  padding: 20px 20px;
  width: 100%;
  justify-content: center; // 水平居中
  // display: flex;
  // flex-direction: column;
  position: relative;
  display: flex;
  
}


</style>