import { _ } from 'core-js';
import Vue from 'vue'
import domain from "../util/domain.js"
import { catch_err } from "@/util/util";
export default {
    inject: ['reload'],
    name: "manage-college",
    component: {

    },
    data() {
        return {
            modify_en: false,
            college_list: [],
            all_list: [],
            flag: 1,
            select_btn: [],
            select_btn2: [],
            colleg_length: 0,
            major_length: 0,
            data_list: [],
            spanArray: [], // 用来存储需要合并的行数
            edit_major: "",
            add_enable: false,
            add_college_name: "",
            edit_before_college: ""
        }
    },
    created() {
        if (this.$route.name == "ManageCollege") {
            this.init();
        }
        this.data_list = [{
                "idAndAcademyName": {
                    "1": "学院名"
                },
                "idAndMajorNames": [{
                        "3": "专业名3"
                    },
                    {
                        "1": "专业名1"
                    },
                    {
                        "4": "专业名4"
                    },
                    {
                        "2": "专业名2"
                    }
                ]
            },
            {
                "idAndAcademyName": {
                    "2": "学院名2"
                },
                "idAndMajorNames": [{
                        "5": "专业名5"
                    },
                    {
                        "6": "专业名6"
                    }
                ]
            }
        ];
    },
    methods: {
        init() {
            let _this = this;
            this.data_list = [];
            _this.$http
                .post(domain.get_academy, {})
                .then((res) => {
                    // console.log(res);
                    // res.data={code:1,msg:"conflict",user:{}}
                    if (res.data.code == 1) {
                        this.data_list = res.data.data;
                        this.get_major_total_length();
                        this.create_btn(this.data_list.length, this.major_length);
                        this.get_college();
                        this.get_all_list();
                    }
                })
                .catch(catch_err);
        },
        get_major_total_length() {
            let count = 0;
            for (let i = 0; i < this.data_list.length; i++) {
                for (let j = 0; j < this.data_list[i]["idAndMajorNames"].length; j++) {
                    count += 1;
                }
            }
            this.major_length = count;
        },
        modifyEnable() {
            this.modify_en = !this.modify_en;
        },
        create_btn(num1, num2) {
            for (let i = 0; i < num1; i++) {
                this.select_btn.push(false);
            }
            for (let i = 0; i < num2; i++) {
                this.select_btn2.push(false);
            }
        },
        get_college() {
            for (let i = 0; i < this.data_list.length; i++) {
                let key = Object.keys(this.data_list[i]["idAndAcademyName"]);
                // console.log(key,this.data_list[i]["idAndAcademyName"][key]);
                this.college_list.push(this.data_list[i]["idAndAcademyName"][key]);
            }
            // console.log(this.college_list);
        },
        get_all_list() {
            // for(let i = 0; i < this.data_list.length; i++) {
            //     let col = Object.keys(this.data_list[i]["idAndAcademyName"]);
            //     this.all_list.push({ 
            //         college: this.data_list[i]["idAndAcademyName"][col]
            //     });
            //     this.all_list[i].major = [];
            //     for(let j = 0; j < this.data_list[i]["idAndMajorNames"].length; j++) {
            //         let key = Object.keys(this.data_list[i]["idAndMajorNames"][j]);
            //         console.log(key,this.data_list[i]["idAndMajorNames"][j][key]);
            //         this.all_list[i].major.push(this.data_list[i]["idAndMajorNames"][j][key]);
            //     } 
            // }
            this.all_list = [];
            let index = 0;
            for (let i = 0; i < this.data_list.length; i++) {
                let col = Object.keys(this.data_list[i]["idAndAcademyName"]);
                index = -1;
                if (this.data_list[i]["idAndMajorNames"].length === 0) {
                    this.all_list.push({
                        id: 0,
                        college: this.data_list[i]["idAndAcademyName"][col],
                        major: ""
                    });
                } else {
                    for (let j = 0; j < this.data_list[i]["idAndMajorNames"].length; j++) {
                        let key = Object.keys(this.data_list[i]["idAndMajorNames"][j]);
                        index += 1; // 存放major在当前第几个
                        this.all_list.push({
                            id: index,
                            college: this.data_list[i]["idAndAcademyName"][col],
                            major: this.data_list[i]["idAndMajorNames"][j][key]
                        });
                    }
                }
            }
            // console.log(this.all_list);
            // 确定要合并的行数
            let tableIndex = 0;
            this.all_list.forEach((item, index) => {
                if (index === 0) {
                    this.spanArray.push(1); // 默认只占1行
                    tableIndex = 0;
                } else {
                    if (this.all_list[index].college === this.all_list[index - 1].college) { // 同一个院系，合并单元格
                        this.spanArray[tableIndex] += 1;
                        this.spanArray.push(0); // 占0行
                    } else {
                        this.spanArray.push(1);
                        tableIndex = index; // 更新tableIndex
                    }
                }
            });
            // console.log(this.spanArray);
        },
        chooseEmer(itype) {
            if (itype === 0) {
                this.flag = 0;
                this.select_student = true;
                // console.log(this.select_student);
            } else {
                this.flag = 1;
                this.select_student = false;
                // console.log(this.select_student);
            }
        },
        parseJson(jsonObj, key, value) {
            // 循环所有键
            for (let v in jsonObj) {
                let element = jsonObj[v]
                    // 1.判断是对象或者数组
                if (typeof(element) == 'object') {
                    let result = parseJson(element, key, value)
                    if (result) return result
                } else {
                    if (v == key) {
                        if (element == value) return jsonObj
                    }
                }
            }
        },
        changeCollege(index, $event) {
            // console.log(index, $event.target.innerText);
            this.edit_before_college = this.college_list[index];
            this.college_list[index] = $event.target.innerText;
            let college_id = Object.keys(this.data_list[index]["idAndAcademyName"]);
            this.data_list[index]["idAndAcademyName"][college_id] = $event.target.innerText;
        },
        Edit(index) {
            this.select_btn[index] = true;
            Vue.set(this.select_btn, index, this.select_btn[index]);
        },
        Delete(index) {
            this.select_btn[index] = true;
            Vue.set(this.select_btn, index, this.select_btn[index]);
            this.edit_before_college = this.college_list[index];
            let college_id = Object.keys(this.data_list[index]["idAndAcademyName"]);
            this.data_list[index]["idAndAcademyName"][college_id] = "";
            // console.log(this.data_list[index]);
        },
        EditSubmit(index) {
            // console.log(index);
            this.select_btn[index] = false;
            Vue.set(this.select_btn, index, this.select_btn[index]);
            let _this = this;
            _this.$http
                .put(domain.academy_change_delete, this.data_list[index], {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        // setTimeout(_this.$router.go(0),5000);

                        _this.$notify({
                            type: 'success',
                            message: res.data.msg,
                            duration: 1500
                        });
                        setTimeout(function() {
                            // _this.$router.go(0);
                            _this.reload();
                        }, 1800);



                    } else {
                        _this.$message({
                            type: 'error',
                            message: res.data.msg,
                            duration: 2000
                        })
                        _this.router.go(0);
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err,
                        duration: 2000
                    })
                });
        },
        EditCancel(index) {
            this.select_btn[index] = false;
            Vue.set(this.select_btn, index, this.select_btn[index]);
            this.college_list[index] = this.edit_before_college;
        },
        Edit2(index) {
            // console.log(index);
            this.select_btn2[index] = true;
            Vue.set(this.select_btn2, index, this.select_btn2[index]);
            // this.all_list[index].major = this.edit_major;
            // console.log(this.data_list);
        },
        Delete2(index) {
            this.select_btn2[index] = true;
            Vue.set(this.select_btn2, index, this.select_btn2[index]);
        },
        EditSubmit2(index) {
            // console.log(index);
            this.select_btn2[index] = false;
            Vue.set(this.select_btn2, index, this.select_btn2[index]);
            if (this.nameCorrect(this.edit_major)) {
                let _this = this;
                this.all_list[index].major = this.edit_major;
                let college_name = this.all_list[index].college;
                // console.log(college_name, this.data_list);
                for (let i = 0; i < this.data_list.length; i++) {
                    let college_id = Object.keys(this.data_list[i]["idAndAcademyName"]);
                    if (this.data_list[i]["idAndAcademyName"][college_id] == college_name) {
                        if (this.data_list[i]["idAndMajorNames"].length == 0) { // 专业为空
                            let ssss = {
                                "idAndAcademyName": {
                                    college_id: college_name
                                },
                                "idAndMajorNames": [{
                                    "": this.edit_major,
                                }]
                            }
                            _this.$http
                                .put(domain.academy_add, ssss, {})
                                .then()
                                .catch(catch_err);
                            // 这个if不执行
                        } else {
                            let key = Object.keys(this.data_list[i]["idAndMajorNames"][this.all_list[index].id]);
                            this.data_list[i]["idAndMajorNames"][this.all_list[index].id][key] = this.edit_major;
                            _this.$http
                                .put(domain.academy_change_delete, this.data_list[i], {})
                                .then((res) => {
                                    // console.log(res);
                                    if (res.data.code === 1) {
                                        _this.$notify({
                                            type: 'success',
                                            message: res.data.msg,
                                            duration: 1500
                                        });
                                        setTimeout(function() {
                                            // _this.$router.go(0);
                                            _this.reload();
                                        }, 1500);
                                    } else {
                                        _this.$message({
                                            message: res.data.msg,
                                            type: "warning",
                                            duration: 2000
                                        });
                                        _this.reload();
                                    }
                                })
                                .catch(catch_err);
                        }
                        break;
                    }
                }

            } else {
                this.$message({
                    message: "专业命名不规范",
                    type: "warning",
                    duration: 2000
                });
                setTimeout(function() {
                    _this.$router.go(0)
                }, 1500);
            }
        },
        EditCancel2(index) {
            this.select_btn2[index] = false;
            Vue.set(this.select_btn2, index, this.select_btn2[index]);
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) { // 第一列合并
                let _row = this.spanArray[rowIndex];
                let _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        editMajor() {
            // console.log(this.edit_major);
            // console.log(this.data_list);
        },
        AddCollege() {
            // console.log(this.add_enable);
            this.add_enable = true;
        },
        addEdit() {
            // console.log(this.add_college_name);
            let reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g;
            if (!reg.test(this.add_college_name)) {
                return true;
            } else {
                return false;
            }
        },
        AddSubmit() {
            this.add_enable = false;
            if (this.addEdit()) {
                let _this = this;
                let new_college = {
                    "idAndAcademyName": {
                        "": this.add_college_name
                    },
                    "idAndMajorNames": [{
                        "": "edit me!!"
                    }]
                };
                // console.log(new_college);
                _this.$http
                    .put(domain.academy_add, new_college, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {

                            _this.$notify({
                                type: 'success',
                                message: "添加学院成功",
                                duration: 1500
                            });
                            setTimeout(function() {
                                // _this.$router.go(0)
                                _this.reload();
                            }, 1500);
                        } else {
                            _this.$message({
                                type: 'error',
                                message: "请先把专业信息补充完整",
                                duration: 2000
                            })
                        }
                    })
                    .catch((err) => {
                        // console.log(err);
                        this.$message({ type: 'error', message: "请先把专业信息补充完整" });
                    });


            } else {
                this.$message({
                    message: "学院命名不规范",
                    type: "warning",
                    duration: 2000
                });
                setTimeout(function() {
                    _this.$router.go(0)
                }, 1500);
            }
        },
        AddCancel() {
            this.add_enable = false;
        },
        nameCorrect(name) {
            let reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g;
            if (!reg.test(name)) {
                return true;
            } else {
                return false;
            }
        },
        Add2(index) {
            let college_name = this.all_list[index].college;
            for (let i = 0; i < this.data_list.length; i++) {
                let college_id = Object.keys(this.data_list[i]["idAndAcademyName"]);
                if (this.all_list[index].college == this.data_list[i]["idAndAcademyName"][college_id]) {
                    this.data_list[i]["idAndMajorNames"].push({
                        "": "edit me!!"
                    });
                    let _this = this;
                    _this.$http
                        .put(domain.academy_add, this.data_list[i], {})
                        .then((res) => {
                            // console.log(res);
                            if (res.data.code === 1) {

                                _this.$notify({
                                    type: 'success',
                                    message: "添加专业成功",
                                    duration: 1500
                                });
                                setTimeout(function() {
                                    // _this.$router.go(0)
                                    _this.reload();
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            this.$message({
                                type: 'error',
                                message: "请先把专业补充完整"
                            })
                        });
                }
            }
        }

    }
}