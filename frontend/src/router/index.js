import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import ModifyProfile from '../views/users/ModifyProfile.vue'
import ManageCollege from '../views/ManageCollege.vue'
import ManageUser from '../views/ManageUser.vue'
import ManageClassTime from "../views/ManageClassTime.vue";
import SelectCourse from "../views/users/SelectCourse.vue";
import ManageClassroom from "../views/ManageClassroom.vue";
import ManageSelectPermission from "../views/ManageSelectPermission.vue";
import ManageCourse from "../views/ManageCourse.vue";
import TeacherApplication from "../views/TeacherApplication.vue";
import StudentApplication from "../views/StudentApplication.vue";
import ApplyCourse from "../views/users/ApplyCourse.vue";
import AddCourse from "../views/AddCourse.vue";
import ModifyCourse from "../views/ModifyCourse.vue";
import VisitApplication from "../views/users/VisitApplication.vue";
import ApplySelectCourse from "../views/users/ApplySelectCourse.vue";
import CourseStudent from "../views/users/CourseStudent.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login,
        meta: { title: "Login" }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { title: "Login" }
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { title: "Register", requireAuth: true, }
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        meta: { title: "Reset Password" }
    },
    {
        path: "/forget-password",
        name: "ForgetPassword",
        component: ForgetPassword,
        meta: { title: "Forget Password" }
    },
    {
        path: "/users/modify-profile",
        name: "ModifyProfile",
        component: ModifyProfile,
        meta: { title: "Modify profile", requireAuth: true }
    },
    {
        path: "/manage-college",
        name: "ManageCollege",
        component: ManageCollege,
        meta: { title: "Manage College", requireAuth: true }
    },
    {
        path: "/manage-user",
        name: "ManageUser",
        component: ManageUser,
        meta: { title: "Manage User", requireAuth: true }
    },
    {
        path: "/users/select-course",
        name: "SelectCourse",
        component: SelectCourse,
        meta: {
            title: "Select Course",
            requireAuth: true
        }
    },
    {
        path: "/manage-class-time",
        name: "ManageClassTime",
        component: ManageClassTime,
        mata: {
            title: "Manage Class Time",
            requireAuth: true
        }
    },
    {
        path: "/manage-classroom",
        name: "ManageClassroom",
        component: ManageClassroom,
        meta: {
            title: "Manage Classroom",
            requireAuth: true
        }
    },
    {
        path: "/manage-select-permission",
        name: "ManageSelectPermission",
        component: ManageSelectPermission,
        meta: {
            title: "Manage Select Permission",
            requireAuth: true
        }
    },
    {
        path: "/manage-course",
        name: "ManageCourse",
        component: ManageCourse,
        meta: {
            title: "Manage Course",
            requireAuth: true
        }
    },
    {
        path: "/teacher-application",
        name: "TeacherApplication",
        component: TeacherApplication
    },
    {
        path: "/users/apply-course",
        name: "ApplyCourse",
        component: ApplyCourse,
        meta: {
            title: "Apply Course",
            requireAuth: true
        }
    },
    {
        path: "/add-course",
        name: "AddCourse",
        component: AddCourse,
        meta: {
            title: "Add Course",
            requireAuth: true
        }
    },
    {
        path: "/modify-course",
        name: "ModifyCourse",
        component: ModifyCourse,
        meta: {
            title: "Modify Course",
            requireAuth: true
        }
    },
    {
        path: "/users/visit-application",
        name: "VisitApplication",
        component: VisitApplication,
        meta: {
            title: "Visit Application",
            requireAuth: true
        }
    },
    {
        path: "/student-application",
        name: "StudentApplication",
        component: StudentApplication,
        meta: {
            title: "Student Application",
            requireAuth: true
        }
    },
    {
        path: "/users/apply-select-course",
        name: "ApplySelectCourse",
        component: ApplySelectCourse,
        meta: {
            title: "Apply Select Course",
            requireAuth: true
        }
    },
    {
        path: "/users/course-student",
        name: "CourseStudent",
        component: CourseStudent,
        meta: {
            title: "Course Student",
            requireAuth: true
        }
    },

];

const router = new VueRouter({
    mode: "history", // 改变URL而不刷新页面.
    base: process.env.BASE_URL, // vue.config.js 中的基本路径
    routes,
})

// 导航守卫，判断是否登录


router.beforeEach((to, from, next) => {
    // console.log(to, from);
    let flag = 0;
    routes.forEach(router => {
        let { path } = router;
        if (to.path === path) {
            flag = 1;
        }
    });
    if (!flag) { // 如果url输入不属于任何定义的path，去home，登录
        next({
            path: '/home',
            query: { redirect: to.fullPath }
        });
    }
    // console.log('LOCALSTOREAGE', store.state.user);
    if (to.meta.requireAuth) {
        // console.log(store.state.user, store.state.user.number);
        // console.log(localStorage.getItem('user').number);
        // console.log(store.state.user, store.state.user.number);
        const isLogin = !!(store.state.user.number);
        // console.log('state', isLogin);
        if (!isLogin) { //未登录，访问除login, forget-password,reset-password,home之外的网页，不允许
            // console.log('not login');
            if (to.path === '/home') {
                next();
            } else {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                });
            }
        } else { // 登录后
            // console.log('role', store.state.user.role);
            // 非管理员不能访问的页面,回到原来的页面
            if (store.state.user.role !== "admin" && ((to.path === "/register") || (to.path === "/manage-user") ||
                    (to.path === "/manage-select-permission") ||
                    (to.path === "/manage-course") || (to.path === "/manage-class-time") ||
                    (to.path === "/manage-classroom") || (to.path === "/teacher-application") ||
                    (to.path === "/manage-college") || (to.path === "/student-application")
                )) {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                })
            }
            // 一些学生不能去的页面。包括老师和管理员共同的页面
            else if ((store.state.user.role === "student") && ((to.path === "/modify-course") ||
                    (to.path === "/add-course"))) {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                })
            }
            // 一些学生和管理员不能去的页面。老师单独的页面
            else if ((store.state.user.role !== "teacher") && ((to.path === "/users/apply-course") ||
                    (to.path === "/users/course-student") || (to.path === "/users/visit-application"))) {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                })
            }
            // 一些老师和管理员不能去的页面，学生单独页面
            else if ((store.state.user.role !== "student") && ((to.path === "/users/select-course") || (to.path === "/users/apply-select-course"))) {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                })
            }
            // 一些管理员不能去的页面，学生和老师共同的页面
            else if ((store.state.user.role === "admin") && (to.path === "/users/modify-profile")) {
                next({
                    path: '/home',
                    query: { redirect: to.fullPath }
                })
            } else {
                // console.log('login, but not admin, go to home/login/forget-password/reset-password');
                next()
            }
        }
    } else {
        // console.log('不要requireAuth')
        next()
    }
});

export default router;