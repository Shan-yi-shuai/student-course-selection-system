<template>
  <div class="BasicInformation">
    <div class="BasicInfo_name">Capacity</div> 
    <div class="BasicInfo_input">
      <input type="number" v-model.number.trim.lazy="this_capacity" @change="writeCapacity">
    </div>
    <div class="ErrorMsg">{{this.error_msg}}</div>

  </div>
</template>

<script>
import {has_only_digit} from "@/util/util";
export default {
  name: "InputCapacity",
  data() {
    return {
      this_capacity: 0,
      error: true,
      error_msg: ""
    }
  },
  props:{
    capacity: Number
  },
  created() {
    // this.$props.capacity = Number(this.$props.capacity);
    // console.log(this.$props.capacity, typeof(this.$props.capacity), typeof this.this_capacity);
    this.this_capacity = this.$props.capacity;
    this.error = this.this_capacity>0
  },
  methods:{
    writeCapacity(){
      // console.log(this.this_capacity, typeof(this.this_capacity));
      //this.error = this.this_capacity===null || has_only_digit(this.capacity.toString()) || this.this_capacity<=0
      if(this.this_capacity===undefined || !this.this_capacity){
        this.error_msg = "Please fill this blank!"
      }
      else if(!has_only_digit(this.this_capacity.toString()) ||
              this.this_capacity<=0){
        this.error_msg = "The capacity should be a positive integer!"
      }
      else{
        this.error_msg = ""
      }
      //this.this_capacity = String(this.this_capacity);
      this.error = this.error_msg!==""
      let emit_data = {
        data: this.this_capacity,
        error: this.error
      }
      this.$emit('addToForm',emit_data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/error_msg";
@import "../css/BasicInformation";
</style>