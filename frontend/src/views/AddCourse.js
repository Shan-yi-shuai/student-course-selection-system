import SelectClassTime from "@/components/SelectClassTime";
import SelectClassroom from "@/components/SelectClassroom";
import InputCapacity from "@/components/InputCapacity";
import InputCredit from "@/components/InputCredit";
import InputIntroduction from "@/components/InputIntroduction";
import domain from "../util/domain.js"
import { catch_err, error_msg, message_err, pass, success_msg } from "@/util/util";

export default {
    name: "add-course",
    components: {
        SelectClassTime,
        SelectClassroom,
        InputCapacity,
        InputCredit,
        InputIntroduction
    },
    data() {
        return {
            addedCourse: {
                id: "-1",
                name: "",
                number: 0,
                academy: "",
                hour: "",
                credit: null,
                userInfo: [],
                timeInfo: [],
                introduction: "",
                capacity: 0,
                majorList: [],
                type: "",
                classroom: null,
                school_year: "",
                term: "",
            },

            all_classrooms: [],

            all_major: [],
            major_list: [],
            college_list: [],
            all_list: [],
            college_length: 0,
            major_length: 0,
            college_selected: false,

            new_teacher: {
                user_name: "",
                user_number: "",
            },

            add_a_teacher: undefined, // only 设置一个undifined， placeholder才显示
            userForm: [{
                    dataItem: "user_name",
                    dataName: "Name"
                },
                {
                    dataItem: "user_number",
                    dataName: "Number"
                }
            ],

            new_time: {
                class_number: 0,
                week_day: 0
            },
            timeForm: [{
                    dataItem: "class_number",
                    dataName: "class number"
                },
                {
                    dataItem: "week_day",
                    dataName: "weekday"
                }
            ],
            selectedMajors: [],
            from: "",
            isTeacher: false,
            username: "",
            academy: "",
            username_list: [],
            for_selected_user: [],
            submit_check: false,
            classroom_error: "",
            time: [],
            new_location: "",
            semester_options: [],
            majorCheckAll: false,
            checkedMajors: [],
            isIndeterminate: false,
            select_academy: "",
        }
    },
    mounted: function() {
        this.getParams();
        this.getUser();
        this.fetchMajorCollege();
        this.selectedMajors = [];
        this.getClassroom();
        this.getSchoolYear();
        this.for_selected_user = [];
    },
    methods: {
        selectTeacher(e) {
            this.new_teacher = {
                    user_name: this.username_list[e].username,
                    user_number: this.username_list[e].number
                }
                // for (let i = 0; i < this.username_list.length; i++) {
                //     if (this.username_list[i].name == this.add_a_teacher) {
                //         this.new_teacher = {
                //             user_name: this.username_list[i].username,
                //             user_number: this.username_list[i].number
                //         }
                //     }
                // }
                // console.log("new teacher", this.new_teacher);
        },
        selectLocation(index) {
            this.addedCourse.classroom = this.all_classrooms[index];
            if (this.addedCourse.classroom.capacity < this.addedCourse.capacity) {
                this.classroom_error = "Capacity exceeds classroom capacity";
            } else {
                this.classroom_error = "";
            }
            // console.log(this.addedCourse.classroom);
        },
        selectCapacity() {
            console.log(1);
            if (this.addedCourse.classroom.capacity < this.addedCourse.capacity) {
                this.classroom_error = "Capacity exceeds classroom capacity";
            } else {
                this.classroom_error = "";
            }
            // console.log(this.addedCourse.classroom);
        },
        getUser() {
            let _this = this;
            this.username_list = [];
            // let admin_number = "000000";
            if (this.from === "ApplyCourse") {
                _this.$http
                    .get(domain.viewOneUser, { params: { number: _this.user.number } })
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            this.username = res.data.data.username;
                            this.academy = res.data.data.academy;
                        }
                    })
                    .catch(catch_err)
            } else {
                this.username_list = [];
                _this.$http
                    .post(domain.viewAllUser, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].role === "teacher") {
                                    _this.username_list.push({
                                        id: i, // 是在数据库里的所有用户排列的id
                                        username: res.data.data[i].username,
                                        number: res.data.data[i].number,
                                        name: res.data.data[i].number + ' - ' + res.data.data[i].username,
                                        academy: res.data.data[i].academy
                                    })
                                }
                            }
                            // console.log(this.username_list, this.username_list.length);
                        }
                    })
                    .catch(catch_err)
            }
        },
        getParams() {
            // 取到路由带过来的参数
            // console.log(this.$route.params);
            this.from = this.$route.params.from;
            this.isTeacher = (this.from === "ApplyCourse");
            // console.log('from', this.from);
        },
        getClassroom() {
            this.all_classrooms = [];
            let _this = this;
            _this.$http.get(domain.get_classrooms, { params: {} })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.code === 1) {
                        this.all_classrooms = [];
                        let len = res.data.data.length
                        for (let i = 0; i < len; i++) {
                            this.all_classrooms.push(res.data.data[i]);
                        }
                        // console.log(this.all_classrooms);
                    }
                });
        },
        addCourse() {
            if (this.classroom_error != "") {
                return;
            }
            let _this = this
            let tp = "add"
            let ac = this.addedCourse;
            let ml = this.selectedMajors;

            if (this.user.role === "admin") {
                // console.log("admin")

                let post_data = {
                        id: -1,
                        name: ac.name,
                        number: "",
                        academy: ac.academy,
                        hour: ac.hour,
                        credit: ac.credit,
                        userInfo: ac.userInfo,
                        timeInfo: ac.timeInfo,
                        introduction: ac.introduction,
                        classroom: ac.classroom,
                        capacity: ac.capacity,
                        majorList: ml,
                        selectedNumber: 0,
                        school_year: ac.school_year,
                        term: ac.term,
                        //type: tp
                    }
                    // console.log(post_data);
                _this.$http.post(domain.admin_add_course, post_data, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            _this.$notify(success_msg(res));
                            _this.addedCourse = [];
                            _this.$router.push({ name: this.from }).then(pass);
                        } else {
                            _this.$message(error_msg(res))
                        }
                    })
                    .catch((err) => {
                        _this.$message(message_err(err))
                    })
            } else if (this.user.role === "teacher") {
                // console.log("teacher")
                let this_applicant = {
                    user_number: this.user.number,
                    user_name: this.username
                }
                let post_data = {
                        id: "-1",
                        course_id: ac.id,
                        name: ac.name,
                        number: String(ac.number),
                        academy: this.academy,
                        hour: ac.hour,
                        credit: ac.credit,
                        userInfo: [this_applicant],
                        applicant: this_applicant,
                        timeInfo: ac.timeInfo,
                        introduction: ac.introduction,
                        classroom: ac.classroom,
                        capacity: ac.capacity,
                        majorList: ml,
                        type: tp,
                        status: "待审核",
                        school_year: ac.school_year,
                        term: ac.term,
                        selected_number: 0,
                    }
                    // console.log(post_data);
                _this.$http.post(domain.teacher_add_apply, post_data, {})
                    .then((res) => {
                        // console.log(res)
                        if (res.data.code === 1) {
                            this.$notify({
                                type: 'success',
                                message: "增加课程请求增加成功",
                                duration: 1200,
                            });
                            _this.$router.push({ name: this.from });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg,
                            })
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            type: 'error',
                            message: err
                        })
                    })
            }
        },
        fetchMajorCollege() {
            let this_ = this;
            this_.$http
                .post(domain.get_academy, {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        let college_major = res.data.data;
                        this.getCollege(college_major);
                        this.getAllMajor(college_major);
                    }
                })
                .catch(catch_err)
        },
        getCollege(college_major) {
            let len = college_major.length;
            this.college_list = [];
            for (let i = 0; i < len; i++) {
                let col = Object.keys(college_major[i]["idAndAcademyName"]);
                this.college_list.push({
                    id: (i + 1).toString(),
                    name: college_major[i]["idAndAcademyName"][col].toString()
                });
            }
            // console.log(this.college_list);
        },
        getAllMajor(college_major) {
            let index = 0;
            let len = college_major.length
            this.all_major = [];
            for (let i = 0; i < len; i++) {
                let col = Object.keys(college_major[i]["idAndAcademyName"]);
                let name = college_major[i]["idAndAcademyName"][col];

                let ll = college_major[i]["idAndMajorNames"].length
                for (let j = 0; j < ll; j++) {
                    index += 1;
                    let key = Object.keys(college_major[i]["idAndMajorNames"][j]);
                    this.all_major.push({
                        id: index.toString(),
                        name: college_major[i]["idAndMajorNames"][j][key],
                        college: name
                    })
                }
            }
            // console.log('all major', this.all_major);
            this.major_list = [];
        },
        selectAcademy(value) {
            this.addedCourse.academy = value;
            let academy_users = [];
            if (this.addedCourse.academy == "") {
                this.for_selected_user = [];
            } else {
                for (let i = 0; i < this.username_list.length; i++) {
                    if (this.username_list[i].academy === this.addedCourse.academy) {
                        academy_users.push(this.username_list[i]);
                    }
                }

                this.for_selected_user = academy_users;
                // console.log(this.for_selected_user);
            }

        },
        addTeacher() {
            let flag = false
            let len = this.addedCourse.userInfo.length;
            // console.log(this.new_teacher);
            for (let i = 0; i < len; i++) {
                let t = this.addedCourse.userInfo[i];
                if (t.user_number === this.new_teacher.user_number) {
                    flag = true
                    break
                }
            }
            if (flag) {
                this.new_teacher = {};
                return
            }
            this.addedCourse.userInfo.push(this.new_teacher);
            // console.log(this.addedCourse.userInfo);
            this.new_teacher = {};
        },
        deleteTeacher(teacher) {
            let idx = this.addedCourse.userInfo.indexOf(teacher)
            this.addedCourse.userInfo.splice(idx, 1)
        },
        addTime() {
            let flag = false
            let len = this.addedCourse.timeInfo.length;
            for (let i = 0; i < len; i++) {
                let t = this.addedCourse.timeInfo[i]
                if (t.week_day == this.new_time.week_day &&
                    t.class_number == this.new_time.class_number) {
                    flag = true
                    break
                }
            }
            if (flag) {
                this.new_time = {}
                return
            }
            this.addedCourse.timeInfo.push(this.new_time)
            this.new_time = {}
        },
        _addTime(new_time) {
            // console.log(new_time)
            this.new_time.week_day = new_time.week_day
            this.new_time.class_number = new_time.class_number
            this.addTime()
        },
        deleteTime(time) {
            // console.log(time)
            let idx = this.addedCourse.timeInfo.indexOf(time)
            this.addedCourse.timeInfo.splice(idx, 1)
        },
        selectClassroom(new_classroom) {
            // console.log(new_classroom);
            this.addedCourse.classroom = new_classroom;
            this.addedCourse.classroom = new Object();
            this.addedCourse.classroom.id = new_classroom.id;
            this.addedCourse.classroom.classroom_name = new_classroom.classroom_name;
            this.addedCourse.classroom.capacity = new_classroom.capacity;
            if (this.addedCourse.classroom.capacity < this.addedCourse.capacity) {
                this.classroom_error = "Capacity exceeds classroom capacity";
            }
            // console.log(this.addedCourse);
        },
        getCapacity(res) {
            // console.log(res)
            this.addedCourse.capacity = res.data;
            this.submit_check = this.submit_check && (!res.error)
        },
        getCredit(res) {
            // console.log(res)
            this.addedCourse.credit = res.data;
            this.submit_check = this.submit_check && (!res.error)
        },
        getIntroduction(res) {
            this.addedCourse.introduction = res.data;
            this.submit_check = this.submit_check && (!res.error)
        },
        changeSemester() {
            // console.log(this.time);
            this.addedCourse.school_year = Number(this.time[0]);
            this.addedCourse.term = Number(this.time[1]);
            // console.log(this.addedCourse);
        },
        writeNumber() {
            // console.log(this.addedCourse.number, typeof(this.addedCourse.number));
            this.addedCourse.number = String(this.addedCourse.number);
            // console.log(this.addedCourse.number, typeof(this.addedCourse.number));
        },
        getSchoolYear() {
            this.$http.get(domain.get_permission, { params: {} })
                .then((res) => {
                    if (res.data.code === 1) {
                        let this_year = res.data.data[0].school_year;
                        this.semester_options = [{
                            value: String(this_year),
                            label: String(this_year) + '-' + String(this_year + 1),
                            children: [{
                                value: 1,
                                label: "第一学期"
                            }, {
                                value: 2,
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 1),
                            label: String(Number(this_year) + 1) + '-' + String(this_year + 2),
                            children: [{
                                value: 1,
                                label: "第一学期"
                            }, {
                                value: 2,
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 2),
                            label: String(Number(this_year) + 2) + '-' + String(this_year + 3),
                            children: [{
                                value: 1,
                                label: "第一学期"
                            }, {
                                value: 2,
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 3),
                            label: String(Number(this_year) + 3) + '-' + String(this_year + 4),
                            children: [{
                                value: 1,
                                label: "第一学期"
                            }, {
                                value: 2,
                                label: "第二学期"
                            }]
                        }]
                    }
                })
                .catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err
                    })
                })
        },
        addLimits(major) {
            // console.log(major);
            let major_name = [];
            for (let i = 0; i < major.length; i++) {
                major_name.push(major[i].name);
            }
            this.selectedMajors = major_name;
            // console.log(this.selectedMajors);
            this.majorCheckAll = major.length === this.all_major.length;
            // let len = this.selectedMajors.length;
            // this.selectedMajors.find((val, idx, arr) => {
            //     if (val === major) {
            //         arr.splice(idx, 1)
            //     }
            // })
            // if (len === this.selectedMajors.length) {
            //     this.selectedMajors.push(major)
            // }
            // console.log(this.selectedMajors);
        },
        majorCheckAllHandle() {
            this.checkedMajors = this.majorCheckAll ? this.all_major : [];
            this.isIndeterminate = false;
            let major_name = [];
            for (let i = 0; i < this.checkedMajors.length; i++) {
                major_name.push(this.checkedMajors[i].name);
            }
            this.selectedMajors = major_name;
            // console.log(this.selectedMajors);
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}