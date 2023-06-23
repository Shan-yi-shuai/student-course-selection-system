<template>
  <div class="SelectClassroom">
    <h3>Select classroom: {{this.new_location.classroom}}</h3>
    <el-select v-model="new_location">
      <el-option v-for="(value,index) in all_classrooms" :value="value.classroom_name" :key="index"
        @click.native="selectLocation(index)">{{value.classroom_name}}</el-option>
    </el-select>
  </div>
</template>

<script>
import domain from "../util/domain"
export default {
  name: "SelectClassroom",
  components:{},
  data(){
    return {
      new_location: {
        classroom: ""
      },
      all_classrooms: []
    }
  },
  mounted() {
    this.getClassrooms()
  },
  methods:{
    getClassrooms() {
      if(this.all_classrooms.length){
        return
      }
      let _this = this;
      _this.$http.get(domain.get_classrooms, { params: {} })
          .then((res) => {
            // console.log(res.data);
            if (res.data.code === 1) {
              this.all_classrooms = [];
              let len = res.data.data.length
              for (let i = 0; i < len; i++) {
                this.all_classrooms.push(res.data.data[i]);
              }
              // console.log(this.all_classrooms);
            }
          });
    },
    selectLocation(index){
      // console.log(index,this.new_location,this.all_classrooms[index]);
      this.$emit("addToForm", this.all_classrooms[index]);
      // console.log(this.new_location)
    }
  }
}
</script>

<style lang="scss" scoped>
.SelectClassroom {
  width: 500px;
  display: flex;
  margin-top: 12px;
  margin-bottom: 4px;
  h3 {
    width: 220px;
  }
}

</style>