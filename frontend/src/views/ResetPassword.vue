<template>
    <div class="reset-password">
        <Modal :show.sync="is2Home" title="warning" @hideModal="hideModal" @submit="submit">
            <p>
                Are you sure back to home without reset password?
            </p>
        </Modal>
        <div class="form-wrap" v-show="!is2Home">
            <form class="reset">
                <h2>Reset Password</h2>
                <p>Your password is the initial password, please reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" class="Password" v-model.trim="password" placeholder="password"
                               maxlength="32" required='true' @input="passwordCorrect" />
                        <password class="icon" />
                    <div class="error" v-show="perr">{{this.perrMsg}}</div>
                    </div>
                </div>
                <div class="submit-error" v-show="resetErr">{{this.resetMsg}}</div>
                <button class="button" @click.prevent="reset_password">Reset</button>
                <p class="instruction">
                    back to
                    <label class="p-link" @click="Back2home" >Home</label>
                </p>
            </form>
        </div>
    </div>
</template>

<script src="./ResetPassword.js"></script>
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
        .p-link {
            color: #000;
            font-weight: bold;
            text-decoration:underline;
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
            color: #038f65;
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
        .submit-error {
            color:rgb(219, 96, 51);
            font-size: 16pt;
            font-weight: bold;
        }
    }
    
}
</style>
