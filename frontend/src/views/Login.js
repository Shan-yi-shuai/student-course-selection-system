import password_svg from '../assets/Icons/lock-all-solid.svg';
import user_svg from '../assets/Icons/user.svg';
import { password_re} from "@/util/util";
export default {
    name: "login",
    components: {
        password_svg,
        user_svg
    },
    data() {
        return {
            number: "",
            password: "",
            error: null,
            errorMsg: "",
            Nerror: null,
            NerrorMsg: "",
            Perror: null,
            PerrorMsg: "",
            initialPassword: "",
        };
    },

    methods: {
        getInitialPassword() {
            this.initialPassword = this.$store.state.initialPassword;
        },
        getCollege() {
            this.collegeList = [{ id: 0, name: "社会" }, { id: 1, name: "中文" }, { id: 2, name: "计算机" }, { id: 3, name: "物理" }];
        },
        getMajor() {
            switch (this.college) {
                case "社会":
                    {
                        this.majorList = [{ id: 0, name: "国际关系" }, { id: 1, name: "政治" }];
                        break;
                    }
                case "中文":
                    {
                        this.majorList = [{ id: 0, name: "古汉语" }, { id: 1, name: "文学" }];
                        break;
                    }
                case "计算机":
                    {
                        this.majorList = [{ id: 0, name: "信息安全" }, { id: 1, name: "软件工程" }];
                        break;
                    }
                case "物理":
                    {
                        this.majorList = [{ id: 0, name: "量子" }, { id: 1, name: "半导体" }];
                        break;
                    }
            }
        },
        check_password() {
            //check length
            let addMsg = " You may reset your password";
            if (this.password.length < 6) {
                this.Perror = true;
                this.PerrorMsg = "Password length should longer than 6 characters!"
                return;
            } else if (this.password.length > 32) {
                this.Perror = true;
                this.PerrorMsg = "Password length should no more than 32 characters!";
                return;
            }

            let condition = password_re(this.password)
            if (condition) {
                this.Perror = false;
                this.PerrorMsg = "";
            } else {
                this.Perror = true;
                this.PerrorMsg = "wrong password format" + addMsg;
            }
            return;
        },
        inputNumber() {
            let length = this.number.length;
            let reg = /[^0-9]/;
            if (reg.test(this.number)) {
                this.Nerror = true;
                this.NerrorMsg = "It must be number!";
            } else if (length !== 6 && length !== 8) {
                this.Nerror = true;
                this.NerrorMsg = "the length must be 6 or 8!";
            } else {
                this.Nerror = false;
                this.NerrorMsg = "";
            }
            return;
        },
        async signin() {
            if (this.number === "" || this.password === "") {
                this.error = true;
                this.errorMsg = "please fill out all the fields!";
                return;
            }
            if (this.Nerror) {
                this.error = true;
                this.errorMsg = "please input correct number!";
                return;
            }
            if (this.Perror) {
                this.error = true;
                this.errorMsg = "please input correct password!";
                return;
            }
            let _this = this;
            let user = {
                number: _this.number,
                password: _this.password,
                role: "",
                token: ""
            }
            _this.$http
                .post(domain.login, user, {})
                .then((res) => {
                    // 请后端返回是管理员的参数，比如 administrator
                    // 把用户的key保存起来  sessionStorage  localStorage 本地
                    sessionStorage.setItem("token", res.data.data.token);
                    sessionStorage.setItem("role", res.data.data.role);
                    if (res.data.code == 1) {
                        _this.$notify({
                            type: 'success',
                            message: '欢迎您!',
                            duration: 1000
                        });
                        user.role = res.data.data.role;
                        user.token = res.data.data.token;
                        if(res.data.data.role=="admin") { //是管理员，可以进入register界面//进入初始界面，并且有显示注册选项
                            user.role = "admin";
                            _this.$store.dispatch('login',user).then();
                            _this.$router.push({name: "Home"});
                        }
                        else {
                            if(_this.password == _this.initialPassword) {  // 输入的初始密码，跳转到重置密码界面
                                _this.error = false;
                                _this.errorMsg = "";
                                _this.$store.dispatch('login', user).then();
                                _this.$router.push({ name: "ResetPassword", params: { number: user.number } })
                            } else {
                                _this.error = false;
                                _this.errorMsg = "";
                                _this.$store.dispatch('login', user).then();
                                _this.$router.push({ name: "Home" });
                            }
                        }
                    }
                    if (res.data.code == 0) {
                        _this.error = true;
                        _this.errorMsg = res.data.msg;
                    }
                    if (res.data.msg == "wrong") {
                        _this.error = true;
                        _this.errorMsg = "Wrong Password!";
                    }
                    if (res.data.msg == "missing") {
                        _this.error = true;
                        _this.errorMsg = "User does not exist, please input correct number!";
                    }
                }).catch(err => {
                    _this.$message({
                        message: '问题问题',
                        type: 'warning'
                    });
                    _this.error = true;
                    _this.errorMsg = err.message;
                });
        },
    },
    created() {
        this.getInitialPassword();
        this.getCollege();
    },
    mounted() {},

}