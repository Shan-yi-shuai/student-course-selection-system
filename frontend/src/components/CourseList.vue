<template>
  <div class="CourseList">
    <StudentList
        :dialog="dialog"
        :students="shownStudents"
        @close="()=>{this.dialog=false}"></StudentList>
    <el-table
        :data="this.$props.tables"
        tooltip-effect="dark"
        style="font-size: 15px; width:100%"
        max-height="1200">

      <el-table-column width="80px">
        <template slot-scope="scope">
          <el-button
              size="large"
              @click="showStudents(scope.row.studentInfo)"
              icon="el-icon-info">
          </el-button>
        </template>
      </el-table-column>

      <template v-for='(col) in courseData'>
        <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.dataItem"
            :label="col.dataName"
            :key="col.dataItem"
            width="150px">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import StudentList from "@/components/StudentList";
import default_table_data from "@/util/default_table_data";
export default {
  name: "CourseList",
  components: {StudentList},
  props:{
    tables: Array,
    student_data: Array,
    course_data: Array
  },
  created() {
    // console.log(this.$props);
    if(this.$props.student_data)
      this.studentData = this.$props.student_data;
    if(this.$props.course_data)
      this.courseData = this.$props.course_data;
    // console.log(this.courseData);
  },
  data(){
    return{
      dialog: false,
      studentData: [
        {
          dataItem: 'user_name',
          dataName: 'name'
        },
        {
          dataItem: 'user_number',
          dataName: 'number'
        }
      ],
      courseData: [
        default_table_data.default_id,
        {
          dataItem: 'course_name',
          dataName: 'name'
        },
        {
          dataItem:'teachers',
          dataName:'teacher'
        },
        default_table_data.default_introduction,
        default_table_data.default_hour,
        default_table_data.default_credit,
        default_table_data.default_classroom
      ],
      shownStudents: []
    }
  },
  methods:{
    showStudents(info){
      // console.log(info)
      this.dialog = true;
      this.shownStudents = info;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/el_table";
.CourseList{
  margin: 10px;
}

.el-table-column{
  font-size: 25px;
}

</style>