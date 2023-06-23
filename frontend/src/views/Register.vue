<template>
  <div class="form-wrap">
    <Modal :show.sync="newPsd" title="warning" @hideModal="hideModal" @submit="submit">
      <p>
          Are you sure register a new initial password?
      </p>
    </Modal>
    <form class="register" v-show="!newPsd">
      <!-- <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p> -->

      <h2>Create your Education system account</h2>
      <div class="radio">
        <div :class="[select_single?'yes':'no']" @click="chooseEmer(0)">Import a single</div>
	      <div :class="[select_single?'no':'yes']" @click="chooseEmer(1)">Import a file</div>
      </div>
      <div v-show="!select_single" class="importCSV">
        <div class="input">
          <span style="margin-right:20px;">选择注册学期</span>
          <el-cascader
            v-model="school_year"
            :options="semester_options"
            @change="changeSemester"
          ></el-cascader>
        </div>
        <label for="file">Choose a csv file to upload</label>
        <input type="file" id="files" name="file" ref="refFile" v-on:change="importCSV" accept=".csv">
      </div>
      <div class="inputs" v-show="select_single">
        <div class="input">
          <role class="icon2" />
          <div class="radios">
          <input class="radio" type="radio" name="role" value="student" @change="select_student"> <p class="radiop">Student</p> <br>
          <input class="radio" type="radio" name="role" value="teacher" @change="select_teacher"> <p class="radiop">Teacher</p> <br>
          </div>
        </div>
         <div class="input">
          <span style="margin-right:20px;">选择注册学期</span>
          <el-cascader
            v-model="school_year"
            :options="semester_options"
            @change="changeSemester"
          ></el-cascader>
        </div>

        <div class="input">
          <input type="text" class="Username" v-model.trim.lazy="username" placeholder="username" maxlength="512"/>
          <user class="icon" />
          <div class="error" v-show="name_error">{{this.name_errorMsg}}</div>
        </div>

        <div class="input">
          <input type="text" class="Number" maxlength="18" v-model.trim.lazy="card" placeholder="card"/>
          <ID class="icon2" />
          <div class="error" v-show="card_error">{{this.card_errorMsg}}</div>
        </div>

        <div class="input">
          <input type="text" class="Number" id="user_number" maxlength="8" v-model="number" placeholder="number"/>
          <gonghao class="icon2" />
          <div class="error" v-show="number_error">{{this.number_errorMsg}}</div>
        </div>

        <div class="input">
          <input type="text" class="Password" v-model.trim="password" :placeholder="initialPassword"
                 maxlength="32" required='true' @input="check_password"/>
          <password class="icon" />
          <div class="error" v-show="psd_error">{{this.psd_errorMsg}}</div>
        </div>

        <div class="input">
          <input type="text" class="Number" maxlength="11" v-model="tel" placeholder="tel"/>
          <phone class="icon3" />
          <div class="error" v-show="tel_error">{{this.tel_errorMsg}}</div>
        </div>

        <div class="input">
          <input type="text" class="Number" v-model.trim.lazy="email" placeholder="email"/>
          <email class="icon" />
          <div class="error" v-show="email_error">{{this.email_errorMsg}}</div>
        </div>

        <div class="input">
          <select class="select" v-model="college" @change="selectCollege">
            <option value="">Please select college</option>
            <option v-for="item in college_list" v-bind:key="item.id" v-text="item.name" ></option>
          </select>
        </div>
        <div class="input">
          <select class="select" v-model="major" @change="selectMajor">
            <option value="">Please select major</option>
            <option v-for="item in all_major" v-bind:key="item.id" v-text="item.name"  v-show="!college_selected" ></option>
            <option v-for="item in major_list" v-bind:key="item.id" v-text="item.name"  v-show="college_selected" ></option>
          </select>
        </div>

        <div class="input">
          <select class="select" v-model="state" @change="selectState">
            <option value="">Please select state</option>
            <option v-for="item in state_list" v-bind:key="item.id" v-text="item.name" ></option>
          </select>
        </div>
       
      </div>
      <div class="submit-error" v-show="error">{{this.errorMsg}}</div>
      <button v-show="!select_single" class="button" @click.prevent="registerCSV">Sign Up</button>
      <button v-show="select_single" class="button" @click.prevent="register">Sign Up</button>
      
        <router-link class="router-link" :to="{ name: 'Home' }"
          >Back to Home</router-link
        >
      
    </form>
  </div>
</template>

<script src="./Register.js"> </script>

<style lang="scss" scoped>
.form-wrap {
  overflow: scroll;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  background-image: url("../assets/background2.png");
  background-size: cover;
  @media (min-width: 800px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;
    overflow-y: scroll;
    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;
    @media (min-width: 800px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 24px;
      color: #303030;
      margin-bottom: 10px;
      @media (min-width: 800px) {
        font-size: 36px;
      }
    }

    .radio {
      left: 80px;
      width: 300px;
      height: 50px;
      display: flex;
      line-height: 42px;
      text-align: center;
      padding: 4px;
      &:nth-child(1){
			  margin-right: 20px;
		  }
      .yes{
          width: 120px;
          margin-left: 12px;
          border-radius: 10px;
          background-color: rgb(172, 143, 253);
          color: #fff;
      }
      .no{
          width: 120px;
          margin-left: 12px;
          border-radius: 10px;
          border: 1px solid rgb(168, 153, 252);
          color: rgb(141, 121, 253);
      }
    }

    .importCSV {
      padding: 4px;
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }

    .inputs {
      width: 100%;
      max-width: 350px;
      .radios{
        text-align: center;
        zoom: 100%;
        width: 200px;
        vertical-align: middle;
        margin-top: -2px;
        margin-bottom: 2px;
        margin-left: 12px;
        display:flex;
        flex-direction: row;
        align-items: center;
        .radio {
          width: 12px;
          padding-left: 10px;
          margin-left: 12px;
        }
        .radiop {
            font-size: 12px;
          }
      }
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #d9dddcc5;
          padding: 4px 4px 4px 30px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
        .icon2 {
          width: 18px;
          position: absolute;
          left: 5px;
          height: 18px;
        }
        .icon3 {
          width: 15px;
          position: absolute;
          left: 5px;
          height: 15px;
        }

        .select {
          width: 100%;
          height: 50px;
          position: relative;
          display: flex;
          justify-content: center;
          background-color: #d9dddcc5;
          border: none;
          color: #797979;
        }
      }
    }

    .forget-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .button {
      border-radius: 12px;
      text-align: center;
      padding: 4px;
      text-decoration: none;
      display: inline-block;
      font-size: 18px;
      margin: 4px 2px;
      cursor: pointer;
      border: 2px solid #d9dddcc5;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
    }
    .button:hover {
      background-color: #abdcff; /* Green */
      color: white;
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 800px) {
        display: initial;
      }
    }
    .submit-error {
      color:rgb(219, 96, 51);
      font-size: 16pt;
      font-weight: bold;
    }
  }
}
</style>
