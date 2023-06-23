import Vue from 'vue'
import Plugin from 'v-fit-columns'
import InputCapacity from "@/components/InputCapacity";
import ApplicationTable from "@/components/ApplicationTable";
import domain from "../util/domain.js"
import { error_msg, http_to_json } from "@/util/util";

Vue.use(Plugin)

export default {
    name: "teacher-application",
    components: {
        InputCapacity,
        ApplicationTable
    },
    created: function() {
        this.getApplication()
    },
    data() {
        return {
            capacity: "10",
            audit_flag: true,
            select: false,
            addedClassroom: "",
            addError: "",
            tables: [],
            audit_table: [],
            not_audit_table: []
        }
    },
    methods: {
        getApplication() {
            let _this = this
            this.not_audit_table = [];
            this.audit_table = [];
            _this.$http.get(domain.teacher_all_apply)
                .then((res) => {
                    // console.log(res)
                    let this_table = res.data.data
                    this_table.forEach((each_application) => {
                        let users = each_application.userInfo;
                        let teachers = []
                        for (let i = 0; i < users.length; i++) {
                            if (users[i].user_number.length === 8) {
                                teachers.push(users[i])
                            }
                        }
                        each_application.userInfo = teachers;
                        let addition = http_to_json(each_application)
                        // console.log(addition)
                        if (each_application.status === "待审核") {
                            _this.not_audit_table.push(addition);
                        } else {
                            _this.audit_table.push(addition);
                        }
                    })
                    // console.log(this_table)
                    this.tables = this.not_audit_table;
                })
        },
        findApplication(app_id) {
            let len = this.tables.length
            // console.log(this.tables);
            // console.log(app_id);
            for (let i = 0; i < len; i++) {
                if (this.tables[i].id === app_id.app_id) {
                    return this.tables[i]
                }
            }
            return {}
        },
        //管理员点击通过，尝试修改课程信息
        realizeApplication(app_id) {
            let application = this.findApplication(app_id)
            // console.log(application)
            let applicant = application.applicant
            application.applicant = {
                user_name: applicant.trim().split(" ")[0],
                user_number: applicant.trim().split(" ")[1]
            };
            let application1 = {
                id: application.id,
                course_id: application.course_id,
                name: application.name,
                number: application.number,
                academy: application.academy,
                hour: application.hour,
                credit: application.credit,
                applicant: application.applicant,
                introduction: application.introduction,
                userInfo: application.userInfo,
                timeInfo: application.timeInfo,
                classroom: application.classroom,
                status: application.status,
                capacity: application.capacity,
                type: application.type,
                majorList: application.majorList,
                school_year: application.school_year,
                term: application.term,
                selected_number: application.selected_number
            }
            let _this = this
            let url;
            //根据type选择不同的后端接口
            switch (application.type) {
                case "add":
                    url = domain.course_apply_add;
                    break;
                case "change":
                    url = domain.course_apply_change;
                    break;
                case "delete":
                    url = domain.course_apply_delete;
                    break;
            }
            // console.log(application1);
            _this.$http.post(url, application1, {})
                .then((res) => {
                    // console.log(res)
                    if (res.data.code === 1) {
                        //如果修改课程信息成功，则修改申请的状态
                        this.modifyApplication(application, "审核通过");
                        _this.$notify({
                            type: 'success',
                            message: "审核通过"
                        });
                        _this.$router.go(0);
                    } else
                        _this.$message(error_msg(res))
                })
                .catch((error) => { _this.$message(error_msg(error)) })

        },
        //修改申请的状态
        modifyApplication(application, status) {
            application.status = status;
            // console.log(application)
            let _this = this
            _this.$http.post(domain.teacher_change_apply, application, {})
                .then((res) => {
                    // console.log(res.data)
                    this.$router.go(0)
                        // console.log(res)
                        // if (res.data.code === 1) {} else _this.$message(error_msg(res))
                })
                .catch((err) => { _this.$message(error_msg(err)) })
            this.getApplication();
            this.audit_flag = false;

        },
        approveApplication(app_id) {
            // console.log(app_id);
            this.realizeApplication(app_id);
        },
        rejectApplication(app_id) {
            // console.log(app_id);
            let application = this.findApplication(app_id);
            let applicant = application.applicant
            application.applicant = {
                user_name: applicant.trim().split(" ")[0],
                user_number: applicant.trim().split(" ")[1]
            };
            let application1 = {
                id: application.id,
                course_id: application.course_id,
                name: application.name,
                number: application.number,
                academy: application.academy,
                hour: application.hour,
                credit: application.credit,
                applicant: application.applicant,
                introduction: application.introduction,
                userInfo: application.userInfo,
                timeInfo: application.timeInfo,
                classroom: application.classroom,
                status: application.status,
                capacity: application.capacity,
                type: application.type,
                majorList: application.majorList,
                school_year: application.school_year,
                term: application.term,
                selected_number: application.selected_number
            }
            this.modifyApplication(application1, "审核未通过")
        },
        showNotProcessed() {
            // this.getApplication();
            this.audit_flag = true;
            this.tables = this.not_audit_table;
            // console.log(this.tables);
            this.select = false;
        },
        showProcessed() {
            // this.getApplication();
            this.audit_flag = false;
            this.tables = this.audit_table;
            this.select = true;
        },
        handleTab(tab) {
            // console.log(tab, tab.label);
            if (tab.label === "unprocessed") {
                this.audit_flag = true;
                this.tables = this.not_audit_table;
            } else {
                this.audit_flag = false;
                this.tables = this.audit_table;
            }
        }
    },
    computed: {
        user() {
            // console.log(this.$store.state.user);
            return this.$store.state.user;
        }
    }
}