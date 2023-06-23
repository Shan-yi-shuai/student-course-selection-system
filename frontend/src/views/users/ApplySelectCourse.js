import domain from "@/util/domain";
import { catch_err, sortArray } from "@/util/util";

export default {
    name: "ApplySelectCourse",
    component: {

    },
    data() {
        return {
            permission: true,
            all_course: [],
            searchContent: "",
            almost_all_course: [],
            username: "",
            all_apply: [],
            college_major: [],
        }
    },
    created() {
        this.getSchoolYear();
        this.getMajors();
        this.getAllCourse();
        this.getUsername();
        this.getAllApply();
    },
    mounted() {
        //this.getAllCourse();
    },
    methods: {
        getAllCourse() {
            let _this = this;
            this.all_course = [];
            this.$http.get(domain.student_view_to_select, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        for (let each = 0; each < res.data.data.length; each++) {
                            let data = res.data.data[each];
                            let users = JSON.parse(JSON.stringify(data.userInfo));
                            let count = -1;
                            for (let j = 0; j < data.userInfo.length; j++) {
                                count += 1;
                                if (data.userInfo[j].user_number.length === 6) {
                                    users.splice(count, 1);
                                    count -= 1;
                                }
                            }
                            if (res.data.data[each].selectedNumber >= res.data.data[each].capacity) {
                                _this.all_course.push({
                                    id: data.id,
                                    name: data.name,
                                    number: data.number,
                                    academy: data.academy,
                                    hour: data.hour,
                                    credit: data.credit,
                                    userInfo: users,
                                    timeInfo: data.timeInfo,
                                    introduction: data.introduction,
                                    classroom: data.classroom,
                                    capacity: data.capacity,
                                    majorList: data.majorList,
                                    selectedNumber: data.selectedNumber,
                                    school_year: data.school_year,
                                    term: data.term,
                                    time: [],
                                });
                            }
                            // let data = res.data.data[each];
                            // _this.all_course.push(push_course(data));
                        }
                        _this.TagCourseByMajor();
                        _this.rearrangeTime(_this.all_course);
                        _this.almost_all_course = _this.all_course;
                    } else {
                        _this.$message({
                            type: 'error',
                            message: res.data.msg,
                        });
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err
                    });
                })
        },
        rearrangeTime(arr) {
            let time_min = 13,
                time_max = 1,
                time = "",
                week = 0,
                week_day = "",
                flag = 0;
            for (let i = 0; i < arr.length; i++) {
                arr[i].time = [];
                week = 0; // arr[i].timeInfo[0].week_day;
                flag = 0;
                time_min = 13;
                time_max = 1;
                time = "";
                week_day = "";
                for (let j = 0; j < arr[i].timeInfo.length; j++) {
                    let x = arr[i].timeInfo[j];
                    if (x.week_day != week) {
                        // console.log('x.week_day != week');
                        flag = 0;
                        week = x.week_day;
                        for (let k = 0; k < arr[i].time.length; k++) {
                            if (arr[i].time[k].week == x.week_day) { // week_day已经记进去了
                                // console.log('week_day已经记进去了');
                                // console.log('time 长度', arr[i].time[k].time.length);
                                if (arr[i].time[k].time.length < 3) {
                                    time_min = time_max = Number(arr[i].time[k].time);
                                } else {
                                    let tt = arr[i].time[k].time.split('-');
                                    time_min = Number(tt[0]);
                                    time_max = Number(tt[1]);
                                }
                                // console.log('time min', time_min, 'time max', time_max);
                                if (x.class_number < time_min) {
                                    time_min = x.class_number;
                                }
                                if (x.class_number > time_max) {
                                    time_max = x.class_number;
                                }
                                arr[i].time[k].time = String(time_min) + '-' + String(time_max);
                                // console.log(i, 'length', arr[i].time.length, arr[i].time);
                                flag = 1;
                                break;
                            }
                        }
                        // console.log('flag', flag);
                        if (flag === 0) { // week_day未被记录
                            // time = String(time_min)+'-'+String(time_max);
                            // console.log('push before',i,'length', arr[i].time.length,arr[i].time);
                            // arr[i].time.push({
                            //     week: week,
                            //     week_day: week_day,
                            //     time: time
                            // })
                            // console.log('2', i, 'length', arr[i].time.length, arr[i].time);


                            switch (x.week_day) {
                                case 1:
                                    week_day = '一';
                                    break;
                                case 2:
                                    week_day = '二';
                                    break;
                                case 3:
                                    week_day = '三';
                                    break;
                                case 4:
                                    week_day = '四';
                                    break;
                                case 5:
                                    week_day = '五';
                                    break;
                                case 6:
                                    week_day = '六';
                                    break;
                                case 7:
                                    week_day = '日';
                                    break;
                                default:
                                    week_day = '七';
                                    break;
                            }
                            //if(arr[i].timeInfo.length === 1) {
                            time = String(x.class_number);
                            arr[i].time.push({
                                week: week,
                                week_day: week_day,
                                time: String(x.class_number)
                            })
                            time_min = time_max = x.class_number;
                            //}
                        }
                        // week = x.week_day;
                        // switch(x.week_day) {
                        //     case 1: week_day = '一'; break;
                        //     case 2: week_day = '二'; break;
                        //     case 3: week_day = '三'; break;
                        //     case 4: week_day = '四'; break;
                        //     case 5: week_day = '五'; break;
                        //     case 6: week_day = '六'; break;
                        //     case 7: week_day = '日'; break;
                        //     default: week_day = '七'; break;
                        // }
                        // if(arr[i].timeInfo.length == 1) {
                        //     time = String(x.class_number);
                        //     arr.time.push({
                        //         week: week,
                        //         week_day: week_day,
                        //         time: time
                        //     })
                        //     console.log('1',i,arr.time);
                        // }
                    } else {
                        if (x.class_number < time_min) {
                            time_min = x.class_number;
                        }
                        if (x.class_number > time_max) {
                            time_max = x.class_number;
                        }
                        arr[i].time[arr[i].time.length - 1].time = String(time_min) + '-' + String(time_max);
                        // if(j == arr[i].timeInfo.length-1) {
                        //     time = String(time_min)+'-'+String(time_max);
                        //     arr.time.push({
                        //         week: week,
                        //         week_day: week_day,
                        //         time: time
                        //     })
                        //     console.log('2',i,arr.time);
                        // }
                    }


                    // if(arr[i].timeInfo.length == 1) {
                    //     x.time = String(x.class_number);
                    //     console.log(i,x.time);
                    // }
                    // else {
                    //     if(x.class_number < time_min) {
                    //         time_min = x.class_number;
                    //     }
                    //     if(x.class_number > time_max) {
                    //         time_max = x.class_number;
                    //     }
                    //     if(j == arr[i].timeInfo.length-1) {
                    //         x.time = String(time_min)+'-'+String(time_max);
                    //         console.log(i,x.time);
                    //     }
                    // }
                }
            }
            // 给 上课时间按星期几排序
            for (let i = 0; i < arr.length; i++) {

                arr[i].time.sort(sortArray('week'));
                // console.log(arr[i].time);
            }
        },
        handleFilter(event) {
            this.goSearch();
        },
        getUsername() {
            let _this = this;
            _this.$http.get(domain.viewOneUser, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        _this.username = res.data.data.username;
                    }
                });
        },
        goApply(row, index) {
            let _this = this;
            this.$prompt('请输入您的申请理由', '请填写申请表单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                })
                .then(({ value }) => {
                    let post_data = {
                        id: -1,
                        course_id: row.id,
                        course_name: row.name,
                        course_number: row.number,
                        applicant: {
                            user_number: _this.user.number,
                            user_name: _this.username
                        },
                        reason: value,
                        school_year: row.school_year,
                        term: row.term,
                        status: "待审核"
                    }
                    this.SubmitApply(post_data);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '您已取消输入'
                    });
                });
        },
        SubmitApply(post_data) {
            let _this = this;
            // console.log('post data', post_data);
            this.$http.post(domain.student_apply_add, post_data)
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        _this.$alert('申请成功', '选课申请操作告知', {
                            confirmButtonText: '确定',
                            closable: false,
                            callback: action => {
                                _this.$router.go(0);
                            }
                        })
                    } else {
                        _this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
                })
                .catch((err) => {
                    _this.$message({
                        message: err,
                        type: 'error'
                    })
                });
        },
        selectReset() {
            this.all_course = this.almost_all_course;
        },
        goSearch() {
            this.all_course = this.almost_all_course;
            let filter_course = [];
            for (let i = 0; i < this.all_course.length; i++) {
                let usernames = "";
                let class_time = [];
                for (let j = 0; j < this.all_course[i].userInfo.length; j++) {
                    usernames += " " + this.all_course[i].userInfo[j].user_name;
                    // usernames.push(this.all_course[i].userInfo[j].user_name);
                }
                for (let j = 0; j < this.all_course[i].time.length; j++) {
                    class_time.push(this.all_course[i].time[j].week_day + '[' + this.all_course[i].time[j].time + ']');
                }
                filter_course.push({
                    name: this.all_course[i].name,
                    number: this.all_course[i].number,
                    academy: this.all_course[i].academy,
                    majorList: this.all_course[i].majorList,
                    user_name: usernames,
                    class_time: class_time,
                    classroom: this.all_course[i].classroom.classroom_name
                })
            }
            // console.log(filter_course);
            let filted_course = [];

            if (this.searchContent) {
                filter_course = filter_course.filter(item =>
                        (item.name.indexOf(this.searchContent) > -1) || (item.number.indexOf(this.searchContent) > -1) ||
                        (item.user_name.indexOf(this.searchContent) > -1) || (item.class_time.indexOf(this.searchContent) > -1) ||
                        (item.classroom.indexOf(this.searchContent) === 0)
                    )
                    // console.log(filter_course);
                for (let i = 0; i < filter_course.length; i++) {
                    for (let j = i; j < this.all_course.length; j++) {
                        if (filter_course[i].number === this.all_course[j].number) {
                            filted_course.push(this.all_course[j]);
                        }
                    }
                }
                // console.log(filted_course);
                this.all_course = filted_course;
            } else {
            }
        },
        getAllApply() {
            let _this = this;
            this.all_apply = [];
            this.$http.get(domain.student_apply_view, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        // for(let i = 0; i < res.data.data.length; i++) {

                        // }
                        _this.all_apply = res.data.data;
                    }
                })
                .catch(catch_err);
        },
        getMajors() {
            let _this = this;
            _this.$http
                .post(domain.get_academy, {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        //this.college_major = res.data.data;
                        let data = res.data.data;
                        for (let i = 0; i < data.length; i++) {
                            let academy_key = Object.keys(data[i]["idAndAcademyName"]);
                            // console.log(academy_key, data[i]["idAndAcademyName"][academy_key]);
                            this.college_major.push({
                                academy: data[i]["idAndAcademyName"][academy_key],
                                major: []
                            });
                            for (let j = 0; j < data[i]["idAndMajorNames"].length; j++) {
                                let major_key = Object.keys(data[i]["idAndMajorNames"][j]);
                                // console.log(major_key);
                                this.college_major[i].major.push(data[i]["idAndMajorNames"][j][major_key]);
                            }
                        }
                        // console.log(this.college_major);
                    }
                })
                .catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err
                    })
                });
        },
        TagCourseByMajor() {
            // console.log(this.all_course);
            let total_college_number = this.college_major.length;
            for (let i = 0; i < this.all_course.length; i++) {
                let majors = this.all_course[i].majorList;
                let college_name = [];
                for (let j = 0; j < majors.length; j++) {
                    let major_ = majors[j];
                    for (let k = 0; k < this.college_major.length; k++) {
                        if (this.college_major[k].major.indexOf(major_) > -1) {
                            if (college_name.indexOf(this.college_major[k].academy) === -1) {
                                college_name.push(this.college_major[k].academy);
                            }
                        }
                    }
                }
                if (college_name.length === total_college_number) {
                    this.all_course[i].major_tag = "通识课程";
                    this.all_course[i].majorList = ["通识课程"];
                } else if (college_name.length === 1 && majors.length === 1) {
                    this.all_course[i].major_tag = "专业课程";
                } else {
                    this.all_course[i].major_tag = "面向部分专业课程";
                }
            }
            // console.log(this.all_course);
        },
        getSchoolYear() {
            let _this = this;
            this.semester_options = [];
            this.$http.get(domain.get_permission, { params: {} })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.code == 1) {
                        this.status = res.data.data[0].status;
                        if (res.data.data[0].status === 0) { //选课关闭
                            this.permission = false;
                        } else if (res.data.data[0].status === 1) { //一轮开始
                            this.permission = false;
                        } else if (res.data.data[0].status === 2) { //一轮关闭
                            this.permission = false;
                        } else if (res.data.data[0].status === 3) { //二轮开始
                            this.permission = true;
                        } else if (res.data.data[0].status === 4) { //二轮结束
                            this.permission = false;
                        } else {
                            // console.log('还有一种status？');
                        }
                    }
                })
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}