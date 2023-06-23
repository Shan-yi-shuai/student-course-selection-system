import email from "../assets/Icons/envelop.svg";
import password from '../assets/Icons/lock-all-solid.svg';
import user from "../assets/Icons/user.svg";
import gonghao from "../assets/Icons/gonghao.svg";
import ID from "../assets/Icons/ID.svg";
import Modal from "../components/Modal.vue";
import phone from '../assets/Icons/phone.svg';
import role from "../assets/Icons/role.svg";
import College from "../assets/Icons/college.svg";
import Major from "../assets/Icons/major.svg";
import domain from "../util/domain.js";
import Papa from "papaparse";

import { email_re, id_card_re, password_re, username_re } from "@/util/util";


export default {
    name: "Register",
    components: {
        email,
        user,
        password,
        gonghao,
        Modal,
        ID,
        phone,
        role,
        College,
        Major,
    },
    data() {
        return {
            role: null,
            username: null,
            card: null,
            password: this.$store.state.initialPassword,
            number: null,
            tel: "",
            email: "",
            error: null,
            errorMsg: "",
            name_error: null,
            name_errorMsg: "",
            card_error: null,
            card_errorMsg: "",
            number_error: null,
            number_errorMsg: "",
            tel_error: null,
            tel_errorMsg: "",
            email_error: null,
            email_errorMsg: "",
            psd_error: null,
            psd_errorMsg: "",
            newPsd: false,
            initialPassword: "",
            flag: 0,
            select_single: true,
            college: "",
            major: "",
            state: "", // 如果在这用null，在select框不能显示“please select state”字样
            state_list: [],
            college_list: [],
            major_list: [],
            data: [],
            csv_submit_check: false,
            csv_import_check: false,
            csv_user: [],
            data_list: [],
            all_major: [],
            college_selected: false,
            semester_options: [
                {
                    value: '2018',
                    label: '2018'
                },{
                    value: '2019',
                    label: '2019'
                }, {
                    value: '2020',
                    label: '2020'
                }, {
                    value: '2021',
                    label: '2021'
                }, {
                    value: '2022',
                    label: '2022'
                }
            ],
            school_year: "",
        };
    },
    methods: {
        getInitialPassword() {
            this.initialPassword = this.$store.state.initialPassword;
            // // console.log(this.initialPassword);
        },
        init() {
            let _this = this;
            _this.$http
                .post(domain.get_academy, {})
                .then((res) => {
                    // // console.log(res);
                    if (res.data.code == 1) {
                        this.data_list = res.data.data;
                        // // console.log(this.data_list);
                        this.getCollege();
                        //this.getAllMajor();
                    }
                })
                .catch((err) => {
                    // // console.error(err);
                })
        },
        getCollege() {
            for (let i = 0; i < this.data_list.length; i++) {
                let col = Object.keys(this.data_list[i]["idAndAcademyName"]);
                this.college_list.push({
                    id: i + 1,
                    name: this.data_list[i]["idAndAcademyName"][col]
                })
            }
            // // console.log(this.college_list);
        },
        getAllMajor() {
            let index = 0;
            for (let i = 0; i < this.data_list.length; i++) {
                let col = Object.keys(this.data_list[i]["idAndAcademyName"]);
                let name = this.data_list[i]["idAndAcademyName"][col];
                for (let j = 0; j < this.data_list[i]["idAndMajorNames"].length; j++) {
                    index += 1;
                    let key = Object.keys(this.data_list[i]["idAndMajorNames"][j]);
                    this.all_major.push({
                        id: index,
                        name: this.data_list[i]["idAndMajorNames"][j][key],
                        college: name
                    })
                }
            }
            // // console.log(this.all_major);
        },
        getMajor(college) {
            let name = this.all_major[0].college;
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
            // // console.log(this.major_list);
        },
        selectCollege() {
            // // console.log(this.college);
            this.college_selected = true;
            this.getAllMajor();
            this.getMajor(this.college);
        },
        selectMajor() {
            // // console.log(this.major);
        },
        RegisterNewPsd() {
            // // console.log("register new password");
            this.newPsd = true;
        },
        hideModal() {
            this.newPsd = false;
        },
        submit() {
            // console.log("register a new password");
            this.register_password();
            this.newPsd = false;
        },
        select_student() {
            this.role = "student";
        },
        select_teacher() {
            this.role = "teacher";
        },
        has_null() {
            return this.role == null || this.username == null || this.card == null || this.number == null || this.password == null;
        },
        username_check(username) {
            return username_re(username)
        },
        card_check(card) {
            return id_card_re(card)
        },
        email_check(email) {
            return email_re(email)
        },
        number_check(number) {
            if (this.role == null) return false;
            let year = this.number;
            year = year.slice(0,2);
            let semester_year = this.school_year[0];
            semester_year = semester_year.slice(2,4);
            if(year != semester_year) {
                this.errorMsg = "The first two must be the year of admission!";
                return true;
            }
            if (this.role === "teacher") {
                if (!(number.length === 8)) {
                    this.errorMsg = "there should be 8 numbers!"
                    return true;
                }
                return false;
            } else {
                if (!(number.length === 6)) {
                    this.errorMsg = "there should be 6 numbers!"
                    return true;
                }
                return false;
            }
            //return !(this.number.toString().length === 6 || this.number.toString().length === 8);
        },
        tel_check(tel) {
            if (tel) {
                let reg = /^1[3456789]\d{9}$/;
                if (!reg.test(tel))
                    return true;
                else
                    return false;
            } else return false;
        },
        check_password(password) {
            //check length
            let addMsg = " You may reset your password";
            if (password.length < 6) {
                this.psd_error = true;
                this.psd_errorMsg = "your password is too weak!" + addMsg;
                return false;
            } else if (password.length > 32) {
                this.psd_error = true;
                this.psd_errorMsg = "the password should not be longer than 32 characters!" + addMsg;
                return false;
            }

            if (password_re(password)) {
                this.psd_error = false;
                this.psd_errorMsg = "";
                return true;
            } else {
                this.psd_error = true;
                this.psd_errorMsg = "wrong password format" + addMsg;
                return false;
            }
        },
        async register() {
            this.errorMsg = "";
            if (this.has_null()) {
                this.errorMsg = "please fill out all the fields!";
                this.error = true;
                return;
            }
            if (this.username_check(this.username)) {
                this.name_error = true;
                this.name_errorMsg = "only contain chinese and english characters";
                this.error = true;
            } else {
                this.name_error = false;
                this.name_errorMsg = "";
            }
            if (this.card_check(this.card)) {
                this.card_errorMsg = "wrong ID number format!";
                this.card_error = true;
                this.error = true;
            } else {
                this.card_errorMsg = "";
                this.card_error = false;
            }
            if (this.number_check(this.number)) {
                this.number_error = true;
                this.number_errorMsg = "Incorrect number!";
                this.error = true;
            } else {
                this.number_error = false;
                this.number_errorMsg = "";
            }
            if (this.tel_check(this.tel)) {
                this.tel_errorMsg = "invalid telephone number";
                this.tel_error = true;
                this.error = true;
            } else {
                this.tel_errorMsg = "";
                this.tel_error = false;
            }
            if (this.email_check(this.email)) {
                this.email_errorMsg = "wrong email format";
                this.email_error = true;
                this.error = true;
            } else {
                this.email_errorMsg = "";
                this.email_error = false;
            }
            if (this.check_password(this.password)) {
                this.error = true;
            }
            if (!this.name_error && !this.card_error && !this.number_error && !this.email_error &&
                !this.tel_error && !this.psd_error) {
                this.error = false;
                this.errorMsg = "";
                this.successfully_register();
            } else {
                this.error = true;
                if(this.errorMsg==""){
                    this.errorMsg = "Please complete all forms correctly!";
                }
                return;
            }
        },
        register_password() {
            this.$store.dispatch('initialRegister', this.password).then(() => {
            });
        },
        successfully_register() {
            this.error = false;
            this.errorMsg = "";
            let _this = this;
            let user = {
                card: _this.card,
                tel: _this.tel,
                password: _this.$store.state.initialPassword,
                email: _this.email,
                username: _this.username,
                number: _this.number,
                role: _this.role,
                academy: _this.college,
                major: _this.major,
                state: _this.state,
            };

            // 向本地缓存中设置初始密码initialPassword
            // 如果与缓存的密码不一样，提醒是否继续注册
            // console.log(this.$store.state.initialPassword);
            if (this.password !== this.$store.state.initialPassword) {
                // console.log('same psd');
                this.RegisterNewPsd();
            } else {
                // console.log('not same psd');
                this.register_password();
            }

            _this.$http
                .post(domain.register, user, {})
                .then((res) => {
                    // res.data={code:1,msg:"conflict",user:{}}
                    // console.log(res);

                    if (res.data.code === 1) {
                        //提示用户录入成功（弹窗）
                        _this.error = false;
                        _this.errorMsg = "";
                        _this.$notify({
                            type: 'success',
                            message: 'registered successfully!',
                            duration: 2000
                        });
                        this.resetInput();
                    } else {
                        // 用户已经存在
                        // console.log(res.data.data)
                        // console.log("conflict");
                        _this.error = true;
                        _this.errorMsg = "User is already exist!";
                    }
                })
                .catch((err) => {
                    _this.$message({
                        message: "Registration failed",
                        type: "warning",
                    });
                    // console.log(err);
                    _this.error = true;
                    _this.errorMsg = err.message;
                });
            return;
        },
        resetInput() {
            //this.role = "";
            this.username = null;
            this.card = null;
            this.password = this.$store.state.initialPassword;
            this.number = null;
            this.tel = "";
            this.email = "";
            this.college = "";
            this.major = "";
            this.state = "";
            this.school_year = "";
        },
        chooseEmer(itype) {
            if (itype === 0) {
                this.select_single = true;
                // console.log(this.select_single);
            } else {
                this.select_single = false;
                // console.log(this.select_single);
            }
        },
        importCSV() {
            // console.log('import csv');
            let selectedFile = null;
            selectedFile = this.$refs.refFile.files[0];
            // console.log('file', selectedFile);
            if (selectedFile === undefined) {
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            let data = [];
            reader.onload = event => {
                // console.log(event.target.result);
                Papa.parse(selectedFile, {
                    encoding: 'UTF-8',
                    complete: res => {
                        data = res.data;
                        if (data[data.length - 1] == "") {
                            data.pop();
                        }
                        // console.log(data);
                        let objArray = [];
                        for (let i = 1; i < data.length; i++) {
                            objArray[i - 1] = {};
                            for (let k = 0; k < data[0].length && k < data[i].length; k++) {
                                let key = data[0][k];
                                objArray[i - 1][key] = data[i][k]
                            }
                        }
                        // console.log(objArray); // objArray
                        this.csv_import_check = true;
                        this.csv_user = objArray;
                    }
                });
            }
        },
        getAllState() {
            this.state_list = [{ id: 1, name: "in school" }, { id: 2, name: "retired" }, { id: 3, name: "graduate" }];
        },
        selectState() {
            // console.log('state', this.state);
        },
        registerCSV() {
            this.importCSV();
            // console.log(this.csv_submit_check);
            this.csv_submit_check = true;
            // console.log(this.csv_submit_check);
            let all_csv_correct = false;
            if (this.csv_import_check) {
                let correct_users = [];
                // console.log(this.csv_user);
                for (let i = 0; i < this.csv_user.length; i++) {
                    let email_err = false,
                        tel_err = false,
                        card_err = false,
                        number_err = false,
                        username_err = false,
                        password_err = false,
                        state_err = false,
                        role_err = false;
                    // console.log(this.csv_user[i], this.csv_user[i].number.length);
                    if (this.csv_user[i].email.length !== 0 && this.email_check(this.csv_user[i].email)) {
                        // console.log(1);
                        email_err = true;
                    }
                    if (this.csv_user[i].tel.length !== 0 && this.tel_check(this.csv_user[i].tel)) {
                        tel_err = true;
                    }
                    if (this.csv_user[i].card.length !== 0 && !this.card_check(this.csv_user[i].card)) {} else {
                        card_err = true;
                    }
                    if (this.csv_user[i].number.length !== 0 && !this.number_check(this.csv_user[i].number)) {} else {
                        number_err = true;
                    }
                    if (this.csv_user[i].username.length !== 0 && !this.username_check(this.csv_user[i].username)) {} else {
                        username_err = true;
                    }
                    if (this.csv_user[i].password.length !== 0 && this.check_password(this.csv_user[i].password)) {} else {
                        password_err = true;
                    }
                    if (this.csv_user[i].state.length !== 0 && (this.csv_user[i].state == "in school" ||
                            this.csv_user[i].state == "retire" || this.csv_user[i].state == "graduate")) {} else {
                        state_err = true;
                    }
                    if (this.csv_user[i].role.length !== 0 && (this.csv_user[i].role == "teacher" ||
                            this.csv_user[i].role == "student")) {} else {
                        role_err = true;
                    }
                    // console.log(number_err, card_err, email_err, tel_err, state_err, role_err);
                    if (this.csv_user[i].academy.length !== 0 && this.csv_user[i].major.length !== 0 &&
                        !email_err && !tel_err && !card_err && !number_err && !username_err &&
                        !password_err && !state_err && !role_err) {
                        all_csv_correct = true;
                        // console.log("all csv correct!!");
                        correct_users.push(this.csv_user[i]);
                    } else {
                        setTimeout(async() => {
                            await this.$message({
                                type: 'error',
                                message: '用户' + (i + 1) + '录入失败, 格式不正确',
                                duration: 1800
                            });
                        })
                    }

                }
                let _this = this;
                if (all_csv_correct) {
                    _this.$http
                        .post(domain.register_all, correct_users, {})
                        .then((res) => {
                            // console.log(res)
                            let flag = 0;
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].code !== 1) {
                                    flag = 1;
                                    setTimeout(async() => {
                                        await _this.$message({
                                            type: 'error',
                                            message: '用户' + (i + 1) + '录入失败',
                                            duration: 2000
                                        });
                                    })

                                } else {
                                    setTimeout(async() => {
                                        await
                                        _this.$notify({
                                            type: 'success',
                                            message: '用户' + (i + 1) + '录入成功',
                                            duration: 2000
                                        });
                                    })
                                }
                            }
                        })
                        .catch((err) => {
                            _this.$message({
                                type: 'error',
                                message: err,
                                duration: 2000
                            })
                        })
                }
            } else {
                this.$message({
                    type: 'error',
                    message: '没有上传成功！'
                })
            }
        },
        changeSemester(){
            // console.log(this.school_year);
            let year = this.school_year[0];
            let number_year = Number(year)%100
            // console.log(Number(year),Number(year)%100);
            this.number = String(number_year);
        },
        getSchoolYear() {
            let _this = this;
            this.$http.get(domain.get_permission, { params: {} })
            .then((res) => {
                // console.log(res.data);
                if(res.data.code == 1) {
                    let this_year = res.data.data[0].school_year;
                    let number_year = Number(this_year)%100;
                    _this.number =String(number_year);
                    _this.semester_options = [{ 
                        value: String(this_year),
                        label: String(this_year)
                    },{
                        value: String(Number(this_year)-1),
                        label: String(Number(this_year)-1)
                    },{
                        value: String(Number(this_year)-2),
                        label: String(Number(this_year)-2)
                    },{
                        value: String(Number(this_year)-3),
                        label: String(Number(this_year)-3)
                    },{
                        value: String(Number(this_year)-4),
                        label: String(Number(this_year)-4)
                    }
                ];
                // console.log(_this.semester_options);
                }
            })
        }
    },
    created() {
        // console.log('created');
        this.getInitialPassword();
        this.getAllState();
        this.init();
        this.getSchoolYear();
    },
    // watch: {
    //     "$route": {
    //         handler(route) {
    //             const that = this;
    //             if(route.name === "Register") {
    //                 // console.log('into page register');
    //                 that.init();
    //             }
    //         },
    //         deep: true
    //     }
    // }
};