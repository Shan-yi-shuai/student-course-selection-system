<template>
  <div class="selectClassTime">
    <h3>Select class time</h3>
    &nbsp; &nbsp;
    <label>Weekday:</label>
    &nbsp;
    <el-select v-model="new_time.week_day" @change="addWeekDay">
      <el-option v-for="(value,index) in all_weekday" :value="value.weekday" :key="index">{{value.weekday}}</el-option>
    </el-select>
    &nbsp;
    <label>Class Number:</label>
    &nbsp;
    <el-select v-model="new_time.class_number" @change="addNumber">
      <el-option v-for="(value,index) in all_class_number" :value="value.class_number" :key="index">{{value.class_number}}</el-option>
    </el-select>
    &nbsp; &nbsp;
    <button v-on:click="addTime" v-if="button_visible">{{ this.add_type }}</button>
    <div class="ErrorMsg" v-show="new_time.week_day==='0'||new_time.class_number==='0'">{{this.errorMsg}}</div>
  </div>
</template>

<script>
export default {
  name: "SelectClassTime",
  components:{},
  props:{
    buttonVisible:Boolean,
    type: String,
  },
  data(){
    return{
      button_visible:true,
      add_type: "add time",
      errorMsg:"",
      new_time:{
        week_day: "0",
        class_number:"0"
      },

      all_weekday:[
        {weekday:"1"},
        {weekday:"2"},
        {weekday:"3"},
        {weekday:"4"},
        {weekday:"5"},
        {weekday:"6"},
        {weekday:"7"},
      ],
      all_class_number:[
        {class_number:"1"},
        {class_number:"2"},
        {class_number:"3"},
        {class_number:"4"},
        {class_number:"5"},
        {class_number:"6"},
        {class_number:"7"},
        {class_number:"8"},
        {class_number:"9"},
        {class_number:"10"},
        {class_number:"11"},
        {class_number:"12"},
        {class_number:"13"}

      ]

    }
  },
  mounted(){
    if(this.$props.type){
      this.add_type = this.$props.type
    }
    if(this.$props.buttonVisible!=undefined){
      this.button_visible=this.$props.buttonVisible;
    }
  },
  methods:{
    addTime(){
      if(this.new_time.week_day!=="0" && this.new_time.class_number!=="0") {
        let emit_data = {
          week_day: this.new_time.week_day,
          class_number: this.new_time.class_number
        }
        this.$emit("addToForm", emit_data)
        // console.log(emit_data)

        this.new_time = {
          week_day: "0",
          class_number: "0"
        }
        this.errorMsg=""
      }
      else{
        this.errorMsg="Please fill all the blanks!"
      }
    },
    addNumber(){
      this.$emit("addNumber",this.new_time.class_number);
    },
    addWeekDay(){
      this.$emit("addWeekDay",this.new_time.week_day);
    },
    chooseDay(){
      // console.log(this.new_time.week_day)
    },
    chooseNumber()
    {
      // console.log(this.new_time.class_number)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/button";
@import "../css/error_msg";
button{
  margin-left: 5px;
}

.SelectClassTime{
  margin: 2px;
  padding: 2px;

  .el-select{
    margin-left: 5px;
  }

}
</style>