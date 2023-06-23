import CourseTable from "@/components/CourseTable";
import CourseCsv from "@/components/CourseCsv";
import SearchCourse from "@/components/SearchCourse";
import { course_addition, error_msg, message_err, pass, success_msg } from "@/util/util";
import domain from "@/util/domain";

export default {
    name: "manage-course",
    components: {
        CourseTable,
        CourseCsv,
        SearchCourse
    },
    data() {
        return {
            tables: [],
            addedCourse: {},
            college_major: [],
        }
    },
    created() {
        this.getMajors();
        this.getCourses();
    },
    methods: {
        toAddCourse() {
            let _this = this
            _this.$router
                .push({ name: 'AddCourse', params: { from: 'ManageCourse' } })
                .then(pass);
        },
        getSearched(params) {
            this.tables = []
            params.forEach((item) => {
                let addition = course_addition(item)
                this.tables.push(addition)
            })
        },
        findCourse(course_id) {
            let len = this.tables.length;
            let selected_course = {}
            for (let i = 0; i < len; i++) {
                if (this.tables[i].id === course_id) {
                    selected_course = this.tables[i]
                    break
                }
            }
            return selected_course
        },
        getCourses() {
            let _this = this
            this.tables = [];

            _this.$http
                .get(domain.get_all_course, { params: {} })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        let this_tables = res.data.data
                        this_tables.forEach(function(each_table) {
                            let addition = course_addition(each_table)
                            // console.log(addition)
                            _this.tables.push(addition);
                        })
                    } else _this.$message(error_msg(res))
                    // console.log(this.tables);
                    this.TagCourseByMajor();
                })
                .catch((err) => {
                    _this.$message(message_err(err))
                });
        },
        deleteCourse(course_number) {
            // console.log(course_number)
            let selected_course = this.findCourse(course_number)
            let post_data = {
                id: selected_course.id,
                name: selected_course.name,
                number: selected_course.number,
                academy: selected_course.academy,
                hour: selected_course.hour,
                credit: selected_course.credit,
                introduction: selected_course.introduction,
                userInfo: selected_course.userInfo,
                timeInfo: selected_course.timeInfo,
                //location: selected_course.location,
                capacity: selected_course.capacity,
                majorList: selected_course.majorList,
                classroom: selected_course.classroom
            }
            // console.log(post_data);
            let _this = this
            _this.$http.post(domain.course_delete, post_data, {})
                .then((res) => {
                    // console.log(res)
                    if (res.data.code === 1) {
                        _this.getCourses();
                        _this.$notify(success_msg(res))
                    } else _this.$notify(error_msg(res))
                })
                .catch((err) => {
                    _this.$message(message_err(err));
                });
        },
        modifyCourse(course_number) {
            // console.log(course_number)
            let selected_course = this.findCourse(course_number)
            this.$router
                .push({
                    name: "ModifyCourse",
                    params: { passing_data: selected_course, from: "ManageCourse" }
                })
                .then(pass)
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
            // console.log(this.college_major);
            let total_college_number = this.college_major.length;
            for (let i = 0; i < this.tables.length; i++) {
                let majors = this.tables[i].majorList;
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
                    this.tables[i].major_tag = "通识课程";
                    this.tables[i].majors = "通识课程";
                } else if (college_name.length === 1 && majors.length === 1) {
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
            return this.$store.state.user;
        }
    }
}