<template>
    <div class="form-wrap">
        <div class="radio">
            <div :class="[flag===0?'yes':'no']" @click="chooseEmer(0)">Student</div>
	        <div :class="[flag===1?'yes':'no']" @click="chooseEmer(1)">Teacher</div>
        </div>
        <form class="modify">
            <table border="1"  align="center" cellpadding="10"  cellspacing="0"  class="table">
                <thead>
                    <tr>
                        <th>index</th>
                        <th>username</th>
                        <th>number</th>
                        <th>passwod</th>
                        <th>role</th>
                        <th>IDnumber</th>
                        <th>email</th>
                        <th>telephone</th>
                        <th>college</th>
                        <th>major</th>
                        <th>state</th>
                        <th>operation</th>
                    </tr>
                </thead>
                <tbody align="center" >
                    <tr v-show="flag" v-for="(item,index) in teacher_list" v-bind:key="index">
                         <th width="2%">{{index+1}}</th>
                        <td width="10%" colspan="1" rowspan="1" @blur="changeName(index,$event,1)" :contentEditable="select_btn[index]">{{item.username}}</td> 
                        <td width="6%" colspan="1" rowspan="1" style="color:#b6b6b6;">{{item.number}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @blur="changePassword(index,$event,1)" :contentEditable="select_btn[index]">{{item.password}}</td> 
                        <td width="6%" colspan="1" rowspan="1" style="color:#b6b6b6;">{{item.role}}</td> 

                        <!-- <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.role}}</td>
                        <td width="9%" colspan="1" rowspan="1" @change="changeRole(index,1)"  v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.role">
                                <option value="item.role">{{item.role}}</option>
                                <option value="teacher" v-show="item.role != 'teacher'">teacher</option>
                                <option value="student" v-show="item.role != 'student'">student</option>
                            </select></td>  -->

                        <td width="13%" colspan="1" rowspan="1" @blur="changeCard(index,$event,1)" :contentEditable="select_btn[index]">{{item.card}}</td> 
                        <td width="12%" colspan="1" rowspan="1" @blur="changeEmail(index,$event,1)" :contentEditable="select_btn[index]">{{item.email}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @blur="changeTel(index,$event,1)" :contentEditable="select_btn[index]">{{item.tel}}</td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.academy}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeCollege(index,$event,1)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.academy">
                                <option value="">{{item.academy}}</option>
                                <option v-for="it in college_list" v-bind:key="it.id" v-text="it.name" ></option>
                            </select></td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.major}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeMajor(index,$event,1)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.major">
                                <option v-for="itemm in major_list" v-bind:key="itemm.id" v-text="itemm.name" ></option>
                            </select>
                        </td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.state}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeState(index,$event,1)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.state">
                                <option v-for="itemm in state_list" v-bind:key="itemm.id" v-text="itemm.name" ></option>
                            </select>
                        </td> 
                        <td width="10%" colspan="1" rowspan="1">
                            <div style="display: flex; text-align: center;" v-show="!select_btn[index]">
                            <button class="button2" @click.prevent="Edit(index,1)">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                            </div>
                            <div style="display: flex; text-align: center;" v-show="select_btn[index]">
                            <button class="button3" @click.prevent="EditSubmit(index,1)">Submit</button>
                            <button class="button3" @click.prevent="EditCancel(index,1)">Cancle</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="!flag" v-for="(item,index) in student_list" v-bind:key="index">
                         <th width="2%">{{index+1}}</th>
                        <td width="10%" colspan="1" rowspan="1" @blur="changeName(index,$event,0)" :contentEditable="select_btn[index]">{{item.username}}</td> 
                        <td width="6%" colspan="1" rowspan="1" style="color:#b6b6b6;">{{item.number}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @blur="changePassword(index,$event,0)" :contentEditable="select_btn[index]">{{item.password}}</td> 
                        <td width="6%" colspan="1" rowspan="1" style="color:#b6b6b6;">{{item.role}}</td> 


                        <!-- <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.role}}</td>
                        <td width="9%" colspan="1" rowspan="1" @change="changeRole(index,0)"  v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.role">
                                <option value="item.role">{{item.role}}</option>
                                <option value="teacher" v-show="item.role != 'teacher'">teacher</option>
                                <option value="student" v-show="item.role != 'student'">student</option>
                            </select></td>  -->

                        <td width="13%" colspan="1" rowspan="1" @blur="changeCard(index,$event,0)" :contentEditable="select_btn[index]">{{item.card}}</td> 
                        <td width="12%" colspan="1" rowspan="1" @blur="changeEmail(index,$event,0)" :contentEditable="select_btn[index]">{{item.email}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @blur="changeTel(index,$event,0)" :contentEditable="select_btn[index]">{{item.tel}}</td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.academy}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeCollege(index,$event,0)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.academy">
                                <option value="">{{item.academy}}</option>
                                <option v-for="it in college_list" v-bind:key="it.id" v-text="it.name" ></option>
                            </select></td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.major}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeMajor(index,$event,0)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.major">
                                <option v-for="itemm in major_list" v-bind:key="itemm.id" v-text="itemm.name" ></option>
                            </select>
                        </td> 
                        <td width="9%" colspan="1" rowspan="1" v-show="!select_btn[index]">{{item.state}}</td> 
                        <td width="9%" colspan="1" rowspan="1" @change="changeState(index,$event,0)" v-show="select_btn[index]">
                            <select style="width:100%;height:38px;" v-model="item.state">
                                <option v-for="itemm in state_list" v-bind:key="itemm.id" v-text="itemm.name" ></option>
                            </select>
                        </td> 
                        <td width="10%" colspan="1" rowspan="1">
                            <div style="display: flex; text-align: center;" v-show="!select_btn[index]">
                            <button class="button2" @click.prevent="Edit(index,0)">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                            </div>
                            <div style="display: flex; text-align: center;" v-show="select_btn[index]">
                            <button class="button3" @click.prevent="EditSubmit(index,0)">Submit</button>
                            <button class="button3" @click.prevent="EditCancel(index,0)">Cancle</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> 
            <!-- <div class="submit-error" v-show="error">{{this.errorMsg}}</div> -->
            <p class="login-register">
                <router-link class="router-link" :to="{name: 'Home' }">Back to Home</router-link>
            </p>
        </form>
    </div>
</template>

<script src="./ManageUser.js"></script>

<style lang="scss" scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 100%;
    background-size:cover;
    @media(min-width: 800px){
        width: 100%;
    }

    .modify {
        margin-bottom: 32px;
        overflow: auto;
        width: 100%;
        .router-link {
            color: #000;
        }
    }

    .radio {
        left: 80px;
        width: 100%;
        height: 50px;
        display: flex;
        line-height: 42px;
        text-align: center;
        justify-content: center;
        padding: 4px;
        &:nth-child(1){
			margin-right: 20px;
		}
        .yes{
            width: 80px;
            margin-left: 12px;
            border-radius: 10px;
            background-color: cornflowerblue;
            color: #fff;
        }
        .no{
            width: 80px;
            margin-left: 12px;
            border-radius: 10px;
            border: 1px solid cornflowerblue;
            color: cornflowerblue;
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
            font-size: 28px;
            color: #303030;
            margin-bottom: 40px;
            @media (min-width: 800px) {
                font-size: 36px;
            }
        }

        .table {
            position: relative;
            width: 1100px;
            overflow: auto;
            
            display: block;
        }

        .switch {
            display: inline-block;
            position: relative;
            overflow: hidden;
            vertical-align: middle;
            user-select: none;
            font-size: 16px;
            cursor: pointer;
        }
        .switch-input {
            display: none;
        }

        .switch-label {
            position: absolute;
            top: 0;
            font-weight: 600;
            color: white;
            z-index: 2;
        }

        .switch-label.label-left {
            left: 32px;
            line-height: 32px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            color: #b5bdc8;
        }
        .switch-label.label-right {
            right: 32px;
            line-height: 32px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
        .switch-core {
            width: 80px;
            height: 32px;
            border-radius: 20px;
            line-height: 40px;
            display: block;
            position: relative;
            box-sizing: border-box;
            outline: 0;
            margin: 0;
            transition: border-color 0.3s, background-color 0.3s;
            user-select: none;
        }
        .switch-button {
            width: 25px;
            height: 25px;
            display: block;
            position: absolute;
            overflow: hidden;
            top: 2;
            left: 2;
            z-index: 3;
            transform: translate3d(0, 0, 0);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 20px;
            margin: 4px;
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
            width:100;
            border-radius: 12px;
            text-align: center;
            padding: 6px;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            margin: 6px 2px;
            cursor: pointer;
            border: 2px solid #d9dddcc5;
            background-color: #303030;
            color: #fff;
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
        }
        .button:hover {
            background-color: #ABDCFF; /* Green */
            color: white;
        }

        .button2 {
            width:80px;
            border-radius: 12px;
            text-align: center;
            padding: 6px;
            text-decoration: none;
            display: inline-block;
            font-size: 10px;
            font-weight:600;
            margin: 6px 2px;
            cursor: pointer;
            border: 1px solid #d9dddcc5;
            background-color: #c4c4c4;
            color: rgb(56, 29, 29);
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
        }
        .button2:hover {
            background-color: #82cbff; /* Green */
            color: white;
        }

        .button3 {
            width:50%;
            border-radius: 12px;
            text-align: center;
            padding: 6px;
            text-decoration: none;
            display: inline-block;
            font-size: 10px;
            font-weight:600;
            margin: 6px 2px;
            cursor: pointer;
            border: 1px solid #d9dddcc5;
            background-color: #ff996a;
            color: rgb(56, 29, 29);
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
        }
        .button3:hover {
            background-color: #ee7d49; /* Green */
            color: white;
        }

        .submit-error {
            color:rgb(219, 96, 51);
            font-size: 16pt;
            font-weight: bold;
        }
    }
}
</style>
