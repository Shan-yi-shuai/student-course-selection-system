<template>
  <el-table
      :data="this.$props.tables"
      tooltip-effect="dark"
      style="font-size: 15px; width:100%"
      max-height="1200"
      class="table">

    <el-table-column
        type="expand"
        class="expanded_row"
        >
      <template slot-scope="props">
        <el-form
            label-position="left">
          <template v-for="(col) in tableData">
            <el-form-item
                :key="col.dataItem"
                :prop="col.dataItem">
              <label>{{col.dataItem}}</label>:
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
          :key="col.dataItem"
          width="200">
      </el-table-column>
    </template>

    <el-table-column align="center" width="60px" >
      <template slot-scope="scope">
        <el-button
            size="large"
            class="approve"
            @click="approveApplication(scope.row.id)"
            v-if="approvable">
          <font-awesome-icon icon="fa-solid fa-circle-check" />
        </el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" width="60px" >
      <template slot-scope="scope">
        <el-button
            size="large"
            class="reject"
            @click="deleteApplication(scope.row.id)"
            v-if="deletable">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import default_table_data from "@/util/default_table_data";
export default {
  name: "ApplicationTable",
  props:{
    tables: Array,
    deletable: Boolean,
    approvable: Boolean,
    table_data: Array,
    brief_data: Array
  },
  created(){
    // console.log(this.$props.tables)
    if(this.$props.table_data)
      this.tableData = this.$props.table_data;
    if(this.$props.brief_data)
      this.briefData = this.$props.brief_data;
  },
  data(){
    return{
      tableData: [
        default_table_data.default_id,
        default_table_data.default_name,
        default_table_data.default_number,
        default_table_data.default_academy,
        default_table_data.default_hour,
        default_table_data.default_credit,
        default_table_data.default_applicant,
        default_table_data.default_introduction,
        default_table_data.default_userinfo,
        default_table_data.default_timeinfo,
        default_table_data.default_location,
        default_table_data.default_status,
        default_table_data.default_capacity,
        default_table_data.default_type,
        default_table_data.default_school_year,
        default_table_data.default_term,
      ],
      briefData: [
        default_table_data.default_id,
        default_table_data.default_name,
        default_table_data.default_status,
        default_table_data.default_type,
      ]
    }
  },
  methods:{
    approveApplication(id){
      // console.log(id)
      this.$emit('approve',{app_id:id})
    },
    deleteApplication(id){
      // console.log(id)
      this.$emit('delete',{app_id:id})
    },
    viewApplication(id){
      // console.log(id)
    }
  }
}
</script>

<style lang="scss" >
@import "../css/el_table";
::v-deep.table{
  width:1200px;
}
button{
  font-size: 20px;
}

</style>
