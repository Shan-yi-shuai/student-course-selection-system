<template>
  <div class="SearchCourse">
    <h2>Search Course</h2>
    <div class="SearchBox">
      <div class="Inputs">
        <div class="InputPackage">
          <label>Number</label>
          <div class="Input">
            <el-input v-model="courseNumber"></el-input>
          </div>
        </div>

        <div class="InputPackage">
          <label>Name</label>
          <div class="Input">
            <el-input v-model="courseName"></el-input>
          </div>
        </div>

        <div class="InputPackage">
          <label>Year</label>
          <div class="Input">
            <el-input v-model.number.trim.lazy="schoolYear"></el-input>
          </div>
        </div>

        <div class="InputPackage">
          <label>Semester</label>
          <div class="Input">
            <el-input v-model.number.trim.lazy="term"></el-input>
          </div>
        </div>

        <div class="InputPackage">
          <label>Teacher</label>
          <div class="Input">
            <el-input v-model="teacherName"></el-input>
          </div>
        </div>

        <div class="InputPackage">
          <label>Classroom</label>
          <div class="Input">
            <el-input v-model="classroomName"></el-input>
          </div>
        </div>

        <SelectClassTime :type="'ok'" :buttonVisible="false" @addToForm="selectTime" @addNumber="addNumber" @addWeekDay="addWeekDay"></SelectClassTime>
      </div>
      <div class="Search">
        <button @click="searchCourse">SEARCH</button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectClassTime from "@/components/SelectClassTime";
import { catch_err } from "@/util/util";
import domain from "@/util/domain";

export default {
  name: "SearchCourse",
  components: {
    SelectClassTime,
  },
  data() {
    return {
      schoolYear: null,
      term: null,
      time: {
        class_number: null,
        week_day: null,
      },
      classroomName: null,
      courseNumber: null,
      courseName: null,
      teacherName: null,
    };
  },
  methods: {
    searchCourse() {
      // console.log(this.$data);
      //this.$emit("get", fake_data.search_result.data);
      let _this = this;
      // console.log(this.$data);
      _this.$http
        .post(domain.search_course, this.$data, {})
        .then((res) => {
          // console.log(res.data);
          if (res.data.code) {
            this.$emit("get", res.data.data);
          }
        })
        .catch(catch_err);
    },
    selectTime(time) {
      this.time.class_number = parseInt(time.class_number);
      this.time.week_day = parseInt(time.week_day);
    },
    addNumber(number){
      this.time.class_number=number;
    },
    addWeekDay(day){
      this.time.week_day=day;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../css/button";
@import "../css/SearchBox";
.SearchCourse {
  text-align: center;
  align-items: center;
  align-content: center;
  width: 100%;
}
</style>
