<template>
  <div class="CourseStudent">
    <h2>View My Courses</h2>
    <div class="CourseTable">
      <CourseList :tables="courses"></CourseList>
    </div>
  </div>
</template>

<script src="./CourseStudent.js">
</script>

<style lang="scss" scoped>
@import "../../css/el_table";
.CourseStudent{
  padding: 5px;
  margin: 5px;

  .CourseTable{
    padding: 3px;
    margin: 0 auto;
  }
}
</style>