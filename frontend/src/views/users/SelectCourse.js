import CourseTable from "@/components/CourseTable";
import domain from "@/util/domain";
import { int_to_time, sortArray } from "@/util/util";

export default {
    name: "SelectCourse",
    component: {
        CourseTable
    },
    data() {
        return {
            permission: true,
            can_select: false,
            timeKey: false,
            tables: [],
            timeTable: [{
                    id: '1',
                    count: 1,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '2',
                    count: 2,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '3',
                    count: 3,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '4',
                    count: 4,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '5',
                    count: 5,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '6',
                    count: 6,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '7',
                    count: 7,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '8',
                    count: 8,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '9',
                    count: 9,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '10',
                    count: 10,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '11',
                    count: 11,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '12',
                    count: 12,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                },
                {
                    id: '13',
                    count: 13,
                    start: '08:00',
                    end: '08:45',
                    day1Course: "",
                    day1Room: "",
                    day2Course: "",
                    day2Room: "",
                    day3Course: "",
                    day3Room: "",
                    day4Course: "",
                    day4Room: "",
                    day5Course: "",
                    day5Room: "",
                    day6Course: "",
                    day6Room: "",
                    day7Course: "",
                    day7Room: ""
                }

            ],
            selected_course: [],
            all_course: [], // course that can be selected
            taken_course: [], // 已修
            searchContent: "", // 搜索输入框内容
            filted_course: [],
            almost_all_course: [],
            almost_taken_course: [],
            highlight_table: [],
            click_highlight_table: [],
            school_year: "",
            semester_options: [{
                value: '2018',
                label: '2018'
            }],
            status: 0,
            college_major: [],
        }
    },
    created: function() {
        this.getMajors();
        this.getClassTime();
        this.getAllCourse();
        this.getSelected();
        this.getTakenCourse();
        this.initialHighlight();
        this.getSchoolYear();
    },
    mounted: function() {},
    methods: {
        initialHighlight() {
            let row = 13,
                col = 8;
            this.highlight_table = Array(row).fill().map(() => Array(col).fill(0));
            this.click_highlight_table = Array(row).fill().map(() => Array(col).fill(0));
        },
        gotoHome() {
            let _this = this
            _this.$router.push({ name: "Home" })
                .then((res) => { console.log(res) })
        },
        getClassTime() {
            let _this = this;
            this.$http.get(domain.get_classtime)
                .then((res) => {
                    let time = res.data.data[0];
                    _this.timeTable[0].start = int_to_time(time.start1);
                    _this.timeTable[0].end = int_to_time(time.end1);
                    _this.timeTable[1].start = int_to_time(time.start2);
                    _this.timeTable[1].end = int_to_time(time.end2);
                    _this.timeTable[2].start = int_to_time(time.start3);
                    _this.timeTable[2].end = int_to_time(time.end3);
                    _this.timeTable[3].start = int_to_time(time.start4);
                    _this.timeTable[3].end = int_to_time(time.end4);
                    _this.timeTable[4].start = int_to_time(time.start5);
                    _this.timeTable[4].end = int_to_time(time.end5);
                    _this.timeTable[5].start = int_to_time(time.start6);
                    _this.timeTable[5].end = int_to_time(time.end6);
                    _this.timeTable[6].start = int_to_time(time.start7);
                    _this.timeTable[6].end = int_to_time(time.end7);
                    _this.timeTable[7].start = int_to_time(time.start8);
                    _this.timeTable[7].end = int_to_time(time.end8);
                    _this.timeTable[8].start = int_to_time(time.start9);
                    _this.timeTable[8].end = int_to_time(time.end9);
                    _this.timeTable[9].start = int_to_time(time.start10);
                    _this.timeTable[9].end = int_to_time(time.end10);
                    _this.timeTable[10].start = int_to_time(time.start11);
                    _this.timeTable[10].end = int_to_time(time.end11);
                    _this.timeTable[11].start = int_to_time(time.start12);
                    _this.timeTable[11].end = int_to_time(time.end12);
                    _this.timeTable[12].start = int_to_time(time.start13);
                    _this.timeTable[12].end = int_to_time(time.end13);
                })
        },
        getSelected() {
            let _this = this;
            this.selected_course = [];
            this.$http.get(domain.student_view_selected, { params: { number: this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            let data = res.data.data[i];
                            let users = JSON.parse(JSON.stringify(data.userInfo));
                            let count = -1;
                            // console.log(data.userInfo);
                            for (let j = 0; j < data.userInfo.length; j++) {
                                count += 1;
                                if (data.userInfo[j].user_number.length === 6) {
                                    users.splice(count, 1);
                                    count -= 1;
                                }
                            }
                            // console.log(users);
                            _this.selected_course.push({
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
                            });
                            _this.filtUserInfo(_this.selected_course[i].userInfo);
                        }

                        _this.rearrangeTime(_this.selected_course);
                        _this.TagCourseByMajor(_this.selected_course);
                        // console.log('get selected course', _this.selected_course);
                        _this.getTimetable();

                    } else {
                        _this.$message({
                            type: 'error',
                            message: res.data.msg
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
        getAllCourse() {
            let _this = this;
            this.all_course = [];
            this.$http.get(domain.student_view_to_select, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        for (let each = 0; each < res.data.data.length; each++) {
                            let data = res.data.data[each];
                            let users = JSON.parse(JSON.stringify(data.userInfo));
                            let count = -1;
                            // console.log(data.userInfo);
                            for (let j = 0; j < data.userInfo.length; j++) {
                                count += 1;
                                if (data.userInfo[j].user_number.length === 6) {
                                    users.splice(count, 1);
                                    count -= 1;
                                }
                            }
                            // console.log(users);

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
                        this.TagCourseByMajor(_this.all_course);
                        _this.rearrangeTime(_this.all_course);
                        _this.almost_all_course = _this.all_course;
                        // console.log(_this.all_course);
                        //console.log('get all selected course',_this.all_course);
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
        getTakenCourse() {
            let _this = this;
            this.taken_course = [];
            this.$http.get(domain.student_view_taken, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            let data = res.data.data[i];
                            let users = JSON.parse(JSON.stringify(data.userInfo));
                            let count = -1;
                            // console.log(data.userInfo);
                            for (let j = 0; j < data.userInfo.length; j++) {
                                count += 1;
                                if (data.userInfo[j].user_number.length === 6) {
                                    users.splice(count, 1);
                                    count -= 1;
                                }
                            }
                            // console.log(users);
                            _this.taken_course.push({
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
                            });
                            _this.filtUserInfo(_this.taken_course[i].userInfo);
                        }
                        _this.rearrangeTime(_this.taken_course);
                        _this.TagCourseByMajor(_this.taken_course);
                        // console.log('get selected course', _this.taken_course);
                        _this.almost_taken_course = _this.taken_course;

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
        selectCourse(val) { // unused
            // console.log(val)
        },
        addClass({ row, column, rowIndex, columnIndex }) {
            if (this.highlight_table[rowIndex][columnIndex] != 0) {
                return 'course-class1';
            }
            if (this.click_highlight_table[rowIndex][columnIndex] === 1) {
                return 'course-class2';
            }
        },
        handleFilter(event) {
            // console.log(event, this.searchContent);
            this.goSearch();
            //this.all_course = filter_course;
        },
        selectReset() {
            this.all_course = this.almost_all_course;
        },
        goSearch() {
            this.all_course = this.almost_all_course;
            let filter_course = [];
            //let class_time = "";
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
                // console.log('class time', class_time);
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
                // console.log('no filter');
            }
        },
        goSelect(index, row) {
            // console.log(index, row);
            //// console.log(this.all_course[index]);
            let _this = this;
            let post_data = {
                number: this.user.number,
                courseReceiver: {
                    id: row.id,
                    name: row.name,
                    number: row.number,
                    academy: row.academy,
                    hour: row.hour,
                    credit: row.credit,
                    userInfo: row.userInfo,
                    timeInfo: row.timeInfo,
                    introduction: row.introduction,
                    selectedNumber: row.selectedNumber,
                    capacity: row.capacity,
                    classroom: row.classroom,
                    majorList: row.majorList,
                    school_year: row.school_year,
                    term: row.term
                }
            };
            // console.log('received data', JSON.stringify(post_data));
            this.$http.post(domain.select_course, post_data)
                .then((response) => {
                    // console.log(response);
                    if (response.data.code == 1) {
                        _this.$alert('选课成功', '选课操作告知', {
                            confirmButtonText: '确定',
                            closable: false,
                            callback: action => {
                                _this.$router.go(0);
                            }
                        });
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
                })

        },
        goDrop(index, row) {
            // console.log(index, row);
            let _this = this;
            let post_data = {
                number: this.user.number,
                courseReceiver: {
                    id: row.id,
                    name: row.name,
                    number: row.number,
                    academy: row.academy,
                    hour: row.hour,
                    credit: row.credit,
                    userInfo: row.userInfo,
                    timeInfo: row.timeInfo,
                    introduction: row.introduction,
                    selectedNumber: row.selectedNumber,
                    capacity: row.capacity,
                    classroom: row.classroom,
                    majorList: row.majorList,
                    school_year: row.school_year,
                    term: row.term
                }
            };
            this.$http.post(domain.drop_course, post_data)
                .then((response) => {
                    // console.log(response);
                    if (response.data.code == 1) {
                        _this.$alert('退课成功', '退课操作告知', {
                            confirmButtonText: '确定',
                            closable: false,
                            callback: action => {
                                _this.$router.go(0);
                            }
                        });

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
                        // // console.log('x.week_day != week');
                        flag = 0;
                        week = x.week_day;
                        for (let k = 0; k < arr[i].time.length; k++) {
                            if (arr[i].time[k].week == x.week_day) { // week_day已经记进去了
                                // console.log('week_day已经记进去了');
                                // console.log('time 长度',arr[i].time[k].time.length);
                                if (arr[i].time[k].time.length < 3) {
                                    time_min = time_max = Number(arr[i].time[k].time);
                                } else {
                                    let tt = arr[i].time[k].time.split('-');
                                    time_min = Number(tt[0]);
                                    time_max = Number(tt[1]);
                                }
                                //console.log('time min', time_min, 'time max',time_max);
                                if (x.class_number < time_min) {
                                    time_min = x.class_number;
                                }
                                if (x.class_number > time_max) {
                                    time_max = x.class_number;
                                }
                                arr[i].time[k].time = String(time_min) + '-' + String(time_max);
                                arr[i].time[k].time_length = time_max - time_min + 1;
                                // console.log(i, 'length', arr[i].time.length, arr[i].time);
                                flag = 1;
                                break;
                            }
                        }
                        //console.log('flag', flag);
                        if (flag === 0) { // week_day未被记录
                            // time = String(time_min)+'-'+String(time_max);
                            // console.log('push before',i,'length', arr[i].time.length,arr[i].time);
                            // arr[i].time.push({
                            //     week: week,
                            //     week_day: week_day,
                            //     time: time
                            // })
                            // console.log('2',i,'length', arr[i].time.length,arr[i].time);


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
                            // console.log('really length', arr[i].timeInfo.length,arr[i].timeInfo.length === 1);
                            //if(arr[i].timeInfo.length === 1) {
                            time = String(x.class_number);
                            arr[i].time.push({
                                week: week,
                                week_day: week_day,
                                time: String(x.class_number),
                                time_length: 1,
                            })
                            time_min = time_max = x.class_number;
                            // console.log('week',week,'week_day',week_day,'time',x.class_number);
                            // console.log('1',i,'length', arr[i].time.length,arr[i].time);
                            //}
                        }
                    } else {
                        // console.log('before',time_min,time_max);
                        if (x.class_number < time_min) {
                            time_min = x.class_number;
                        }
                        if (x.class_number > time_max) {
                            time_max = x.class_number;
                        }
                        // console.log('after',time_min,time_max);
                        // console.log('length',arr[i].time.length);
                        arr[i].time[arr[i].time.length - 1].time = String(time_min) + '-' + String(time_max);
                        arr[i].time[arr[i].time.length - 1].time_length = time_max - time_min + 1;
                        // console.log(i,'length', arr[i].time.length,arr[i].time);
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
            }
        },
        filtUserInfo(userInfo) {
            // console.log(userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                if (userInfo[i].user_number === this.user.number) {
                    userInfo.splice(i, 1);
                }
            }
            // console.log( userInfo);
        },
        getTimetable() {
            for (let i = 0; i < this.selected_course.length; i++) {
                for (let j = 0; j < this.selected_course[i].time.length; j++) {
                    let day = this.selected_course[i].time[j].week_day;
                    let time = this.selected_course[i].time[j].time.split('-');
                    let time_list = [];
                    if (time.length > 1) {
                        let min = Number(time[0]),
                            max = Number(time[1]);
                        let tmp = min;
                        for (let k = min; k <= max; k++) {
                            time_list.push(k);
                        }
                    } else {
                        time_list.push(Number(time[0]));
                    }
                    this.selected_course[i].time[j].time_list = time_list;
                    let key_course = "",
                        key_room = "",
                        col_index = 0;
                    switch (day) {
                        case '一':
                            key_course = "day1Course";
                            key_room = "day1Room";
                            col_index = 2;
                            break;
                        case '二':
                            key_course = "day2Course";
                            key_room = "day2Room";
                            col_index = 3;
                            break;
                        case '三':
                            key_course = "day3Course";
                            key_room = "day3Room";
                            col_index = 4;
                            break;
                        case '四':
                            key_course = "day4Course";
                            key_room = "day4Room";
                            col_index = 5;
                            break;
                        case '五':
                            key_course = "day5Course";
                            key_room = "day5Room";
                            col_index = 6;
                            break;
                        case '六':
                            key_course = "day6Course";
                            key_room = "day6Room";
                            col_index = 7;
                            break;
                        case '日':
                            key_course = "day7Course";
                            key_room = "day7Room";
                            col_index = 1;
                            break;
                        default:
                            key_course = "day7Course";
                            key_room = "day7Room";
                            col_index = 1;
                            break;
                    }


                    for (let k = 0; k < time_list.length; k++) {
                        if (k === 0) {
                            this.highlight_table[time_list[0] - 1][col_index] = time_list.length;
                        } else {
                            this.highlight_table[time_list[k] - 1][col_index] = -1;
                        }
                        switch (time_list[k]) {
                            case 1:
                                {
                                    this.timeTable[0][key_course] = this.selected_course[i].name;
                                    this.timeTable[0][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 2:
                                {
                                    this.timeTable[1][key_course] = this.selected_course[i].name;
                                    this.timeTable[1][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 3:
                                {
                                    this.timeTable[2][key_course] = this.selected_course[i].name;
                                    this.timeTable[2][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 4:
                                {
                                    this.timeTable[3][key_course] = this.selected_course[i].name;
                                    this.timeTable[3][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 5:
                                {
                                    this.timeTable[4][key_course] = this.selected_course[i].name;
                                    this.timeTable[4][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 6:
                                {
                                    this.timeTable[5][key_course] = this.selected_course[i].name;
                                    this.timeTable[5][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 7:
                                {
                                    this.timeTable[6][key_course] = this.selected_course[i].name;
                                    this.timeTable[6][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 8:
                                {
                                    this.timeTable[7][key_course] = this.selected_course[i].name;
                                    this.timeTable[7][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 9:
                                {
                                    this.timeTable[8][key_course] = this.selected_course[i].name;
                                    this.timeTable[8][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 10:
                                {
                                    this.timeTable[9][key_course] = this.selected_course[i].name;
                                    this.timeTable[9][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 11:
                                {
                                    this.timeTable[10][key_course] = this.selected_course[i].name;
                                    this.timeTable[10][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 12:
                                {
                                    this.timeTable[11][key_course] = this.selected_course[i].name;
                                    this.timeTable[11][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                            case 13:
                                {
                                    this.timeTable[12][key_course] = this.selected_course[i].name;
                                    this.timeTable[12][key_room] = this.selected_course[i].classroom.classroom_name;
                                    break;
                                }
                        }
                    }
                    // console.log(this.timeTable);
                }

            }

        },
        arraySpanMethod({ row, col, rowIndex, columnIndex }) {
            if (this.highlight_table[rowIndex][columnIndex] > 0) {
                return {
                    rowspan: this.highlight_table[rowIndex][columnIndex],
                    colspan: 1
                }
            } else if (this.highlight_table[rowIndex][columnIndex] == -1) {
                return {
                    rowspan: 0,
                    colspan: 0
                }
            }
        },
        course_click(row, col, evt) {
            // console.log(row, col, evt);
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 8; j++) {
                    this.click_highlight_table[i][j] = 0;
                }
            }
            for (let i = 0; i < row.time.length; i++) {
                // console.log(row.time[i]);
                let time_list = [];
                let day = row.time[i].week;
                let arr = row.time[i].time.split('-');
                if (row.time[i].time.length > 1) {
                    let min = Number(arr[0]),
                        max = Number(arr[1]);
                    let tmp = min;
                    for (let k = min; k <= max; k++) {
                        time_list.push(k);
                    }
                } else {
                    time_list.push(Number(row.time[i].time));
                }
                let col_index = 0;
                if (day == 7) {
                    col_index = 1;
                } else {
                    col_index = day + 1;
                }
                for (let j = 0; j < time_list.length; j++) {
                    this.click_highlight_table[time_list[j] - 1][col_index] = 1;
                }
            }
            let row_index = 1;
            this.timeTable[row_index].day1Course = " ";
            // Vue.set(this.timeTable,row_index,this.timeTable[row_index]);
            this.timeKey = !this.timeKey;
            // console.log(this.timeKey);
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
                            this.permission = true;
                            this.can_select = false;
                        } else if (res.data.data[0].status === 1) { //一轮开始
                            this.permission = true;
                            this.can_select = true;
                        } else if (res.data.data[0].status === 2) { //一轮关闭
                            this.permission = true;
                            this.can_select = false;
                        } else if (res.data.data[0].status === 3) { //二轮开始
                            this.permission = true;
                            this.can_select = true;
                        } else if (res.data.data[0].status === 4) { //二轮结束
                            this.permission = true;
                            this.can_select = false;
                        } else {
                            // console.log('还有一种status？');
                        }
                        // console.log(this.permission);
                        let this_year = res.data.data[0].school_year;
                        let number_year = Number(this_year) % 100; // 今年
                        let student_year = Math.floor(this.user.number / 10000);
                        for (let i = 0; i <= number_year - student_year; i++) {
                            _this.semester_options.push({
                                value: String(Number(this_year) - i),
                                label: String(Number(this_year) - i),
                                children: [{
                                    value: 1,
                                    label: "第一学期"
                                }, {
                                    value: 2,
                                    label: "第二学期"
                                }]
                            })
                        }
                        // console.log(_this.semester_options);
                    }
                })
        },
        changeSemester() {
            // console.log(this.school_year);
            this.taken_course = this.almost_taken_course;
        },
        takenSearch() {
            // console.log(this.taken_course);
            this.taken_course = this.almost_taken_course;
            let year = this.school_year[0];
            let term = this.school_year[1];
            // console.log(year, term);
            let arr = JSON.parse(JSON.stringify(this.taken_course));
            let j = -1;
            for (let i = 0; i < this.taken_course.length; i++) {
                j += 1;
                // console.log(this.taken_course[i].school_year, this.taken_course[i].term);
                if (this.taken_course[i].school_year != year || this.taken_course[i].term != term) {
                    // console.log('no');
                    arr.splice(j, 1);
                    j -= 1;
                }
            }
            // console.log(arr);
            this.taken_course = arr;
        },
        takenReset() {
            this.taken_course = this.almost_taken_course;
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
        TagCourseByMajor(courses) {
            // console.log(courses);
            let total_college_number = this.college_major.length;
            for (let i = 0; i < courses.length; i++) {
                let majors = courses[i].majorList;
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
                    courses[i].major_tag = "通识课程";
                    courses[i].majorList = ["通识课程"];
                } else if (college_name.length === 1 && majors.length === 1) {
                    courses[i].major_tag = "专业课程";
                } else {
                    courses[i].major_tag = "面向部分专业课程";
                }
            }
            // console.log(courses);
        }
    },
    computed: {
        user() {
            // console.log(this.$store.state.user);
            return this.$store.state.user;
        }
    }
}