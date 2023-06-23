import password from '../assets/Icons/lock-all-solid.svg';
import Modal from '../components/Modal.vue';
import domain from "@/util/domain";
export default {
    name: "reset-password",
    components: {
        password,
        Modal,
    },
    data() {
        return {
            resetErr: false,
            resetMsg: "",
            password: "",
            is2Home: false,
            perr: false, // password不符合规范
            perrMsg: "",
            number: null,
            initialPassword: "",
        }
    },
    created() {
        this.getParams();
        this.getInitialPassword();
    },
    methods: {
        getParams() {
            // 取到路由带过来的参数
            this.number = this.$route.params.number;
            // console.log(this.number);
        },
        getInitialPassword() {
            this.initialPassword = this.$store.state.initialPassword;
            // console.log(this.initialPassword);
        },
        passwordCorrect() {
            const password_reg = /^[a-zA-Z0-9_-]*$/;
            const password_reg2 = /^[a-zA-Z]+$/;
            const regLetter = /[A-Za-z]/;
            const regNum = /[0-9]/;
            const regEsp = new RegExp("[-_]");
            let type_count = 0;
            if (this.password.length < 6) {
                this.perr = true;
                this.perrMsg = "The password must be at least 6 characters";
            } else if (this.password.length > 32) {
                this.perr = true;
                this.perrMsg = "The password length cannot be longer than 32";
            } else if (!password_reg.test(this.password)) {
                this.perr = true;
                this.perrMsg = "The password can only be letters, digits, and special characters (-_)";
            } else {
                if (regEsp.test(this.password)) {
                    type_count += 1;
                }
                if (regLetter.test(this.password)) {
                    type_count += 1;
                }
                if (regNum.test(this.password)) {
                    type_count += 1;
                }
                if (type_count < 2) {
                    this.perr = true;
                    this.perrMsg = "The password must contain at least two types of letters, digits, and special characters (-_)";
                } else {
                    this.perr = false;
                    this.perrMsg = "";
                }
            }
        },
        Back2home() {
            // console.log("Back to home");
            this.is2Home = true;
        },
        hideModal() {
            this.is2Home = false;
        },
        submit() {
            // console.log("submit, go to home");
            this.$router.push({ name: 'Home' });
            this.is2Home = false;
        },
        reset_password() {
            if (this.password === "") {
                // console.log("resetpassword empty -------");
                this.resetErr = true;
                this.resetMsg = "please input password!";
                return;
            }
            // 先判断一下password是否符合规范
            if (this.perr) {
                this.resetErr = true;
                this.resetMsg = "please input correct password!";
                return;
            } else if (this.password === this.initialPassword) { // 与初始密码一致不可以
                this.resetErr = true;
                this.resetMsg = "Your password should not be same with the initial password!";
                return;
            }
            let number_and_password = {
                number: this.number,
                password: this.password,
                token: "",
                role:""
            };
            // console.log(number_and_password);
            let _this = this;
            this.$http.put(domain.change_password, number_and_password, {}).then(res => {
                // console.log(res);
                if(res.data.code === 1) {
                    _this.resetErr = true;
                    _this.resetMsg = "";
                    _this.$notify({
                        type: 'success',
                        message: res.data.msg,
                        duration: 1000
                    });
                    _this.$router.push({ name: "Login" });
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning',
                        duration: 2000
                    });
                }
                
            }).catch(err => {
                this.$message({
                    message: '问题问题',
                    type: 'warning'
                });
                // console.log(err);
                _this.resetErr = true;
                _this.resetMsg = err.message;
            });
            return;
        }
    }
}