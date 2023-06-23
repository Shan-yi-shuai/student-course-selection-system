import $ from 'jquery';
export default {
    name: "modify-profile",
    component: {

    },
    data() {
        return {
            modify_en: false,
            card: "",
            identity: "",
            number: "",
            username: "",
            password: "123456g",
            tel: "",
            email: "22@22.com",
            college: "",
            major: "",
            state: "",
            err: false,
            perr: false,
            terr: false,
            eerr: false,
            errMsg: "",
            tel_see: true,
            email_see: true,
        }
    },
    created() {
        this.number = this.user.number;
        this.init();
        // 解决这两个值为空的显示问题

    },
    watch: {},
    methods: {
        init() {
            let _this = this;
            // console.log('x', _this.number, typeof _this.number);
            _this.$http
                .get(domain.viewOneUser, {params:{number:_this.number}})
                .then((res) => {
                    // console.log(res);
                    if (res.data.code == 1) {
                        this.password = res.data.data.password;
                        this.tel = res.data.data.tel;
                        this.email = res.data.data.email;
                        this.card = res.data.data.card;
                        this.username = res.data.data.username;
                        this.college = res.data.data.academy;
                        this.major = res.data.data.major;
                        this.identity = res.data.data.role;
                        this.state = res.data.data.state;
                    }
                    if (this.tel === "") {
                        // console.log('emptyempty');
                        this.tel_see = false;
                    }
                    if (this.email === "") {
                        // console.log('emptyempty');
                        this.email_see = false;
                    }
                })
                .catch((err) => {
                    // console.error(err);
                })
        },
        modifyEnable() {
            this.modify_en = !this.modify_en;
            // console.log(this.modify_en);
        },
        changePassword($event) {
            this.password = $event.target.innerText;
            // console.log(this.password);
        },
        changeTel($event) {
            this.tel = $event.target.innerText;
            // console.log(this.tel);
        },
        changeEmail($event) {
            this.email = $event.target.innerText;
            // console.log(this.email);
        },
        passwordCorrect() {
            let initial_password = this.$store.state.initialPassword;
            // console.log('initial password', this.$store.state.initialPassword);
            const password_reg = /^[a-zA-Z0-9_-]*$/;
            const regLetter = /[A-Za-z]/;
            const regNum = /[0-9]/;
            const regEsp = new RegExp("[-_]");
            let type_count = 0;
            if (this.password === initial_password) {
                this.perr = true;
                this.errMsg = "The password must be the same as the initial password";
            } else if (this.password.length < 6) {
                this.perr = true;
                this.errMsg = "The password must be at least 6 characters";
            } else if (this.password.length > 32) {
                this.perr = true;
                this.errMsg = "The password length cannot be longer than 32";
            } else if (!password_reg.test(this.password)) {
                this.perr = true;
                this.errMsg = "The password can only be letters, digits, and special characters (-_)";
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
                    this.errMsg = "The password must contain at least two types of letters, digits, and special characters (-_)";
                } else {
                    // console.log('the inputed password complies with the rules!');
                    this.perr = false;
                    this.errMsg = "";
                }
            }
        },
        TelCorrect() {
            // console.log('tel', this.tel);
            if (this.tel) {
                let reg = /^1[3456789]\d{9}$/;
                if (!reg.test(this.tel)) {
                    return true;
                } else {
                    this.errMsg = "";
                    return false;
                }
            } else {
                // console.log('nonononono tel');
                this.errMsg = "";
                return false;
            }
        },
        EmailCorrect() {
            // console.log('email', this.email);
            if (this.email !== "") {
                let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-z]+)+$/;
                if (!reg.test(this.email)) {
                    // console.log('wrong email');
                    return true;
                } else {
                    this.errMsg = "";
                    return false;

                }
            } else {
                // console.log('nonononono email');
                this.errMsg = "";
                return false;
            }
        },
        submit() {
            this.passwordCorrect();
            if (this.perr) {
                this.err = true;
                this.$router.go(0)
            } else if (this.TelCorrect()) {
                this.err = true;
                this.errMsg = "Your telephone number is invalid!";
                this.$router.go(0)
            } else if (this.EmailCorrect()) {
                this.err = true;
                this.errMsg = "Your email is invalid!";
                this.$router.go(0)
            } else {
                // console.log('yyyyyyyyyyyyyes');
                if (!this.err) { // 输入都合法
                    let _this = this;
                    let user = {
                        card: _this.card,
                        tel: _this.tel,
                        password: _this.password,
                        email: _this.email,
                        username: _this.username,
                        role: _this.identity,
                        number: _this.number,
                        academy: _this.college,
                        major: _this.major,
                        state: _this.state
                    }
                    // console.log(user);
                    _this.$http
                        .put(domain.user_change, user, {})
                        .then((res) => {
                            // console.log(res);
                            if (res.data.code === 1) {
                                _this.$notify({
                                    type: "success",
                                    message: res.data.msg,
                                    duration: 1800
                                });
                            } else {
                                _this.$message({
                                    type: "error",
                                    message: res.data.msg,
                                    duration: 1800
                                })
                            }
                            this.$router.go(0)
                        })
                        .catch((err) => {
                            _this.$message({
                                type: "error",
                                message: err,
                                duration: 1800
                            })
                        })
                }
            }
        }
    },
    computed: {
        user() {
            // console.log(this.$store.state.user);
            return this.$store.state.user; //{number:221314, password:'123456g'};
        }
    }
}