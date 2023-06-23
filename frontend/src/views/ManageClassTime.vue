<template>
  <div class="ManageClassTime">
    <div class="changeTime">
      <table border="3">
      <tr>
        <td>class 1 </td>
        <td><input type="time" v-model="start1" placeholder="start1"></td>
        <td><input type="time" v-model="end1"></td>
      </tr>
      <tr>
        <td>class 2 </td>
        <td><input type="time" v-model="start2"></td>
        <td><input type="time" v-model="end2"></td>
      </tr>
      <tr>
        <td>class 3 </td>
        <td><input type="time" v-model="start3"></td>
        <td><input type="time" v-model="end3"></td>
      </tr>
      <tr>
        <td>class 4 </td>
        <td><input type="time" v-model="start4"></td>
        <td><input type="time" v-model="end4"></td>
      </tr>
      <tr>
        <td>class 5 </td>
        <td><input type="time" v-model="start5"></td>
        <td><input type="time" v-model="end5"></td>
      </tr>
      <tr>
        <td>class 6 </td>
        <td><input type="time" v-model="start6"></td>
        <td><input type="time" v-model="end6"></td>
      </tr>
      <tr>
        <td>class 7 </td>
        <td><input type="time" v-model="start7"></td>
        <td><input type="time" v-model="end7"></td>
      </tr>
      <tr>
        <td>class 8 </td>
        <td><input type="time" v-model="start8"></td>
        <td><input type="time" v-model="end8"></td>
      </tr>
      <tr>
        <td>class 9 </td>
        <td><input type="time" v-model="start9"></td>
        <td><input type="time" v-model="end9"></td>
      </tr>
      <tr>
        <td>class 10</td>
        <td><input type="time" v-model="start10"></td>
        <td><input type="time" v-model="end10"></td>
      </tr>
      <tr>
        <td>class 11</td>
        <td><input type="time" v-model="start11"></td>
        <td><input type="time" v-model="end11"></td>
      </tr>
      <tr>
        <td>class 12</td>
        <td><input type="time" v-model="start12"></td>
        <td><input type="time" v-model="end12"></td>
      </tr>
      <tr>
        <td>class 13</td>
        <td><input type="time" v-model="start13"></td>
        <td><input type="time" v-model="end13"></td>
      </tr>
    </table>
      <br>
      <button type="button" @click="submitChange">Submit Change</button>
      <br>
      <div class="ErrorMsg">{{this.error}}</div>
    </div>
  </div>
</template>

<script src="./ManageClassTime.js">
</script>

<style lang="scss" scoped>
@import "../css/button";
@import "../css/error_msg";
.ManageClassTime{
  text-align: center;
  font-size: 30px;

  h2 {
    text-align: center;
    font-size: 48px;
    color: #303030;
    margin-bottom: 30px;
  }

  .changeTime {
    text-align: center;
    padding: 10px 10px;

    table {
      margin: 0 auto;
    }
  }
}
</style>