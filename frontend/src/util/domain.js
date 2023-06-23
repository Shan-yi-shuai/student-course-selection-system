const ip = "121.36.208.122:8081";
// const ip = "localhost:8081";
const api = "/api/";
const root = "http://" + ip + api;

const users = "users/";
const classroom = "classroom/";
const course = "course/";
const class_time = "class-time/";
const academy = "academy/";
const permission = "permission/";
const student_apply = "student-apply/";
const teacher_apply = "teacher-apply/";

const USERS = root + users;
const COURSE = root + course;
const CLASSROOM = root + classroom;
const ACADEMY = root + academy;
const CLASS_TIME = root + class_time;
const PERMISSION = root + permission;
const STUDENT_APPLY = root + student_apply;
const TEACHER_APPLY = root + teacher_apply;

export default {
    viewOneUser: USERS + "viewOneUser",
    viewAllUser: USERS + "viewAllUser",
    get_classrooms: CLASSROOM + "view",
    admin_add_course: COURSE + "add",
    teacher_add_apply: TEACHER_APPLY + "add",
    get_academy: ACADEMY + "view-all",
    user_course: COURSE + "view-user",
    login: USERS + "login",
    classroom_delete: CLASSROOM + "delete",
    classroom_add: CLASSROOM + "add",
    classroom_change: CLASSROOM + "change",
    get_classtime: CLASS_TIME + "view",
    classtime_change: CLASS_TIME + "change",
    academy_change_delete: ACADEMY + "change-delete",
    academy_add: ACADEMY + "add",
    course_add_all: COURSE + "add-all",
    get_all_course: COURSE + "view-all",
    course_delete: COURSE + "delete",
    course_change: COURSE + "change",
    get_permission: PERMISSION + "view-permission",
    permission_change: PERMISSION + "change",
    user_change: USERS + "change",
    register: USERS + "register",
    register_all: USERS + "register-all",
    change_password: USERS + "change-password",
    teacher_all_apply: TEACHER_APPLY + "view-all",
    course_apply_add: COURSE + "apply-add",
    course_apply_change: COURSE + "apply-change",
    course_apply_delete: COURSE + "apply-delete",
    teacher_change_apply: TEACHER_APPLY + "change",
    student_course: COURSE + "view-student",
    teacher_personal_apply: TEACHER_APPLY + "view-teacher",
    teacher_personal_delete: TEACHER_APPLY + "delete",
    student_view_to_select: COURSE + "view-to-select",
    student_view_selected: COURSE + "view-selected",
    student_view_taken: COURSE + "view-finished",
    student_apply_change: STUDENT_APPLY + "change",
    student_apply_add: STUDENT_APPLY + "add",
    select_course: COURSE + "select",
    drop_course: COURSE + "drop",
    student_apply_view: STUDENT_APPLY + "view-student",
    all_student_apply_view: STUDENT_APPLY + "view-all",
    student_apply_realize: COURSE + "apply-select",
    search_course: COURSE + "search",
}