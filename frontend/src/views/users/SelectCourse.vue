<template>
  <!--for student-->
  <div class="SelectCourse" >
    <div v-show="permission">
      <div style="width:1200px; display: inline-block; margin-bottom: 20px;">
        <el-table
        :data="timeTable"
        style="width:1200px;"
        height="600"
        border
        :cell-class-name="addClass"
        :span-method="arraySpanMethod"
        :key="timeKey"
        >
        <el-table-column
            fixed
            prop="id,start,end"
            label="周课时"
            width="150"
            >
            <template slot-scope="scope">
              <div :class="scope.$index<5?'time-class1':(scope.$index<10?'time-class2':'time-class3')">
                第{{scope.row.id}}节<br>
                {{scope.row.start}}-{{scope.row.end}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            prop="day1Course,day1Room"
            label="星期日"
            width="150"
            >
            <template slot-scope="scope">
              <div>
                {{scope.row.day7Course}}<br>
                {{scope.row.day7Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期一"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day1Course}}<br>
                {{scope.row.day1Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期二"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day2Course}}<br>
                {{scope.row.day2Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期三"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day3Course}}<br>
                {{scope.row.day3Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期四"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day4Course}}<br>
                {{scope.row.day4Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期五"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day5Course}}<br>
                {{scope.row.day5Room}}
              </div>
            </template>
        </el-table-column>
        <el-table-column
            fixed
            label="星期六"
            width="150">
            <template slot-scope="scope">
              <div>
                {{scope.row.day6Course}}<br>
                {{scope.row.day6Room}}
              </div>
            </template>
        </el-table-column>
      </el-table>
      </div>
      <div width="100%" style="display: inline-block; border: 1.5px solid #132efc; border-radius:10px; padding: 10px 10px;">
        <el-tabs type="border-card">
        <el-tab-pane label="课程搜索" style="width:1200px;">
          <div v-show="!can_select">
            <h3>当前选课权限关闭</h3>
          </div>
          <div class="sousuo" v-show="can_select">
              <el-input
                maxlength="40"
                placeholder="用户名"
                style="width: 200px;float:left;"
                v-model.trim="searchContent"
                @blur="handleFilter"
                @keyup.enter.native="handleFilter($event)"
              ></el-input>
            <el-button
            class="ebtn1" @click="goSearch" style="float:left;">搜索</el-button>
            <el-button class="ebtn1" @click="selectReset" style="float:left;">重置</el-button>
          <div class="notify" style="width: 600px;">可以搜索的标签有：课程代码、课程名称、上课地点、上课时间、任课教师。<br>
            其中，上课时间、上课地点必须输入完整！</div>
          </div>
          
          <el-table
            style="width:1200px;"
            height="600"
            border
            id="table2"
            :data="all_course"
            highlight-current-row
            ref="all_course"
            @row-click="course_click"
            v-show="can_select"
          >
            <el-table-column
              fixed
              label="序号"
              width="60"
            >
            <template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column
              fixed
              prop="number"
              label="课程代码"
              width="100"
            ></el-table-column>
            <el-table-column
              fixed
              prop="credit"
              label="学分"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="hour"
              label="课时"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="课程"
              width="130"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="classroom.classroom_name"
              label="教室"
              width="80"
            ></el-table-column>
            <el-table-column
              fixed
              prop="timeInfo"
              label="上课时间"
              width="100"
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
              width="120"
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
              width="90"
            >
              <template slot-scope="scope">
                {{scope.row.selectedNumber}}/{{scope.row.capacity}}
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="academy"
              label="开课院系"
              width="140"
            ></el-table-column>
            <el-table-column
              fixed
              prop="majorList"
              label="开放专业"
              width="160"
            >
            <template slot-scope="scope">
              <ul >
                <li v-for="(item,index) in scope.row.majorList" :key="index">{{item}}</li>
              </ul>
            </template>
            </el-table-column>
            <el-table-column
              fixed
              label="选课"
              width="100"
            >
            <template slot-scope="scope">
              <button class="ebtn2" @click="goSelect(scope.$index,scope.row)">选课</button>
            </template>
            
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已选课程">
          <el-table
            style="width:1200px;"
            height="600"
            border
            id="table2"
            :data="selected_course"
          >
            <el-table-column
              fixed
              label="序号"
              width="60"
            >
            <template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column
              fixed
              prop="number"
              label="课程代码"
              width="100"
            ></el-table-column>
            <el-table-column
              fixed
              prop="credit"
              label="学分"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="hour"
              label="课时"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="课程"
              width="130"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="classroom.classroom_name"
              label="教室"
              width="80"
            ></el-table-column>
            <el-table-column
              fixed
              prop="timeInfo"
              label="上课时间"
              width="100"
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
              width="120"
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
              width="90"
            >
            <template slot-scope="scope">{{scope.row.selectedNumber}}/{{scope.row.capacity}}</template></el-table-column>
            <el-table-column
              fixed
              prop="academy"
              label="开课院系"
              width="140"
            ></el-table-column>
            <el-table-column
              fixed
              prop="majorList"
              label="开放专业"
              width="160"
            >
            <template slot-scope="scope">
              <ul >
                <li v-for="(item,index) in scope.row.majorList" :key="index">{{item}}</li>
              </ul>
            </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="退课"
              width="100"
            >
            <template slot-scope="scope">
              <button class="ebtn2" @click.prevent="goDrop(scope.$index,scope.row)" v-show="can_select">退课</button>
            </template>
            
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已修课程">
          <div style="margin-bottom: 10px;">
            <span style="margin-right:20px;">选择学期</span>
            <el-cascader
              v-model="school_year"
              :options="semester_options"
              @change="changeSemester"
            ></el-cascader>
            <span style="margin-left:20px;"><el-button class="ebtn1" @click="takenSearch">切换</el-button>
            <el-button class="ebtn1" @click="takenReset">重置</el-button></span>
          </div>
          <el-table
            style="width:1200px;"
            height="600"
            border
            id="table2"
            :data="taken_course"
          >
            <el-table-column
              fixed
              label="序号"
              width="60"
            >
            <template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column
              fixed
              prop="number"
              label="课程代码"
              width="100"
            ></el-table-column>
            <el-table-column
              fixed
              prop="credit"
              label="学分"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="hour"
              label="课时"
              width="60"
            ></el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="课程"
              width="130"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="classroom.classroom_name"
              label="教室"
              width="80"
            ></el-table-column>
            <el-table-column
              fixed
              prop="timeInfo"
              label="上课时间"
              width="100"
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
              width="120"
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
              width="90"
            >
            <template slot-scope="scope">{{scope.row.selectedNumber}}/{{scope.row.capacity}}</template></el-table-column>
            <el-table-column
              fixed
              prop="academy"
              label="开课院系"
              width="140"
            ></el-table-column>
            <el-table-column
              fixed
              prop="majorList"
              label="开放专业"
              width="160"
            >
            <template slot-scope="scope">
              <ul >
                <li v-for="(item,index) in scope.row.majorList" :key="index">{{item}}</li>
              </ul>
            </template>
            </el-table-column>
            <el-table-column
              fixed
              label="课程状态"
              width="100">
              已修
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>
    <div v-show="!permission" class="close">选课权限关闭</div>
  </div>
  
</template>

<script src="./SelectCourse.js">
</script>

<style lang="scss" scoped>
.SelectCourse {
  text-align: center;
  padding: 20px 20px;
  width: 100%;
  justify-content: center; // 水平居中
  position: relative;

  .inner {
    widows: 1400px;
    position: absolute;
    display: inline-block;
    left: 50%;
  }

  .options {
    padding: 20px 20px;
  }

  .showTable {
    margin-top: 10px;
    padding: 20px 50px;

    el-table {
      width: 100%;
    }
  }
  .close{
    padding: 100px;
    font-size: 100px;
    font-family: "Quicksand", sans-serif;
  }
  .el-table {
    color: #9f85fb;
    border: 1px solid;
    padding: 1px 1px !important;
  }
  .el-table ::v-deep .el-table__header th{
    color: rgb(80, 80, 80);
    background-color: rgb(132, 179, 237);
    text-align: center;
  }
  .el-table ::v-deep .el-table__body td {
    background-color: #f6fdff;
    height: 60px;
    line-height: 60px;
    padding: 0 !important;
    text-align: center;
    color: black;
    text

    &:first-child {
      background-color:rgb(222, 237, 254);
      color: black;
    }
    .time-class1 {
      background-color:rgb(255, 255, 201);
    }
  }
  .el-table ::v-deep .el-table__body td .course-class1 {
    background-color: rgba(56, 104, 235, 0.803);
  }
  .time-class1 {
    background-color:rgb(255, 255, 201);
  }
  .time-class2 {
    background-color: rgb(199, 255, 199);
  }
  .time-class3 {
    background-color:rgb(255, 226, 231);
  }
  .tabletitle-timeline{
    line-height: 18px!important;
  }

}
#table2 {
  border: none;
  padding: 1px 1px !important;
  ul {
    list-style: none;
  }
}
.el-input {
  background-color: rgba(56, 104, 235);
  padding: 1px 1px;
}
.ebtn1 {
  width:70px; 
  height: 40px; 
  text-align: center; 
  margin-left:20px;
  background-color: #85a1fb;
  color: black;
}
.ebtn1:hover {
  background-color: #cfdaff;
  color: black;
}
.ebtn2 {
  font-size: 8pt;
  text-decoration: none;
  width:50px; 
  height: 32px;
  text-align: center;
  display: inline-block;
  align-items: center;
  justify-content: center;
  background-color: rgb(132, 179, 237);
  color: black;
  border:none;
  border-radius: 5px;
}
.ebtn2:hover {
  background-color: #cfdaff;
  color: black;
}

</style>
<style>
.course-class1 {
  background: rgba(56, 104, 235, 0.803)!important;
}
.course-class2 {
  background: rgba(251, 232, 158, 0.803)!important;
}
.suosou {
  text-align: left; 
  padding: 2px 10px 4px 6px;
  float: left;
}
.notify {
  display:inline-block;
  float:left;
  max-width: 600px;
  font-size: 10pt;
  color: rgb(195, 161, 132);
  border: 1px solid rgba(56, 104, 235);
  margin-left: 20px;
}

</style>