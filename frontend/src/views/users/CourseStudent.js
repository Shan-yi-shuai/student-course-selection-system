import CourseList from "@/components/CourseList";
import domain from "@/util/domain";
import { catch_err, filterUser, timeinfo_to_string, userinfo_to_string } from "@/util/util";
export default {
    name: "CourseStudent",
    components: {
        CourseList
    },
    created() {
        this.getSchoolYear();
        this.getCourses();
    },
    data() {
        return {
            courses: [],
            school_year: 0,
            term: 0
        }
    },
    methods: {
        unzip_app(app) {
            let users = filterUser(app.userInfo)
            let teacherInfo = users.teacherInfo
            let studentInfo = users.studentInfo

            let ui = userinfo_to_string(teacherInfo)

            let course = {
                id: app.number,
                course_name: app.name,
                teachers: ui,
                hour: app.hour,
                credit: app.credit,
                introduction: app.introduction,
                timeIndo: timeinfo_to_string(app.timeInfo),
                majorList: app.majorList,
                location: app.location,
                capacity: app.capacity,
                studentInfo: studentInfo
            }
            this.courses.push(course)
        },
        unzip_res(res) {
            // console.log(res.data)
            if (res.code !== 1) {
                // console.log(res.msg)
                return
            }
            let courses = res.data;
            courses.forEach(this.unzip_app)
        },
        getCourses() {
            // this.unzip_res(fake_data.get_teacher_application);
            // console.log(domain.teacher_personal_apply);
            let user_number = this.user.number;
            this.courses = [];
            let _this = this
            _this.$http.get(domain.user_course, { params: { user_number } })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            let course = res.data.data[i];
                            let teacher = [];
                            let students = [];
                            let users = JSON.parse(JSON.stringify(course.userInfo));
                            // console.log(users);
                            let count = -1;
                            for (let j = 0; j < users.length; j++) {
                                count += 1;
                                if (users[j].user_number.length === 8) {
                                    teacher.push(users[j]);
                                    // users.splice(count,1);
                                    count -= 1;
                                } else {
                                    students.push(users[j])
                                }
                            }
                            let string_teacher = "";
                            for (let j = 0; j < teacher.length; j++) {
                                string_teacher += teacher[j].user_name;
                                if (j < teacher.length - 1) {
                                    string_teacher += ",";
                                }
                            }
                            // console.log('students', students, 'teacher', string_teacher);
                            if (course.school_year === this.school_year && course.term === this.term) {
                                this.courses.push({
                                    id: course.number,
                                    course_name: course.name,
                                    teachers: string_teacher,
                                    hour: course.hour,
                                    credit: course.credit,
                                    introduction: course.introduction,
                                    timeInfo: course.timeInfo,
                                    majorList: course.majorList,
                                    classroom: course.classroom.classroom_name,
                                    capacity: course.capacity,
                                    studentInfo: students
                                });
                            }
                        }
                        // console.log(this.courses);
                    }
                })
                .catch(catch_err)
        },
        getSchoolYear() {
            this.$http.get(domain.get_permission, { params: {} })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.school_year = res.data.data[0].school_year;
                        this.term = res.data.data[0].term;
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