import domain from "../util/domain.js"

export default {
    name: "manage-select-permission",
    components: {},
    data() {
        return {
            status: 0,
            statusMsg: "",
            open: false,
            time: [],
            options: [],
            // options: [{
            //     value: '2018-2019',
            //     label: '2018-2019',
            //     children: [{
            //         value: '1',
            //         label: '第一学期',
            //     }, {
            //         value: '2',
            //         label: '第二学期',
            //     }]
            // }, {
            //     value: '2019-2020',
            //     label: '2019-2020',
            //     children: [{
            //         value: '1',
            //         label: '第一学期',
            //     }, {
            //         value: '2',
            //         label: '第二学期',
            //     }]
            // }, {
            //     value: '2020-2021',
            //     label: '2020-2021',
            //     children: [{
            //         value: '1',
            //         label: '第一学期',
            //     }, {
            //         value: '2',
            //         label: '第二学期',
            //     }]
            // }, {
            //     value: '2021-2022',
            //     label: '2021-2022',
            //     children: [{
            //         value: '1',
            //         label: '第一学期',
            //     }, {
            //         value: '2',
            //         label: '第二学期',
            //     }]
            // }],
        }
    },
    mounted: function() {
        this.getPermission();
    },
    methods: {
        initialization() {
            this.status = 0;
            this.changePermission();
        },
        next() {
            // console.log(this.value)
            if (this.status++ > 3) this.status = 4;
            this.changePermission();
        },
        changeTime() {
            this.changePermission();
            // console.log(this.time);
        },
        changePermission() {
            let _this = this;
            let permission = {
                status: this.status,
                school_year: parseInt(this.time[0].slice(0, 4)),
                term: parseInt(this.time[1])
            };
            // console.log(permission);
            this.$http.post(domain.permission_change, permission, {})
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.code === 1) {
                        this.status = res.data.data.status;
                        let school_year = res.data.data.school_year.toString() + "-" + (res.data.data.school_year + 1).toString();
                        let term = res.data.data.term.toString();
                        this.time = [school_year, term];
                        let this_year = res.data.data.school_year;
                        this.options = [{
                            value: String(this_year) + '-' + String(this_year + 1),
                            label: String(this_year) + '-' + String(this_year + 1),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 1) + '-' + String(this_year + 2),
                            label: String(Number(this_year) + 1) + '-' + String(this_year + 2),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 2) + '-' + String(this_year + 3),
                            label: String(Number(this_year) + 2) + '-' + String(this_year + 3),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 3) + '-' + String(this_year + 4),
                            label: String(Number(this_year) + 3) + '-' + String(this_year + 4),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }]
                        // console.log(this.time);
                    } else {
                        _this.$message({
                            type: "error",
                            message: res.data.msg,
                        });
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: "error",
                        message: err,
                    });
                })
        },
        getPermission() {
            let _this = this;
            this.$http.get(domain.get_permission, { params: {} })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.status = res.data.data[0].status;
                        let school_year = res.data.data[0].school_year.toString() + "-" + (res.data.data[0].school_year + 1).toString();
                        let term = res.data.data[0].term.toString();
                        this.time = [school_year, term];
                        this.open = this.status == 0 ? false : true;
                        let this_year = res.data.data[0].school_year;
                        this.options = [{
                            value: String(this_year) + '-' + String(this_year + 1),
                            label: String(this_year) + '-' + String(this_year + 1),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 1) + '-' + String(this_year + 2),
                            label: String(Number(this_year) + 1) + '-' + String(this_year + 2),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 2) + '-' + String(this_year + 3),
                            label: String(Number(this_year) + 2) + '-' + String(this_year + 3),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }, {
                            value: String(Number(this_year) + 3) + '-' + String(this_year + 4),
                            label: String(Number(this_year) + 3) + '-' + String(this_year + 4),
                            children: [{
                                value: "1",
                                label: "第一学期"
                            }, {
                                value: "2",
                                label: "第二学期"
                            }]
                        }]
                    } else {
                        _this.$message({
                            type: "error",
                            message: res.data.msg,
                            duration: 1500
                        });
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: "error",
                        message: err,
                        duration: 1500
                    });
                })
        },
        // openPermission() {
        //     let post_data = {
        //         select_course: 'open'
        //     };
        //     console.log(post_data);
        //     this.$http.post(domain.permission_change, post_data, {})
        //         .then((res) => {
        //             console.log(res)
        //                 // this.statusMsg = res.data.data.select_course
        //             this.statusMsg = "open" // TODO: get from backend
        //         })
        //     this.statusMsg = "open"
        // },
        // closePermission() {
        //     let post_data = {
        //         select_course: "close"
        //     };
        //     console.log(post_data);
        //     this.$http.post(domain.permission_change, post_data, {})
        //         .then((res) => {
        //             console.log(res)
        //                 // this.statusMsg = res.data.data.select_course
        //             this.statusMsg = "close" // TODO: get from backend
        //         })
        //     this.statusMsg = "close"
        // }
    }
}