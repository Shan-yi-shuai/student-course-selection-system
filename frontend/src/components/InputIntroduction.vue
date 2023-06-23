<template>
  <div class="inputInformation">
    <h3>Provide some information about the course</h3>
    <div class="ErrorMsg" v-show="introduction_error">
      Please fill this blank!
    </div>
      <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Give Information"
          v-model="Introduction"
          @change="checkIntroduction"
      >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "InputIntroduction",
  props:{
    introduction: String
  },
  mounted(){
    this.Introduction = this.$props.introduction
  },
  data(){
    return {
      introduction_error: true,
      Introduction: ""
    }
  },
  methods:{
    checkIntroduction(){
      this.introduction_error = !!this.$props.introduction
      let emitData = {
        data: this.Introduction,
        error: this.introduction_error
      }
      this.$emit("addToForm",emitData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/error_msg";
.ErrorMsg{
  text-align: left;
}
</style>