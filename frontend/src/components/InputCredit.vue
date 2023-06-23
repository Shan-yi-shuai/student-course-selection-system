<template>
  <div class="BasicInformation">
    <div class="BasicInfo_name">Credict</div>
    <div class="BasicInfo_input">
<!--      <input type="text" v-model.number.trim.lazy="this_credit" @change="writeCredit">-->
      <el-input-number
          v-model="this_credit"
          @change="writeCredit"
          :step="0.5"
          :min="0.5"
      ></el-input-number>
      </div>
    <div class="ErrorMsg">{{this.error_msg}}</div>
    

  </div>
</template>

<script>
export default {
  name: "InputCredit",
  data() {
    return {
      this_credit: null,
      error: true,
      error_msg: ""
    }
  },
  components:{},
  props:{
    credit:String
  },
  created() {
    // console.log(this.$props.credit, typeof(this.$props.credit));
    this.this_credit = this.$props.credit;
    this.error = this.this_credit>0
  },
  methods:{
    writeCredit(){
      if(this.this_credit===undefined || !this.this_credit) {
        this.error_msg = "Please fill this blank!"
      }
      else{
        this.error_msg = ""
      }
      this.this_credit = String(this.this_credit);
      // console.log(typeof(this.this_credit));
      this.error = this.error_msg!==""
      let emit_data = {
        data: this.this_credit,
        error: this.error
      }
      this.$emit('addToForm',emit_data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/BasicInformation";
@import "../css/error_msg";
.ErrorMsg{
  padding-left: 15px;
  padding-top: 10px;
}
</style>