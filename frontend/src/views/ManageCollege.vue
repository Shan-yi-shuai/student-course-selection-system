<template>
    <div class="form-wrap">
        <div class="radio">
            <div :class="[flag===0?'yes':'no']" @click="chooseEmer(0)">College</div>
	        <div :class="[flag===1?'yes':'no']" @click="chooseEmer(1)">Major</div>
        </div>
        <form class="modify">
            <table border="1"  align="center" cellpadding="10"  cellspacing="0"  class="table" v-show="!flag">
                <thead>
                    <tr>
                        <th width="40%">College</th>
                        <th width="60%">Operation</th>
                    </tr>
                </thead>
                <tbody align="center" >
                    <tr v-for="(item,index) in college_list" v-bind:key="index">
                        <td width="40%" @blur="changeCollege(index,$event)" :contenteditable="select_btn[index]">{{item}}</td> 
                        <td width="60%" >
                            <div style="display: flex; text-align: center;" v-show="!select_btn[index]">
                            <button class="button2" @click.prevent="Edit(index)">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                            <button class="button2" @click.prevent="Delete(index)">&nbsp;Delete&nbsp;</button>
                            </div>
                            <div style="display: flex; text-align: center;" v-show="select_btn[index]">
                            <button class="button3" @click.prevent="EditSubmit(index)">Submit</button>
                            <button class="button3" @click.prevent="EditCancel(index)">Cancle</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>    
                            <input v-show="add_enable" v-model="add_college_name" @change="addEdit" />
                        </td>
                        <td>
                            <button class="button2" @click.prevent="AddCollege" v-show="!add_enable">Add a college</button>
                            <div style="display: flex; text-align: center;" v-show="add_enable">
                            <button class="button3" @click.prevent="AddSubmit">Submit</button>
                            <button class="button3" @click.prevent="AddCancel">Cancle</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-table :data="all_list" border class="table2" :span-method="arraySpanMethod" v-show="flag">
                <el-table-column
                    prop="college" label="college" class-name="text-center" width="180px">

                </el-table-column>
                <el-table-column
                    prop="major" label="major" class-name="text-center" width="180px">
                    <template v-slot="scope" >
                        <input v-if="select_btn2[scope.$index]" type="text" v-model="edit_major" @change="editMajor"/>
                        <span v-else>{{scope.row.major}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="operation" class-name="text-center" width="310px">
                    <template v-slot="scope">
                    <div style="display: flex; text-align: center;" v-show="!select_btn2[scope.$index]">
                    <button class="button2" @click.prevent="Edit2(scope.$index)">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
                    <button class="button2" @click.prevent="Delete2(scope.$index)">&nbsp;Delete&nbsp;</button>
                    <button class="button2" @click.prevent="Add2(scope.$index)">&nbsp;Add a major&nbsp;</button>
                    </div>
                    <div style="display: flex; text-align: center;" v-show="select_btn2[scope.$index]">
                    <button class="button3" @click.prevent="EditSubmit2(scope.$index)">Submit</button>
                    <button class="button3" @click.prevent="EditCancel2(scope.$index)">Cancle</button>
                    </div>
                    </template>
                    
                </el-table-column>
            </el-table>
            <!-- <div class="submit-error" v-show="error">{{this.errorMsg}}</div> -->
            <p class="login-register">
                <router-link class="router-link" :to="{name: 'Home' }">Back to Home</router-link>
            </p>
        </form>
    </div>
</template>

<script src="./ManageCollege.js"></script>

<style lang="scss" scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100vh;
    
    margin: 0 auto;
    width: 90%;
    background-size:cover;
    @media(min-width: 800px){
        width: 100%;
    }

    .radio {
        left: 80px;
        width: 100%;
        height: 50px;
        float: center;
        display: flex;
        line-height: 42px;
        text-align: center;
        justify-content: center;
        align-items: center;
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

    .modify {
        margin-bottom: 32px;
        overflow: auto;
        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
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
            margin-top: 40px;
            margin-bottom: 20px;
        }
        ::v-deep .table2 {
            width: 670px;
            height: 100%;
            border: 1px solid #4d5457; /* 表格整体的边框样式 */
            border-top: 1px solid #4d5457;
            border-left: 1px solid #4d5457;
            /* 表格底部和右部占位的 1px */
            &::before {
                height: 0;
            }
            &::after {
                width: 0;
            }
            /* 修改每行边框的样式 */
            td, th.is-leaf {
                border-bottom: 1px solid #4D5457 !important;
                border-right: 1px solid #4D5457 !important;
            }
              /* 表头样式 */
            .el-table__header tr, .el-table__header th {
                height: 40px;
                padding: 0;
                color: #3e3f3e;
                font-weight: bold;
                font-size: 13pt;
                background-color: #86b9eb;
            }
            /* 表体每行的样式 */
            .el-table__body tr, .el-table__body td {
                padding: 0;
                height: 40px;
                color: #313131;
                background-color: #eeeeee;
            }
            /* 1、修改当前行的高亮样式 */
            /* 2、修改每行的 hover 样式 */
            .el-table__body tr.current-row > td,
            .el-table__body tr:hover > td {
                color: rgb(77, 143, 219);
                cursor: pointer;
                background-color: #ffffff !important;
            }
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

        .button2 {
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
