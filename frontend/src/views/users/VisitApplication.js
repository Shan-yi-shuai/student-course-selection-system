import ApplicationTable from "@/components/ApplicationTable";
import domain from "../../util/domain.js";
import { catch_err } from "@/util/util";

export default {
    name: "VisitApplication",
    components: {
        ApplicationTable
    },
    data() {
        return {
            tables: [],
            deletable: true,
            select: false,

            not_audit_table: [],
            audit_table: [],
            error_msg: ""
        }
    },
    created() {
        this.getApplication()
    },
    methods: {
        getApplication() {
            this.not_audit_table = [];
            this.audit_table = [];
            let _this = this;
            _this.$http
                .get(domain.teacher_personal_apply, { params: { number: this.user.number } })
                .then((res) => {
                    // console.log(res);
                    let this_table = res.data.data;
                    this_table.forEach((each_application) => {
                        // let addition = http_to_json(each_application);
                        if (each_application.status === "待审核") {
                            _this.not_audit_table.push(each_application)
                        } else {
                            _this.audit_table.push(each_application)
                        }
                    })
                    this.tables = this.not_audit_table;
                    // console.log(this.tables);
                })
                .catch(catch_err)

        },
        showProcessed() {
            this.deletable = false;
            this.select = true;
            this.tables = this.audit_table;
        },
        showNotProcessed() {
            this.deletable = true;
            this.select = false;
            this.tables = this.not_audit_table;
        },
        findApplication(app_id) {
            let len = this.tables.length
            for (let i = 0; i < len; i++) {
                if (this.tables[i].id === app_id) {
                    return this.tables[i]
                }
            }
            return {}
        },
        fresh_app(res) {
            // console.log(res);
            if (res.data.code === 1) {
                // console.log(res.data.msg)
                this.getApplication()
            } else {
                // console.log(res.data.msg)
            }
        },
        recallApplication(id) {
            // console.log(id, this.tables[id.app_id - 1]);
            let application = {
                id: this.tables[id].id,
                name: this.tables[id].name,
                number: this.tables[id].number,
                academy: this.tables[id].academy,
                hour: this.tables[id].hour,
                credit: this.tables[id].credit,
                applicant: this.userInfo[0],
                introduction: this.tables[id].introduction,
                userInfo: this.tables[id].userInfo,
                timeInfo: this.tables[id].timeInfo,
                majorList: this.tables[id].majorList,
            }
            // console.log(application);
            this.$http.post(domain.teacher_personal_delete, application, {})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code === 1) {
                        // console.log(res.data.msg)
                        this.getApplication()
                    }
                })
                .catch(catch_err)
        },
        handleTab(tab) {
            // console.log(tab, tab.label);
            if (tab.label === "unprocessed") {
                this.deletable = true;
                this.tables = this.not_audit_table;
            } else {
                this.deletable = true;
                this.tables = this.audit_table;
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}