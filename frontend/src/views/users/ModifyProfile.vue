<template>
    <div class="form-wrap">
        <form class="modify">
            <h2>Modify your profile</h2>
               <table border="1"  align="center" cellpadding="10"  cellspacing="0"  class="table">
                   <thead>
                       <tr>
                           <th>item</th>
                           <th>info</th>
                       </tr>
                   </thead>
                    <tbody align="center">
                        <tr>
                            <th width="200">number</th>
                            <td width="80%" colspan="1" rowspan="1">{{number}}</td>
                        </tr>
                        <tr>
                            <th width="200">identity</th>
                            <td width="80%" colspan="1" rowspan="1">{{identity}}</td>
                        </tr>
                        <tr>
                            <th width="200">IDnumber</th>
                            <td width="80%" colspan="1" rowspan="1">{{card}}</td>
                        </tr>
                         <tr>
                            <th width="200">name</th>
                            <td width="80%" colspan="1" rowspan="1">{{username}}</td>
                        </tr>
                        <tr>
                            <th width="200">password</th>
                            <td width="80%" @blur="changePassword($event)" :contentEditable="modify_en" >{{password}}</td>
                        </tr>
                        <tr>
                            <th width="200">telephone</th>
                            <td width="80%" @blur="changeTel($event)" :contentEditable="modify_en">{{tel_see?tel:""}}</td>
                        </tr>
                        <tr>
                            <th width="200">email</th>
                            <td width="80%" @blur="changeEmail($event)" :contentEditable="modify_en">{{email_see?email:""}}</td>
                        </tr>
                        <tr>
                            <th width="200">college</th>
                            <td width="80%" colspan="1" rowspan="1">{{college}}</td>
                        </tr>
                        <tr>
                            <th width="200">major</th>
                            <td width="80%" colspan="1" rowspan="1">{{major}}</td>
                        </tr>
                        <tr>
                            <th width="200">state</th>
                            <td width="80%" colspan="1" rowspan="1">{{state}}</td>
                        </tr>
                    </tbody>
                </table>  
            <div style="padding: 10px; display: flex; flex: column nowrap;">
                <p style="line-height: 32px;">modify enable:&nbsp;&nbsp;&nbsp;</p>
                <label role="checkbox" :class="['switch', { modify_en }]">
                    <input type="checkbox" class="switch-input" @change="modifyEnable" />
                    <div class="switch-core" :style="{ backgroundColor: modify_en ? '#11CED2' : '#E6EAF1' }">
                        <div
                        class="switch-button"
                        :style="{
                            transition: `transform 100ms`,
                            transform: modify_en ? `translate3d(48px, 0px, 0px)` : null
                        }"
                        ></div>
                    </div>
                    <span class="switch-label label-right" v-if="modify_en">ON</span>
                    <span class="switch-label label-left" v-else>OFF</span>
                </label>   
            </div>
            <div class="submit-error" v-show="err">{{this.errMsg}}</div>
            <button class="button" @click.prevent="submit">Submit</button>
            <p style="line-height: 80px;">
                <router-link class="router-link2" :to="{name: 'Home' }">Back to Home</router-link>
            </p>
        </form>
    </div>
</template>

<script src="./ModifyProfile.js"></script>

<style lang="scss" scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    flex: 1 0 auto;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    background-image: url("../../assets/background.png");
    background-size:cover;
    @media(min-width: 800px){
        width: 100%;
    }

    .modify {
        margin-bottom: 32px;
        .router-link1 {
            color: rgb(255, 94, 53);
        }
        .router-link2 {
            color: rgb(4, 2, 143);
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
            width: 400px;
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

        .submit-error {
            color:rgb(219, 96, 51);
            font-size: 16pt;
            font-weight: bold;
            line-height: 45px;
        }
    }
}
</style>
