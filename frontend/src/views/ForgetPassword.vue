<template>
    <div class="forget-password">
        <div class="form-wrap">
            <form class="forget">
                <h2>Forget Password</h2>
                <p>if you forget you password, you can sign in your number to reset your password</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" class="Number" maxlength="8" v-model.number="number" placeholder="number" @input="inputNumber"/>
                        <user_svg class="icon" />
                        <div class="error" v-show="nerror">{{this.nerrorMsg}}</div>
                    </div>
                </div>
                <button class="button" @click.prevent="forget">Reset Password</button>
                <div class="error" v-show="isReset">{{this.resetMsg}}</div>
                <p class="instruction">
                    back to
                    <router-link class="router-link" :to="{name: 'Login' }">Sign In</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script src="./ForgetPassword.js"></script>
<style lang="scss" scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    flex: 1 0 auto;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    background-image: url("../assets/background4.png");
    background-size:cover;
    @media(min-width: 800px){
        width: 100%;
    }

    .instruction {
        margin-bottom: 32px;
        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1 0 auto;
        
        @media (min-width: 800px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 28px;
            color: #9c8c81;
            margin-bottom: 40px;
            @media (min-width: 800px) {
                font-size: 36px;
            }
        }
        p {
            text-align: center;
            font-size: 18px;
            color: #303030;
            margin-bottom: 20px;
            @media (min-width: 800px) {
                font-size: 20px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                input {
                    width: 100%;
                    border: none;
                    background-color: #f3fdfac5;
                    padding: 4px 4px 4px 30px;
                    height: 50px;
                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }

        .button {
            border-radius: 12px;
            text-align: center;
            padding: 6px;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 2px;
            cursor: pointer;
            border: 2px solid #d9dddcc5;
            background-color: #fff8f8;
            color: rgb(59, 56, 56);
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
        }
        .button:hover {
            background-color: #ABDCFF; /* Green */
            color: white;
        }
    }
    
}
</style>
