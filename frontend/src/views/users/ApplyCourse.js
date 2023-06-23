import CourseTable from "@/components/CourseTable";
import { catch_err, course_addition } from "@/util/util";
import domain from "@/util/domain";

export default {
    name: "apply-course",
    components: {
        CourseTable
    },
    data() {
        return {
            username: "",
            addedCourse: {
                name: "",
                number: 0,
                academy: "",
                hour: "",
                credit: "",
                userInfo: [],
                timeInfo: [],
                introduction: "",
                location: "",
                capacity: "",
                type: ""
            },
            tables: [],
            tableData: [{
                dataItem: 'name',
                dataName: 'course'
            }, {
                dataItem: 'number',
                dataName: 'course id'
            }, {
                dataItem: 'academy',
                dataName: 'academy'
            }, {
                dataItem: 'hour',
                dataName: 'hour'
            }, {
                dataItem: 'credit',
                dataName: 'credit'
            }, {
                dataItem: 'userinfo',
                dataName: 'teacher(s)'
            }, {
                dataItem: 'timeinfo',
                dataName: 'class time'
            }, {
                dataItem: 'introduction',
                dataName: 'introduction'
            }, {
                dataItem: 'location',
                dataName: 'location'
            }, {
                dataItem: 'capacity',
                dataName: 'capacity'
            }, {
                dataItem: 'majors',
                dataName: 'limits'
            }],
            college_major: [],
        }
    },
    mounted: function() {
        this.getMajors();
        this.getCourses();
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            let _this = this;

            _this.$http
                .get(domain.viewOneUser, { params: { number: _this.user.number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        this.username = res.data.data.username;
                    }
                })
                .catch(catch_err)

        },
        toAddCourse() {
            let _this = this
            _this.$router.push({ name: "AddCourse", params: { from: "ApplyCourse" } });
        },
        gotoHome() {
            this.$router.push('/home')
                .then();
        },
        findCourse(course_number) {
            let len = this.$data.tables.length;
            let selected_course = {}
            for (let i = 0; i < len; i++) {
                if (this.$data.tables[i].number === course_number) {
                    selected_course = this.$data.tables[i]
                    break
                }
            }
            return selected_course
        },
        getCourses() {
            let _this = this
            let user = {
                user_name: this.user.name,
                user_number: this.user.number
            }
            let number = this.user.number;
            this.$data.tables = [];
            _this.$http
                .get(domain.user_course, { params: { user_number: number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        let this_tables = res.data.data;
                        // console.log(this_tables);
                        this_tables.forEach(function(each_table) {
                            let addition = course_addition(each_table)
                            _this.tables.push(addition);
                            // console.log(_this.tables);
                        });
                        // console.log(_this.tables);
                        this.TagCourseByMajor();
                    } else {
                        _this.$message({
                            type: 'error',
                            message: res.data.msg,
                            duration: 1800
                        })
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err,
                        duration: 1800
                    })
                });

        },
        deleteCourse(course_number) {
            // console.log(course_number)

            let selected_course = this.findCourse(course_number)

            // TODO: get from local
            let this_applicant = {
                user_number: this.user.number,
                user_name: this.username
            }
            // console.log(this.user)
            // console.log(selected_course);
            let post_data = {
                id: "-1",
                course_id: selected_course.id,
                name: selected_course.name,
                number: selected_course.number,
                academy: selected_course.academy,
                hour: selected_course.hour,
                credit: selected_course.credit,
                applicant: this_applicant,
                introduction: selected_course.introduction,
                userInfo: selected_course.userInfo,
                timeInfo: selected_course.timeInfo,
                classroom: selected_course.classroom,
                status: "待审核",
                capacity: selected_course.capacity,
                type: "delete",
                majorList: selected_course.majorList,
                selected_number: selected_course.selectedNumber,
                school_year: selected_course.year,
                term: selected_course.term,
            }
            // console.log(post_data)

            let _this = this
            _this.$http.post(domain.teacher_add_apply, post_data, {})
                .then((res) => {
                    if (res.data.code === 1) {
                        _this.$notify({
                            type: 'success',
                            message: "删除请求增加成功"
                        });
                    }
                })
        },
        modifyCourse(course_number) {
            // console.log(course_number)
            let selected_course = this.findCourse(course_number)
            this.$router
                .push({
                    name: "ModifyCourse",
                    params: { passing_data: selected_course, from: "ApplyCourse" }
                })
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
                    for(let i = 0; i < data.length; i++) {
                        let academy_key = Object.keys(data[i]["idAndAcademyName"]);
                        // console.log(academy_key,data[i]["idAndAcademyName"][academy_key]);
                        this.college_major.push({
                            academy: data[i]["idAndAcademyName"][academy_key],
                            major: []
                        });
                        for(let j = 0; j < data[i]["idAndMajorNames"].length; j++) {
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
            // console.log(this.college_major);
            let total_college_number = this.college_major.length;
            for(let i = 0; i < this.tables.length; i++) {
                let majors = this.tables[i].majorList;
                let college_name = [];
                for(let j = 0; j < majors.length; j++) {
                    let major_ = majors[j];
                    for(let k = 0; k < this.college_major.length; k++) {
                        if(this.college_major[k].major.indexOf(major_) > -1) {
                            if(college_name.indexOf(this.college_major[k].academy) === -1) {
                                college_name.push(this.college_major[k].academy);
                            }
                        }
                    }
                }
                if(college_name.length === total_college_number) {
                    this.tables[i].major_tag = "通识课程";
                    this.tables[i].majors = "通识课程";
                } else if(college_name.length === 1 && majors.length === 1) {
                    this.tables[i].major_tag = "专业课程";
                } else {
                    this.tables[i].major_tag = "面向部分专业课程";
                }
            }
            // console.log(this.tables);
        }
    },
    computed: {
        user() {
            // console.log(this.$store.state.user);
            return this.$store.state.user; //{number:221314, password:'123456g'};
        }
    }
}