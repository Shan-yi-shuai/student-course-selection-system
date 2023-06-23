<template>
  <div class="showCourse">
    <StudentList
        :dialog="dialog"
        :students="shownStudents" @close="closeStudents"></StudentList>
    <el-table
        :data="this.$props.tables"
        ref="multipleTable"
        tooltip-effect="dark">

      <el-table-column label="modify" align="center" width="89px">
        <template slot-scope="scope">
          <el-button size="large" class="del-com" @click="modifyCourse(scope.row.id)">
            <font-awesome-icon icon="fa fa-plus-square"/>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="delete" align="center" width="85px">
        <template slot-scope="scope">
          <el-button size="medium" class="del-com" @click="deleteCourse(scope.row.id)">
            <font-awesome-icon icon="far fa-trash-alt"/>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="pupil" width="80px">
        <template slot-scope="scope">
          <el-button
              size="large"
              @click="showStudents(scope.row.studentInfo)"
              icon="el-icon-info">
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
          type="expand"
          class="expanded_row"
          width="60px">
        <template slot-scope="props">
          <el-form
              label-position="left">
            <template v-for="(col) in tableData">
              <el-form-item
                  :key="col.dataItem"
                  :prop="col.dataItem">
                <label>{{col.dataName}}</label>:
                <label>{{props.row[col.dataItem]}}</label>
              </el-form-item>
            </template>
          </el-form>
        </template>
      </el-table-column>

      <template v-for='(col) in briefData'>
        <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.dataItem"
            :label="col.dataName"
            :key="col.dataItem">
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
import default_table_data from "@/util/default_table_data";
import StudentList from "@/components/StudentList";

export default {
  name: "CourseTable",
  components: {StudentList},
  data () {
    return {
      dialog: false,
      briefData:[
        default_table_data.name_course,
        default_table_data.number_id,
        default_table_data.userinfo_teachers,
        default_table_data.timeinfo_class_time,
        default_table_data.selectedNumber_actual_number
      ],
      tableData: [
        default_table_data.number_id,
        default_table_data.default_academy,
        default_table_data.default_hour,
        default_table_data.default_credit,
        default_table_data.userinfo_teachers,
        default_table_data.timeinfo_class_time,
        default_table_data.default_introduction,
        default_table_data.default_location,
        default_table_data.default_capacity,
        default_table_data.majors_limits,
        default_table_data.default_selectedNumber,
        default_table_data.default_semester
      ],
      shownStudents: []
    }
  },
  component: {},
  props:{
    tables: Array
  },
  created(){
    // console.log(this.$props.tables)
  },
  methods:{
    deleteCourse(course_id)
    {
      this.$emit('delete',course_id)
    },
    modifyCourse(course_id){
      // console.log(course_id)
      this.$emit('modify',course_id)
    },
    showStudents(info){
      // console.log(info)
      this.dialog = true;
      this.shownStudents = info;
    },
    closeStudents(dl){
      this.dialog = dl;
      this.shownStudents = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/el_table";
.el-table{
  font-size: 20px;
}

</style>