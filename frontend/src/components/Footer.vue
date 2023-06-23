<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name : 'Home' }">Education System</router-link>
                </div>
                <div class="col-2">
                    <ul>
                        <li>
                            <a href="#"><weixin class="svg-icon" /></a>
                        </li>
                        <li>
                            <a href="#"><qq class="svg-icon" /></a>
                        </li>
                        <li>
                            <a href="#"><weibo class="svg-icon" /></a>
                        </li>
                        <li>
                            <a href="#"><linkedin class="svg-icon" /></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Group ONE All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script>
import weibo from '../assets/Icons/wb.svg';
import weixin from '../assets/Icons/Weixin.svg';
import qq from '../assets/Icons/QQ.svg';
import linkedin from '../assets/Icons/Linkedin.svg';

export default {
    name: 'footer-vue',
    components: {
        weibo, 
        weixin,
        linkedin, 
        qq
    },
    data() {
        return {
            user: false,
        }
    }

}
</script>

<style lang="scss" scoped>
footer {
    margin-top: auto;
    padding: 80px 25px;
    background-image: linear-gradient(135deg, #FFF5C3 10%,  #FFF886 100%);

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        > div {
            display: flex;
            flex: 1;
        }

        .left {
            gap: 32px;
            color: rgb(61, 43, 43);
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }

            .header {
                text-align: center;
                font-size: 24px;
                color: #000;
                text-decoration: none;
                font-weight: 600;
                @media (min-width: 800px) {
                    text-align: initial;
                }
            }
            ul {
                text-align: center;
                gap: 16px;
                list-style: none;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }

            .col-1,
            .col-2 {
                gap: 32px;
                display: flex;
                flex: 1;
                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;

                h2 {
                    text-align: center;
                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }
            }

            .col-2 {
                ul {
                    margin-top: auto;
                    li {
                        display: flex;
                        align-items: center;
                        .svg-icon {
                            width: 24px;
                            height: auto;
                            color: rgb(27, 26, 26);
                        }
                    }
                }
            }
        }

        .right {
            gap: 32px;
            color: rgb(58, 41, 41);
            align-items: center;
            flex-direction: column;
            @media (min-width: 800px) {
                align-items: flex-end;
                gap: 0;
            }
        }

        p {
            margin-top: auto;
        }
    }
}

</style>