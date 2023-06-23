import InputCredit from "@/components/InputCredit";
import fake_data from "@/util/fake_data";
export default {
    name: "OpenCourse",
    components:{
        InputCredit
    },
    created() {
        this.getCourses()
    },
    data(){
        return {
            c:0,
            courses:[],
            students:[]
        }
    },
    methods:{
        getCourses(){
            let res = {
                code:"1",
                data:[
                    {},
                    {}
                ],
                msg:"msg"
            }
            this.courses = res.data
        },
        getStudents(course){
            // console.log(course)
            let res = fake_data.course_students
            this.students = res.data
        },
        viewStudents(){
            // console.log("all students")
        },

        //debug func
        __(res){
            this.c = res.data
            // console.log(this.c)
        }
    }
}