import SelectClassTime from "@/components/SelectClassTime";
import domain from "../util/domain.js"
import { catch_err, error_msg, message_err, pass, success_msg } from "@/util/util";
export default {
    name: "modify-course",
    components: {
        SelectClassTime
    },
    data() {
        return {
            new_location: {},
            isTeacher: false,
            username: "",
            username_list: [],
            add_a_teacher: {},
            addedCourse: {
                id: "-1",
                name: "",
                number: 0,
                academy: "",
                hour: "",
                credit: "",
                userInfo: [],
                timeInfo: [],
                introduction: "",
                classroom: "",
                capacity: "",
                majorList: [],
                type: "",
                from: "",
                school_year: "",
                term: "",
            },

            all_major: [],
            major_list: [],
            college_list: [],
            all_list: [],
            college_length: 0,
            major_length: 0,
            college_selected: false,

            is_admin: false,
            is_teacher: false,

            new_teacher: {
                user_name: "",
                user_number: ""
            },
            userForm: [{
                    dataItem: "user_name",
                    dataName: "Name"
                },
                {
                    dataItem: "user_number",
                    dataName: "Number"
                }
            ],
            all_classrooms: [],

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
            classroom_error: "",
            capacity_error: "",
            status: 0,
        }
    },
    created() {
        if (this.user.role === "admin") {
            this.is_admin = true;
        } else if (this.user.role === "teacher") {
            this.is_teacher = true;
        }
        this.fetchMajorCollege()
        let get_course = this.$route.params.passing_data;
        this.from = this.$route.params.from;
        this.isTeacher = (this.from === "ApplyCourse");
        this.addedCourse.id = get_course.id;
        this.addedCourse.name = get_course.name;
        this.addedCourse.number = get_course.number;
        this.addedCourse.academy = get_course.academy;
        this.addedCourse.credit = get_course.credit;
        this.addedCourse.capacity = get_course.capacity;
        this.addedCourse.classroom = get_course.classroom;
        this.addedCourse.hour = get_course.hour;
        this.addedCourse.introduction = get_course.introduction;
        get_course.userInfo.forEach((data) => {
                if (data.user_number.length === 8) {
                    this.addedCourse.userInfo.push(data);
                }
            })
            //this.addedCourse.userInfo = get_course.userInfo;
        this.addedCourse.timeInfo = get_course.timeInfo;
        this.addedCourse.school_year = get_course.year;
        this.addedCourse.term = get_course.term;
        this.addedCourse.selectedNumber = get_course.selectedNumber;
        this.selectedMajors = get_course.majorList;
        this.addedCourse.majorList = get_course.majorList;

        this.getUser();
        this.getClassrooms();
        this.getPermission();
    },
    methods: {
        selectLocation() {
            // console.log(this.new_location);
            // console.log(this.addedCourse.location);
            this.addedCourse.classroom = this.new_location;
            if (this.new_location.capacity < this.addedCourse.capacity) {
                this.classroom_error = "Capacity exceeds classroom capacity";
            } else {
                this.classroom_error = "";
            }
            // console.log(this.addedCourse.classroom);
        },
        getUser() {
            let _this = this;
            if (this.from === "ApplyCourse") {
                _this.$http
                    .get(domain.viewOneUser, { params: { number: _this.user.number } })
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            this.username = res.data.data.username;
                        }
                    })
                    .catch((err) => {
                        // console.error(err);
                    })
            } else {
                this.username_list = [];
                _this.$http
                    .post(domain.viewAllUser, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].role == "teacher" && res.data.data[i].state == "in school") {
                                    _this.username_list.push({
                                        id: i + 1,
                                        username: res.data.data[i].username,
                                        number: res.data.data[i].number,
                                        name: res.data.data[i].number + ' - ' + res.data.data[i].username
                                    })
                                }

                            }
                            // console.log(_this.username_list);
                        }
                    })
                    .catch(catch_err)
            }
        },
        getClassrooms() {
            this.$http.get(domain.get_classrooms, { params: {} })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.code === 1) {
                        this.all_classrooms = [];
                        //classroom_table = res.data.data;
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.all_classrooms.push(res.data.data[i]);
                        }
                        // console.log(this.all_classrooms);
                    }
                });
        },
        getParams() {
            // 取到路由带过来的参数
            this.from = this.$route.params.from;
            this.isTeacher = (this.from === "ApplyCourse") ? true : false;
            // console.log('from', this.from);
        },
        checkCapacity() {
            // console.log(this.addedCourse.capacity);
            // console.log(this.addedCourse);
            if (this.addedCourse.capacity > this.addedCourse.classroom.capacity) {
                this.capacity_error = "Course capacity exceeds classroom capacity";
            } else if (this.addedCourse.capacity < this.addedCourse.selectedNumber && this.status !== 1) {
                this.capacity_error = "The course capacity is less than the number of people taking course";
            } else {
                this.capacity_error = "";
            }
        },
        addCourse() {
            if (this.classroom_error != "") {
                return;
            }
            if (this.capacity_error != "") {
                return;
            }

            // console.log(this.addedCourse)
            let _this = this
            let tp = "change"
            this.addedCourse.majorList = [];
            // console.log(this.all_major);
            for (let i = 0; i < this.all_major.length; i++) {
                if (this.all_major[i].checked) {
                    this.addedCourse.majorList.push(this.all_major[i].name);
                }
            }
            let ac = this.addedCourse;

            if (this.user.role === "admin") {
                // console.log("admin")

                let post_data = {
                    id: ac.id,
                    name: ac.name,
                    number: ac.number,
                    academy: ac.academy,
                    hour: ac.hour,
                    credit: ac.credit,
                    userInfo: ac.userInfo,
                    timeInfo: ac.timeInfo,
                    introduction: ac.introduction,
                    classroom: ac.classroom,
                    capacity: ac.capacity,
                    majorList: ac.majorList,
                    selectedNumber: ac.selectedNumber,
                    school_year: ac.school_year,
                    term: ac.term,
                }
                // console.log(post_data)
                _this.$http.post(domain.course_change, post_data, {})
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code === 1) {
                            _this.$notify(success_msg(res));
                            _this.addedCourse = [];
                            _this.$router.push({ name: "ManageCourse" }).then(pass);
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
                    number: ac.number,
                    academy: ac.academy,
                    hour: ac.hour,
                    credit: ac.credit,
                    userInfo: ac.userInfo,
                    timeInfo: ac.timeInfo,
                    introduction: ac.introduction,
                    classroom: ac.classroom,
                    capacity: ac.capacity,
                    majorList: ac.majorList,
                    type: tp,
                    status: "待审核",
                    applicant: this_applicant,
                    school_year: ac.school_year,
                    term: ac.term,
                    selected_number: ac.selectedNumber,
                }
                // console.log(post_data);
                _this.$http.post(domain.teacher_add_apply, post_data, {})
                    .then((res) => {
                        // console.log(res)
                        if (res.data.code === 1) {
                            _this.$notify(success_msg(res));
                        } else {
                            _this.$message(error_msg(res))
                        }
                        // console.log("submit")

                    })
                    .catch((err) => {
                        _this.$message(message_err(err))
                    })
            }
        },
        fetchMajorCollege() {
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
                .catch(catch_err)
        },
        getCollege() {
            let len = this.college_major.length;
            for (let i = 0; i < len; i++) {
                let col = Object.keys(this.college_major[i]["idAndAcademyName"]);
                this.college_list.push({
                    id: (i + 1).toString(),
                    name: this.college_major[i]["idAndAcademyName"][col].toString()
                });
            }
        },
        getAllMajor() {
            this.all_major = [];
            let index = 0;
            let len = this.college_major.length
            for (let i = 0; i < len; i++) {
                let col = Object.keys(this.college_major[i]["idAndAcademyName"]);
                let name = this.college_major[i]["idAndAcademyName"][col];

                let ll = this.college_major[i]["idAndMajorNames"].length
                for (let j = 0; j < ll; j++) {
                    index += 1;
                    let key = Object.keys(this.college_major[i]["idAndMajorNames"][j]);
                    let major_name = this.college_major[i]["idAndMajorNames"][j][key];
                    let checked = false;
                    for (let i = 0; i < this.selectedMajors.length; i++) {
                        if (major_name == this.selectedMajors[i]) {
                            checked = true;
                            break;
                        }
                    }
                    this.all_major.push({
                        id: index.toString(),
                        name: major_name,
                        college: name,
                        checked: checked,
                    })
                }
            }
            // console.log('all major', this.all_major);
        },
        getChecked() {},
        selectMajor() {
            // console.log(this.addedCourse.academy)
        },
        selectTeacher() {
            // console.log(this.add_a_teacher);
            for (let i = 0; i < this.username_list.length; i++) {
                if (this.username_list[i].name == this.add_a_teacher) {
                    this.new_teacher = {
                        user_name: this.username_list[i].username,
                        user_number: this.username_list[i].number
                    }
                }
            }
            // console.log("new teacher", this.new_teacher);
        },
        addTeacher() {
            let flag = false
            let len = this.addedCourse.userInfo.length;
            if (this.new_teacher.user_name) {
                for (let i = 0; i < len; i++) {
                    let t = this.addedCourse.userInfo[i];
                    if (t.user_number == this.new_teacher.user_number) {
                        flag = true
                        break
                    }
                }
                if (flag) {
                    this.new_teacher = {}
                    return
                }
                this.addedCourse.userInfo.push(this.new_teacher);
                this.new_teacher = {};
            }
        },
        deleteTeacher(teacher) {
            this.addedCourse.userInfo.splice(teacher, 1)
        },
        addTime() {},
        _addTime(new_time) {
            // console.log(new_time)
            this.new_time.week_day = new_time.week_day
            this.new_time.class_number = new_time.class_number
            let f = false
            let len = this.addedCourse.timeInfo.length;
            for (let i = 0; i < len; i++) {
                let t = this.addedCourse.timeInfo[i]
                if (t.week_day == this.new_time.week_day &&
                    t.class_number == this.new_time.class_number) {
                    f = true
                    break
                }
            }
            if (f) {
                this.new_time = {}
                return
            }
            this.addedCourse.timeInfo.push(this.new_time)
            this.new_time = {}
            this.addTime()
        },
        deleteTime(time) {
            // console.log(time)
            let idx = this.addedCourse.timeInfo.indexOf(time)
            this.addedCourse.timeInfo.splice(idx, 1)
        },
        addLimits(major) {
            // console.log(major);
            let len = this.all_major.length;
            for (let i = 0; i < len; i++) {
                if (this.all_major[i].name == major && !this.all_major[i].checked) {
                    this.all_major[i].checked = true;
                    break;
                } else if (this.all_major[i].name == major && this.all_major[i].checked) {
                    this.all_major[i].checked = false;
                    break;
                }
            }
            // console.log(this.all_major);
        },
        getPermission() {
            this.$http.get(domain.get_permission, { params: {} })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.status = res.data.data[0].status;
                    }
                })
                .catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err
                    })
                })
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}