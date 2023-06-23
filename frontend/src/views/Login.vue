<template>
    <div class="form-wrap">
        <form class="login">
            <!-- <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{name: 'Register' }">Register</router-link>
            </p> -->
            <h2>Login to Education system</h2>
            <div class="inputs">
                <div class="input" >
                    <input type="text" class="Number" maxlength="8" v-model="number" 
                      required='true' placeholder="number" @input="inputNumber"/>
                    <user_svg class="icon" />
                    <div class="error" v-show="Nerror">{{this.NerrorMsg}}</div>
                </div>
                 <div class="input">
                    <input type="password" class="Password" v-model.trim="password" placeholder="password"
                            maxlength="32" required='true' @input="check_password" />
                    <password_svg class="icon" />
                    <div class="error" v-show="Perror">{{this.PerrorMsg}}</div>
                </div>
            </div>
            <router-link class="forget-password" :to="{ name: 'ForgetPassword' }">Forget Password</router-link>
            <button class="button" @click.prevent="signin">Sign In</button>
            <div class="submit-error" v-show="error">{{this.errorMsg}}</div>
            <p class="login-register">
                <router-link class="router-link" :to="{name: 'Home' }">Back to Home</router-link>
            </p>
        </form>
    </div>
</template>

<script src="./Login.js"></script>

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
    background-image: url("../assets/background.png");
    background-size:cover;
    @media(min-width: 800px){
        width: 100%;
    }

    .login-register {
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
            color: #303030;
            margin-bottom: 40px;
            @media (min-width: 800px) {
                font-size: 36px;
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
                    background-color: #d9dddcc5;
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


                .select {
                    width: 100%;
                    height: 50px;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    background-color: #d9dddcc5;
                    border: none;
                    color: #797979;
                }
            }
        }

        .forget-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: 0.5s ease all;

            &:hover {
                border-color: #303030;
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
            margin: 6px 2px;
            cursor: pointer;
            border: 2px solid #d9dddcc5;
            background-color: #303030;
            color: #fff;
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
        }
        .button:hover {
            background-color: #ABDCFF; /* Green */
            color: white;
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #FFF;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 800px) {
                display: initial;
            }
        }
        .submit-error {
            color:rgb(219, 96, 51);
            font-size: 16pt;
            font-weight: bold;
        }
    }
}
</style>
