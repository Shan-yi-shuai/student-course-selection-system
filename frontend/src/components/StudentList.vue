<template>
  <el-dialog
      :visible.sync = "this.$props.dialog"
      :before-close="handleClose">
    <span slot="title" class="el-dialog__header">Students</span>
    <el-table :data="students" tooltip-effect="dark">
      <template v-for='(col) in studentData'>
        <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.dataItem"
            :label="col.dataName"
            :key="col.dataItem">
        </el-table-column>
      </template>
    </el-table>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">OK</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {pass} from "@/util/util";

export default {
  name: "StudentList",
  props:{
    dialog: Boolean,
    students: Array,
    student_data: Array
  },
  data(){
    return {
      // visible: false,
      studentData: [
        {
          dataItem: 'user_name',
          dataName: 'student name'
        },
        {
          dataItem: 'user_number',
          dataName: 'student number'
        }
      ],
    }
  },
  created() {
    if(this.$props.student_data)
      this.studentData = this.$props.student_data;
  },
  methods:{
    handleClose() {
      this.$confirm('确认关闭？')
          .then(()=>{
            // this.visible=false;
            this.$emit('close', false)
          })
          .catch(pass);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/el_table";
@import "../css/el_dialog";
</style>