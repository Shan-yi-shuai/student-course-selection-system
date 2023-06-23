<template>
  <div class="importCSV">
    <label >Choose a csv file to upload</label><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="file" id="files" name="file" ref="refFile" @change="importCSV" accept=".csv">
    <div class="sign-up"><button type="button" @click="registerCSV">Sign Up</button></div>

  </div>
</template>

<script>
import Papa from "papaparse";
import {parse_to_object_list} from "@/util/util";
import domain from "@/util/domain";

export default {
  name: "CourseCsv",
  data(){
    return {
      csv_user: [],
      csv_submit_check: false,
      csv_import_check: false
    }
  },
  methods:{
    importCSV() {
      let selectedFile = this.$refs.refFile.files[0];
      if (selectedFile === undefined) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = event => {
        // console.log(event.target.result);
        Papa.parse(selectedFile, {
          split: '|',
          encoding: 'ANSI',
          complete: res => {
            let objArray = parse_to_object_list(res.data)
            this.csv_import_check = true;
            this.csv_user = objArray;
            // console.log(this.csv_user)
          }
        });
      }
    },
    registerCSV() {
      this.csv_submit_check = true;
      if (this.csv_import_check) {
        // console.log(this.csv_user);
        let _this = this;
        _this.$http
            .post(domain.course_add_all, this.csv_user, {})
            .then((res) => {
              // console.log(res)
              let flag = 0;
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].code !== 1) {
                  flag = 1;
                  setTimeout(async () =>
                  {
                    await _this.$message({
                      type: 'error',
                      message: '课程' + (i + 1) + '录入失败',
                      duration: 1000
                    });
                  })

                }
              }
              // console.log(flag);
              if (flag === 0) {
                _this.$notify({
                  type: 'success',
                  message: '课程全部录入成功'
                });
              }
            })
            .catch((err) => {
              // console.log(err);
              _this.$message({
                type: 'error',
                message: err,
                duration: 1000
              })
            });
      } else {
        this.$message({
          type: 'error',
          message: '没有上传成功！'
        })
      }
      // this.$router.go(0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/button";
.importCSV{
  padding: 20px;
}
.sign-up{
  margin-top: 10px;
}
</style>