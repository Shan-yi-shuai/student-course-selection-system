import Vue from 'vue'
import { email_re, id_card_re, password_re, username_re } from "@/util/util";
// vue是通过检测get,set才得知数据是否更新的，而对于数组来说，是没有get，set方法的，所以需要我们自己手动触发，需要发送消息通知vue
export default {
    inject: ['reload'],
    name: "manage-college",
    component: {

    },
    data() {
        return {
            students: [{ id: 1, number: 223322, role: "student", username: "xiaohong", card: "42280120010922002X", password: "123456g", tel: "13381817979", email: "1330exex@163.com", college: "computer", major: "software", state: "inschool" },
                { id: 2, number: 223321, role: "student", username: "xiaoqiang", card: "42280120010922002X", password: "123456g", tel: "13381817979", email: "1330exex@163.com", college: "computer", major: "software", state: "retired" },
                { id: 3, number: 22302208, role: "teacher", username: "xiaoming", card: "42280120010922002X", password: "123456g", tel: "13381817979", email: "1330exex@163.com", college: "computer", major: "software", state: "graduate" }
            ],
            flag: 0,
            select_student: true, // 默认选择学生
            select_edit_list: [],
            select_btn: [],
            state_list: [],
            college_list: [],
            major_list: [],
            data_list: [],
            college_major: [],
            all_major: [],
            college_select: [],
            student_list: [],
            teacher_list: [],
        }
    },
    created() {
        this.init();
        this.getState();
        this.get_edit_list(3);
    },
    methods: {
        init() {
            let _this = this;
            let admin_number = 123456; // ----------改成自己数据库里面管理员的number！！
            _this.$http
                .post(domain.viewAllUser, {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        this.data_list = res.data.data;
                        this.teacher_list = [];
                        this.student_list = [];
                        for (let i = 0; i < this.data_list.length; i++) {
                            if (res.data.data[i].role == "teacher") {
                                this.teacher_list.push(res.data.data[i]);
                            } else {
                                this.student_list.push(res.data.data[i]);
                            }
                        }
                        this.create_btn(this.student_list.length);
                        // console.log(this.teacher_list, this.student_list);
                    }
                })
                .catch((err) => {
                    // console.error(err);
                })
                // college and major list
            let this_ = this;
            this_.$http
                .post(domain.get_academy, {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        this.college_major = res.data.data;
                        this.getCollege();
                        this.getAllMajor();
                    }
                })
                .catch((err) => {
                    // console.error(err);
                })

        },
        modifyEnable() {
            this.modify_en = !this.modify_en;
            // console.log(this.modify_en);
        },
        getState() {
            this.state_list = [{
                id: 1,
                name: "in school"
            }, { id: 2, name: "retire" }, { id: 3, name: "graduate" }];
        },
        getCollege() {
            // console.log(this.college_major);
            this.college_list = [];
            this.college_select = [];
            for (let i = 0; i < this.college_major.length; i++) {
                let col = Object.keys(this.college_major[i]["idAndAcademyName"]);
                this.college_list.push({
                    id: i + 1,
                    name: this.college_major[i]["idAndAcademyName"][col]
                });
                this.college_select.push(false);
            }
            // console.log(this.college_list);
        },
        getAllMajor() {
            let index = 0;
            this.all_major = [];
            for (let i = 0; i < this.college_major.length; i++) {
                let col = Object.keys(this.college_major[i]["idAndAcademyName"]);
                let name = this.college_major[i]["idAndAcademyName"][col];
                for (let j = 0; j < this.college_major[i]["idAndMajorNames"].length; j++) {
                    index += 1;
                    let key = Object.keys(this.college_major[i]["idAndMajorNames"][j]);
                    this.all_major.push({
                        id: index,
                        name: this.college_major[i]["idAndMajorNames"][j][key],
                        college: name
                    })
                }
            }
            // console.log(this.all_major);
        },
        getMajor(index, isTeacher) {
            let name = this.college_list[0].name;
            let college = isTeacher ? this.teacher_list[index].academy : this.student_list[index].academy;
            // console.log(index, college, this.college_list);
            let flag = 0;
            this.major_list = [];
            for (let i = 0; i < this.all_major.length; i++) {
                if (this.all_major[i].college != name && flag == 1) {
                    break;
                } else if (this.all_major[i].college != name) {
                    name = this.all_major[i].college;
                }
                if (name == college) {
                    this.major_list.push({
                        id: this.all_major[i].id,
                        name: this.all_major[i].name
                    });
                    flag = 1;
                }
            }
            // console.log(this.major_list);
        },
        get_edit_list(num) {
            for (let i = 0; i < this.students.length; i++) {
                //this.select_edit_list.push(false);
                // this.students[i].edit = false;
            }
            // console.log(this.select_edit_list);
        },
        create_btn(num) {
            this.select_btn = [];
            for (let i = 0; i < num; i++) {
                this.select_btn.push(false);
            }
            // console.log(this.select_btn);
        },
        chooseEmer(itype) {
            if (itype === 0) {
                this.flag = 0;
                this.select_student = true;
            } else {
                this.flag = 1;
                this.select_student = false;
            }
        },
        Edit(index, isTeacher) {
            // console.log(index, this.student_list[index], this.teacher_list[index]);
            let flag = 0;
            for (let i = 0; i < this.select_btn.length; i++) {
                if (this.select_btn[i]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                this.select_btn[index] = true;
                Vue.set(this.select_btn, index, this.select_btn[index]);
                this.getMajor(index, isTeacher);
            }

        },
        Delete(index) {
            // console.log(index);
            for (let i = 0; i < this.select_btn.length; i++) {
                if (this.select_btn[i]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                this.select_btn[index] = true;
                Vue.set(this.select_btn, index, this.select_btn[index]);
            }
        },
        EditSubmit(index, isTeacher) {
            // console.log(index);
            let list = new Object();
            if (isTeacher) {
                list = this.teacher_list[index];
            } else {
                list = this.student_list[index];
            }
            if (this.card_check(list.card)) {
                this.$message({
                    type: 'error',
                    message: "身份证号不正确!",
                    duration: 1500
                });
            } else if (!this.check_password(list.password)) {
                this.$message({
                    type: 'error',
                    message: "密码不符合规范!",
                    duration: 1500
                });
            } else if (this.username_check(list.username)) {
                this.$message({
                    type: 'error',
                    message: "用户名不符合规范!",
                    duration: 1500
                });
            } else if (this.email_check(list.email)) {
                this.$message({
                    type: 'error',
                    message: "邮箱不符合规范!",
                    duration: 1500
                });
            } else if (this.tel_check(list.tel)) {
                this.$message({
                    type: 'error',
                    message: "电话号码不符合规范!",
                    duration: 1500
                });
            } else {
                // console.log('yyyyyes alllll correct');
                let _this = this;
                let user = {
                    card: list.card,
                    tel: list.tel,
                    password: list.password,
                    email: list.email,
                    username: list.username,
                    number: list.number,
                    role: list.role,
                    academy: list.academy,
                    major: list.major,
                    state: list.state
                }
                // console.log(user);
                _this.$http
                    .put(domain.user_change, user, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code == 1) {
                            _this.$notify({
                                type: 'success',
                                message: '修改成功',
                                duration: 1500
                            });
                            this.select_btn[index] = false;
                            Vue.set(this.select_btn, index, this.select_btn[index]);
                        }
                    })
                    .catch((err) => {
                        _this.$message({
                            type: 'error',
                            message: err
                        })
                    })
            }

        },
        EditCancel(index, isTeacher) {
            this.select_btn[index] = false;
            Vue.set(this.select_btn, index, this.select_btn[index]);
            this.reload();
        },
        changeName(index, $event, isTeacher) {
            if (isTeacher) {
                this.teacher_list[index].username = $event.target.innerText;
            } else {
                this.student_list[index].username = $event.target.innerText;
            }
        },
        changePassword(index, $event, isTeacher) {
            if (isTeacher) {
                this.teacher_list[index].password = $event.target.innerText;
            } else {
                this.student_list[index].password = $event.target.innerText;
            }
        },
        // changeRole(index, isTeacher) {
        //     if (isTeacher) {
        //         // console.log(this.teacher_list[index].role);
        //     } else {
        //         // console.log(this.student_list[index].role);
        //     }
        // },
        changeCard(index, $event, isTeacher) {
            if (isTeacher) {
                this.teacher_list[index].card = $event.target.innerText;
            } else {
                this.student_list[index].card = $event.target.innerText;
            }
        },
        changeTel(index, $event, isTeacher) {
            if (isTeacher) {
                this.teacher_list[index].tel = $event.target.innerText;
            } else {
                this.student_list[index].tel = $event.target.innerText;
            }
        },
        changeEmail(index, $event, isTeacher) {
            if (isTeacher) {
                this.teacher_list[index].email = $event.target.innerText;
            } else {
                this.student_list[index].email = $event.target.innerText;
            }
        },
        changeCollege(index, $event, isTeacher) {
            // console.log(index, $event);
            this.getMajor(index, isTeacher);


        },
        changeMajor(index, $event, isTeacher) {
            // console.log(this.data_list[index].major);
        },
        changeState(index, $event, isTeacher) {
            // console.log(this.data_list[index].state);
        },
        card_check(str) {
            return id_card_re(str)
        },
        check_password(str) {
            //check length
            let addMsg = " You may reset your password";
            if (str.length < 6) {
                // console.log('no1');
                return false;
            } else if (str.length > 32) {
                // console.log('no2');
                return false;
            }

            if (password_re(str)) {
                // console.log('no3');
                return true;
            } else {
                // console.log('no4');
                return false;
            }
        },
        username_check(str) {
            return username_re(str);
        },
        email_check(str) {
            return email_re(str)
        },
        tel_check() {
            if (this.tel) {
                let reg = /^1[3456789]\d{9}$/;
                return !reg.test(this.tel);
            } else return false;
        },
    },
    watch: {
        'flag': {
            handler: function(newValue) {
                // console.log(newValue); // 1 teacher, 0 student
                if (newValue === 1) {
                    this.create_btn(this.teacher_list.length);
                } else {
                    this.create_btn(this.student_list.length);
                }
            },
            deep: true
        }
    }
}