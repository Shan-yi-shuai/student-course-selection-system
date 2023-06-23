<template>
    <div class="post-wrapper no-user">
        <div class="post-content">
            <div>
                <h2>{{post.title}}</h2>
                <p>{{post.blogPost}}</p>
                <router-link class="link" v-show="!user||!user.number" :to="{name: 'Login'}">
                    Login<arrowLight class="arrow" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import arrowLight from '../assets/Icons/arrow-right-light.svg'
export default {
    name: 'pagePost',
    components: { 
        arrowLight,
    },
    props: ["post"],
    created() {
        let a = this.user.number ? '1':'2';
    },
    computed: { 
        
        user () {
            return this.$store.state.user;
        }
    }
}
</script>
<style lang="scss" scoped>

.post-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4p -1px rgba(0,0,0,0.06);
    @media (min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .post-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;
        @media (min-width: 700px) {
            order: 1;
        }
        @media (min-width: 800px) {
            order: 3;
        }

        div {
            max-width: 375px;
            padding: 72px 24px;
            @media (min-width: 700px) {
                padding: 0 24px;
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media (min-width: 700px) {
                    font-size: 40px;
                }
            }

            p {
                font-size: 10px;
                font-weight: 300;
                line-height: 1.7;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media (min-width: 700px) {
                    font-size: 40px;
                }
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in all;
                &hover {
                    border-bottom-color: #303030;
                }
            }

            .link-light {
                &hover {
                    border-bottom-color: #F6CEEC;
                }
            }
        }
    }

    &:nth-child(even) {
        .post-content {
            order: 2;
        }
    }
}

.no-user:first-child {
    .post-content {
        background-color: rgb(255, 246, 221);
        color: #000;
    }
}
</style>