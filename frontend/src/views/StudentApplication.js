import ApplicationTable from "@/components/ApplicationTable";
import domain from "../util/domain.js";
import default_table_data from "@/util/default_table_data";
import { error_msg, message_err, success_msg } from "@/util/util";

export default {
    name: "StudentApplication",
    components: {
        ApplicationTable
    },
    created() {
        this.getApplication();
        this.audit = true;
        // console.log(this.tables)
    },
    data() {
        return {
            tables: [],
            audit: false,
            processed_table: [],
            unprocessed_table: [],
            tableData: [
                default_table_data.default_id,
                default_table_data.course_id,
                default_table_data.course_name,
                default_table_data.course_number,
                default_table_data.default_applicant,
                default_table_data.default_reason,
                {
                    dataItem: 'school_year',
                    dataName: 'school_year'
                },
                default_table_data.default_term,
                default_table_data.default_status,
            ],
            briefData: [
                default_table_data.default_id,
                default_table_data.course_name,
                default_table_data.default_applicant,
                default_table_data.default_reason,
                default_table_data.default_status,
            ]
        };
    },
    methods: {
        convertApplication(app) {
            return {
                applicant: app.applicant.user_name,
                id: app.id,
                course_id: app.course_id,
                course_name: app.course_name,
                course_number: app.course_number,
                reason: app.reason,
                school_year: app.school_year,
                term: app.term,
                status: app.status
            }
        },
        showProcessed() {
            this.audit = false;
            this.tables = [];
            let len = this.processed_table.length;
            for (let i = 0; i < len; i++) {
                let app = this.processed_table[i];
                this.tables.push(this.convertApplication(app));
            }
        },
        showNotProcessed() {
            this.audit = true;
            this.tables = [];
            let len = this.unprocessed_table.length;
            for (let i = 0; i < len; i++) {
                let app = this.unprocessed_table[i];
                // this.tables.push(this.convertApplication(app));
                this.tables.push({
                    applicant: app.applicant.user_name,
                    id: app.id,
                    course_id: app.course_id,
                    course_name: app.course_name,
                    course_number: app.course_number,
                    reason: app.reason,
                    school_year: app.school_year,
                    term: app.term,
                    status: app.status
                })
            }
            // console.log(this.tables);
        },
        getApplicationById(id) {
            let len = this.unprocessed_table.length;
            for (let i = 0; i < len; i++) {
                if (id === this.unprocessed_table[i].id)
                    return this.unprocessed_table[i]
            }
        },
        postApplication(application) {
            let _this = this
            _this.$http.post(domain.student_apply_change, application)
                .then((res) => {
                    // console.log(res)
                    if (res.data.code === 1) {
                        this.getApplication()
                        this.$message(success_msg(res))
                    }
                })
                .catch((err) => {
                    _this.$notify(message_err(err))
                })
        },
        approveApplication(app) {
            let application = this.getApplicationById(app.app_id);
            // console.log(application);
            this.$http.post(domain.student_apply_realize, application)
                .then((res) => {
                    // console.log(res)
                    if (res.data.code === 1) {
                        application.status = "审核通过";
                        this.postApplication(application);
                        this.$message(success_msg(res))
                    } else this.$message(error_msg(res))
                })
                .catch((err) => {
                    _this.$notify(message_err(err))
                })
        },
        rejectApplication(res) {
            let app = this.getApplicationById(res.app_id);
            app.status = "审核未通过";
            this.postApplication(app);
        },
        filterApplication(app) {
            if (app.status === "待审核") {
                this.unprocessed_table.push(app)
            } else {
                this.processed_table.push(app)
            }
        },
        getApplication() {
            let _this = this;

            // // ------------------ fake data-----------------------
            // let applications = fake_data.all_student_application.data;
            this.unprocessed_table = []
            this.processed_table = []
                // this.tables = []
                // applications.forEach(this.filterApplication)
                // // ------------------ fake data-----------------------

            _this.$http.get(domain.all_student_apply_view, { params: {} })
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        let applications = res.data.data;

                        // this.unprocessed_table = []
                        // this.processed_table = []
                        // this.tables = []
                        // applications.forEach(this.filterApplication)
                        // this.$message(success_msg(res))
                        for (let i = 0; i < applications.length; i++) {
                            let application = applications[i];
                            if (application.status === "待审核") {
                                this.unprocessed_table.push(application);
                            } else {
                                this.processed_table.push(application);
                            }
                        }
                        this.showNotProcessed();
                    }
                })
                .catch((err) => {
                    // console.log("in get");
                    _this.$message(message_err(err))
                });
            // console.log(this.unprocessed_table, this.processed_table);

        },
        handleTab(tab) {
            // console.log(tab, tab.label);
            if (tab.label === "unprocessed") {
                this.showNotProcessed();
            } else {
                this.showProcessed();
            }
        }
    }
}