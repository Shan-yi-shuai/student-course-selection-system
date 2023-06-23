import domain from "../util/domain.js"

export default {
    name: "manage-classroom",
    components: {},
    data() {
        return {
            classroomTable: [],
            change_dialogVisible: false,
            add_dialogVisible: false,
            classroom_capacity: 1,
            classroom_name: "",
            selectedClassroom: "",
        }
    },
    mounted: function() {
        this.getClassrooms();
    },
    methods: {
        select_classroom(classroom) {
            this.change_dialogVisible = true;
            this.selectedClassroom = classroom;
        },
        handleClose(done) {
            this.$confirm('确认关闭？关闭后信息不会保存')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        delete_classroom(index, classroom) {
            this.$confirm('此操作将永久删除该教室, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.deleteClassroom(classroom);
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getClassrooms() {
            let _this = this
            this.$http.get(domain.get_classrooms, { params: {} })
                .then((res) => {
                    if (res.data.code === 1) {
                        _this.classroomTable = res.data.data;
                        // _this.sort();
                    }
                })
        },
        deleteClassroom(classroom) {
            let _this = this;
            var post_classroom = {
                id: classroom.id,
                classroom_name: classroom.classroom_name,
                capacity: classroom.classroom_capacity,
                courseList: classroom.courseList
            };

            _this.$http.post(domain.classroom_delete, post_classroom, {})
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.code === 1) {
                        _this.classroomTable = res.data.data;
                        // _this.sort();
                        _this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        _this.$router.go(0);
                        // setTimeout(function() {
                        //     _this.$router.go(0);
                        // }, 1);
                    } else {
                        _this.$message({
                            type: 'info',
                            message: res.data.msg
                        });
                        // _this.$message({
                        //     type: 'success',
                        //     message: res.data.msg,
                        //     duration: 1500
                        // });
                    }
                })
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err,
                        duration: 2000
                    })
                });

            this.getClassrooms();
        },
        fetchClassroom(res){
            let _this = this
            // console.log(res.data);
            if (res.data.code === 1) {
                _this.classroomTable = res.data.data;
                // _this.sort();
                // classroom排序
                // console.log(this.classroomTable);
                _this.$message({
                    type: 'success',
                    message: res.data.msg
                });
            } else {
                _this.$message({
                    type: 'info',
                    message: res.data.msg
                });
            }
        },
        addClassroom() {
            if (!this.classroom_name) {
                this.$confirm('请填写教室名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {}).catch(() => {});
                return
            }

            let _this = this
            let classroom = {
                id: -1,
                classroom_name: this.classroom_name,
                capacity: this.classroom_capacity,
                courseList: []
            };
            // console.log(classroom);
            _this.$http.post(domain.classroom_add, classroom, {})
                .then(this.fetchClassroom)
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err,
                        duration: 2000
                    })
                });
            this.add_dialogVisible = false;
            this.getClassrooms();
            _this.$router.go(0);
        },
        changeClassroom() {
            if (!this.classroom_name) {
                this.$confirm('请填写教室名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteClassroom(classroom);
                }).catch(() => {});
                return
            }

            let _this = this
            let classroom = {
                id: this.selectedClassroom.id,
                classroom_name: this.classroom_name,
                capacity: this.classroom_capacity,
                courseList: this.selectedClassroom.courseList
            };
            _this.$http.post(domain.classroom_change, classroom, {})
                .then(this.fetchClassroom)
                .catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: err,
                        duration: 2000
                    })
                });
            this.change_dialogVisible = false;
            this.getClassrooms()
            _this.$router.go(0);
        },
        sort() {
            this.classroomTable.sort(function(obj1, obj2) {
                let val1 = obj1.classroom;
                let val2 = obj2.classroom;
                return val1 - val2;
            });
        }
    }
}