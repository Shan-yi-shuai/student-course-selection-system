<template>
<header>
    <nav class="container">
        <div class="branding">
            <router-link class="header" :to="{ name: 'Home' }">{{branding}}</router-link>
        </div>
        <div class="nav-links">
            <ul v-show="!mobile&&!user">
                <router-link class="link" v-show="!user&&!this.isAdmin" :to="{name: 'Login' }">Login</router-link>
            </ul>
            <el-menu v-show="!mobile&&user&&this.isStudent"
                :router="true"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="transparent"
                text-color="#3B2667"
                active-text-color="#ffd04b" >
                <el-menu-item index="select-course" route="/users/select-course">select course</el-menu-item>
                <el-menu-item index="apply-select-course" route="/users/apply-select-course">apply
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">setting</template>
                    <el-menu-item index="profile" route="/users/modify-profile">profile</el-menu-item>
                    <el-menu-item index="logout" route="/home">logout</el-menu-item>
                </el-submenu>
            </el-menu>
            <el-menu v-show="!mobile&&user&&this.isTeacher"
                :router="true"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="transparent"
                text-color="#3B2667"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">course</template>
                    <el-menu-item index="course-student" route="/users/course-student">my students</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">apply</template>
                    <el-menu-item index="apply-course" route="/users/apply-course">my course</el-menu-item>
                    <el-menu-item index="visit-application" route="/users/visit-application">my application</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">setting</template>
                    <el-menu-item index="profile" route="/users/modify-profile">profile</el-menu-item>
                    <el-menu-item index="logout" route="/home">logout</el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- <ul v-show="!mobile">
                <router-link class="link" v-show="!user&&!this.isAdmin" :to="{name: 'Login' }">Login</router-link>
                <router-link class="link" v-show="this.isAdmin" :to="{name: 'AdministrateInformation'}">Class</router-link>
                <router-link class="link" v-show="this.isAdmin" :to="{name: 'Register'}">Register</router-link>
                <router-link class="link" v-show="this.isTeacher" :to="{name: 'ApplyCourse'}">Apply Course</router-link>
                <router-link class="link" v-show="this.isStudent" :to="{name: 'SelectCourse'}">Select Course</router-link>
                <router-link class="link" v-show="!this.isAdmin" :to="{name: 'ModifyProfile' }">Setting</router-link>
                <label class="link" v-show="user" @click="logout">Logout</label>
                <label class="link" v-show="user" >{{this.profile}}</label>  
            </ul> -->
            <el-menu
                :router="true"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="transparent"
                text-color="#3B2667"
                active-text-color="#ffd04b"
                v-show="!mobile&&this.isAdmin" >
                <el-menu-item index="1" route="/manage-select-permission">permission
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">apply</template>
                    <el-menu-item index="2-1" route="/student-application">student application</el-menu-item>
                    <el-menu-item index="2-2" route="/teacher-application">teacher application</el-menu-item>
                    <!-- <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">course</template>
                    <el-menu-item index="3-1" route="/manage-course">course</el-menu-item>
                    <el-menu-item index="3-2" route="/manage-classroom">classroom</el-menu-item>
                    <el-menu-item index="3-3" route="/manage-class-time">class time</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">people</template>
                    <el-menu-item index="4-1" route="/register">register</el-menu-item>
                    <el-menu-item index="4-2" route="/manage-college">college & major</el-menu-item>
                    <el-menu-item index="4-3" route="/manage-user">view people</el-menu-item>
                    <el-menu-item index="logout" route="/home">logout</el-menu-item>
                </el-submenu>
                <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="!mobile"/>
            </el-menu>
        </div>
            
        
    </nav>
    
    <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
            <router-link class="link" :to="{name: 'Home' }">Home</router-link>
            <router-link class="link" v-show="!user" :to="{name: 'Home' }">Login</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'Register'}"> Register</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageUser'}">All users</router-link>
            <router-link class="link" v-show="!this.isAdmin&&user" :to="{name: 'ModifyProfile'}">Setting</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageCollege'}">College & Major</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'AdministrateInformation'}">Class</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageClassroom'}">Classroom</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageClassTime'}">Class Time</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageCourse'}">Course</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ManageSelectPermission'}">all course permission</router-link>
            <router-link class="link" v-show="this.isStudent" :to="{name: 'SelectCourse'}">Select Course</router-link>
            <router-link class="link" v-show="this.isTeacher" :to="{name: 'ApplyCourse'}">Apply Course</router-link>
            <router-link class="link" v-show="this.isAdmin" :to="{name: 'ReviewApplication'}">all application</router-link>
        </ul>
    </transition>
</header>
</template>

<script>
import menuIcon from '../assets/Icons/bars.svg';

export default {
    name: 'navigation',
    components: {
        menuIcon
    },
    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profile: null,
            isAdmin: false,
            branding: "Education system",
            isTeacher: false,
            isStudent: false,
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.getbranding();
        this.checkScreen();
        if(this.user.role == "admin") {
            this.isAdmin = true;
        }
        if(!this.user){
            this.profile = "";
        } else {
            this.profile = this.isAdmin? "admin": this.user.number;
        }
        this.isTeacher = (this.user.role == "teacher") ? true :false;
        this.isStudent = (this.user.role == "student") ? true :false;
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        getbranding() {
            // console.log('router',this.$route.name);
            if(this.$route.name === "ManageUser") {
                this.branding = "Manage users";
            } else if(this.$route.name === "ManageCollege") {
                this.branding = "Manage college and major";
            } else if(this.$route.name === "ManageClassroom") {
                this.branding = "Manage classroom";
            }
            else if(this.$route.name === "ManageClassTime") {
                this.branding = "Manage Class Time";
            }
            else if(this.$route.name === "AddCourse") {
                this.branding = "Add Course";
            } else if(this.$route.name === "ModifyCourse") {
                this.branding = "Modify Course";
            }
            else {
                this.branding = "Education system";
            }
            // console.log(this.branding);
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        logout () {
            // console.log('logout!!!!!');
            this.isAdmin = false;
            this.$store.dispatch('logout').then(() => {
                this.$router.replace('/login')
            })
        },
        handleSelect(key, keyPath) {
            // console.log('handle selec',key, keyPath);
            if(key == "logout") {
                // console.log('logout!!!!!');
                this.isAdmin = false;
                this.$store.dispatch('logout').then(() => {
                    // this.$router.replace('/login')
                })
            }
        }
    },
    computed: { 
        user () {
            // console.log(this.$store.state.user);
            return this.$store.state.user;//{number:221314, password:'123456g'};
        }
    },
    watch: { // 任意时刻改变都会触发。
        $route() {
            this.getbranding();
            }
    }
};
</script>
<style lang="scss" scoped>
header {
   background-image: linear-gradient( 135deg, #ABDCFF 10%, #736EFE 100%);
   padding: 0 25px;
   box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
   z-index: 99;
   height: 60px;

   .link {
       font-weight: 500;
       padding: 0 8px;
       transition: .5s color ease;
       color: #FFF886;

       &:hover {
           color: #F067B4;
       }
   }

   nav {
       display: flex;
       padding: 15px 0;
       height: 60px;

       .branding {
           display: flex;
           align-items: center;

           .header {
               font-weight: 600;
               font-size: 24px;
               color: #3B2667;
               text-decoration: none;
           }
       }

       .nav-links {
           position: relative;
           display: flex;
           flex: 1;
           align-items: center;
           justify-content: flex-end;
           font-size: 20px;
           ul {
               margin-right: 32px;

               .link {
                   margin-right: 16px;
                   font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
               }

               .link:last-child {
                   margin-right: 0px;
               }
           }
       }
   }

   .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: -25px;
        height: 25px;
        width: auto;
   }

   .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 200px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link {
            padding: 15px 4px;
        }
   }

   .mobile-nav-enter-active,
   .mobile-nav-leave-active {
       transition: all 0.5s ease;
   }

   .mobile-nav-enter {
       transform: translateX(-250px);
   }

   .mobile-nav-enter-to {
       transform: translateX(0);
   }

   .mobile-nav-leave-to {
       transform: translateX(-250px);
   }
   .el-menu--horizontal .el-menu-item {
       height: 60px;
       line-height: 60px;
       font-size: 15pt;
       text-align: center;
   }
    .el-menu--horizontal .el-submenu ::v-deep .el-submenu__title {
        height: 60px;
        line-height: 60px;
        font-size: 15pt;
    }
   .el-menu--horizontal .el-submenu > .el-menu-item {
       font-weight: 600;
       height: 60px;
   }

}
</style>
    