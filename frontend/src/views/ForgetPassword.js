import user_svg from '../assets/Icons/user.svg';
import Modal from '../components/Modal.vue';
export default {
    name: "reset-password",
    components: {
        user_svg,
        Modal
    },
    data() {
        return {
            isReset: false,
            resetMsg: "",
            number: "",
            nerror: false,
            nerrorMsg: ""
        }
    },
    methods: {
        inputNumber(val) {
            let length = (this.number+'').length;
            let reg = /[^0-9]/;
            let data = val.data;
            if(data == null) {
                if(length !== 6 && length !== 8) {
                    this.nerror = true;
                    this.nerrorMsg = "the length must be 6 or 8!";
                }
                else {
                    this.nerror = false;
                    this.nerrorMsg = "";
                }
            }
            else {
                // 查找是否有非数字的字符
                // 没有则返回-1，有则返回对应位置
                let n = data.search(reg);
                if ( n !== -1 ) {
                    this.nerror = true;
                    this.nerrorMsg = "It must be number!";
                    return;
                }
                if(length !== 6 && length !== 8) {
                    this.nerror = true;
                    this.nerrorMsg = "the length must be 6 or 8!";
                    return;
                }
                this.nerror = false;
                this.nerrorMsg = "";
            }
        },
        forget() {
            if(!this.nerror) {
                this.isReset = true;
                this.$router.push({ name: 'ResetPassword', params: {number: this.number}});
            }
            else {
                this.isReset = false;
                this.resetMsg = "please Enter the correct number before resetting the password";
            }
        }
    }
}