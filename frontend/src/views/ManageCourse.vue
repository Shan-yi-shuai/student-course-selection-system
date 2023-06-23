<template>
  <div class="ManageCourse">
    <h1>Manage all the courses</h1>
    <SearchCourse @get="getSearched"></SearchCourse>
    <div class="showTable">
      <CourseTable
          :tables="tables"
          @delete="deleteCourse"
          @modify="modifyCourse"
      ></CourseTable>
    </div>

    <h2>Add New Course</h2>
    <div class="toAddCourse">
      You can also
      <button type="button" @click="toAddCourse">add course manually</button>
    </div>
    <CourseCsv></CourseCsv>
  </div>
</template>

<script src="./ManageCourse.js">
</script>

<style lang="scss" scoped>
@import "../css/button";

.ManageCourse{
  text-align: center;
  padding: 10px;
  line-height: 1.5;

  .showTable{
    padding: 20px 50px;
  }

  .AddCourse{
    text-align: center;
    padding: 10px 20px;
  }

}
</style>