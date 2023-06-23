export default {
    CJK_names:["乜也乜家","乜家四都","四都普子","普子阿居","阿居拉马",
        "奥抵阿锅","阿锅老塞","老塞阿衣","阿衣内格","内格阿姆",
        "赵福祥","赵祥顺","赵顺海","이승만","윤보선","박정희",
        "まつお ばしょう","つしま しゅうじ","いとう ひろぶみ"],
    personal_course: {},
    course_students: {
        code: 1,
        msg: "msg",
        data: [{}]
    },
    student_application_apply: {
        id: -1,
        course_id: 4,
        course_name: "English",
        course_number: "002",
        applicant: {
            user_number: "0000101",
            user_name: "aa"
        },
        reason: "good",
        school_year: 2021,
        term: 1,
        status: "待审核"
    },
    student_application_reply_success: {
        code: 1,
        msg: "Success to add application",
        data: {
            id: -1,
            course_id: 4,
            course_name: "Math",
            course_number: "002",
            applicant: {
                user_number: "0000101",
                user_name: "aa"
            },
            reason: "good",
            school_year: 2021,
            term: 1,
            status: "待审核"
        }
    },
    student_application_reply_fail: {
        code: 0,
        msg: "Course is not exist",
        data: {
            id: -1,
            course_id: 4,
            course_name: "Compiling",
            course_number: "002",
            applicant: {
                user_number: "0000101",
                user_name: "aa"
            },
            reason: "good",
            school_year: 2021,
            term: 1,
            status: "待审核"
        }
    },
    all_student_application: {
        code :1,
        msg: "Success to send all applications",
        data: [
            {
                id: 14654,
                course_id: 4,
                course_name: "Compiling",
                course_number: "002",
                applicant: {
                    user_number: "0000101",
                    user_name: "aa"
                },
                reason: "good",
                school_year: 2021,
                term: 1,
                status: "审核通过"
            },
            {
                id: 333,
                course_id: 4,
                course_name: "OASD",
                course_number: "012",
                applicant: {
                    user_number: "100101",
                    user_name: "sa"
                },
                reason: "good",
                school_year: 2021,
                term: 1,
                status: "待审核"
            }
        ]
    },
    get_teacher_application:{
        code: 1,
        msg: "Success to send teacher applications",
        data:[
            {
                id: 1,
                name: "软件工程",
                number: "1",
                academy: "计算机科学与技术学院",
                hour: "4",
                credit: "4",
                applicant: {
                    user_number: "00000001",
                    user_name: "sy"
                },
                introduction: "introduction for 软件工程",
                userInfo: [
                    {
                        user_number: "00000001",
                        user_name: "sy"
                    },
                    {
                        user_number: "008801",
                        user_name: "student1"
                    },
                    {
                        user_number: "000045",
                        user_name: "student2"
                    },
                    {
                        user_number: "666666",
                        user_name: "student3"
                    },
                    {
                        user_number: "777777",
                        user_name: "student4"
                    }
                ],
                timeInfo: [
                    {
                        class_number: 1,
                        week_day: 5
                    },
                    {
                        class_number: 2,
                        week_day: 5
                    },
                    {
                        class_number: 3,
                        week_day: 5
                    }
                ],
                majorList: ["软件工程","信息安全"],
                location: "H3108",
                status: "审核通过",
                capacity: "100",
                type: "change"
            },
            {
                id: 8,
                name: "OASD",
                number: "8",
                academy: "计算机科学与技术学院",
                hour: "3",
                credit: "3",
                applicant: {
                    user_number: "00090001",
                    user_name: "sssssy"
                },
                introduction: "introduction for OASD",
                userInfo: [
                    {
                        user_number: "00090001",
                        user_name: "sssssy"
                    },
                    {
                        user_number: "608801",
                        user_name: "student1"
                    },
                    {
                        user_number: "700045",
                        user_name: "student2"
                    },
                    {
                        user_number: "866666",
                        user_name: "student3"
                    }
                ],
                timeInfo: [
                    {
                        class_number: 1,
                        week_day: 4
                    },
                    {
                        class_number: 2,
                        week_day: 4
                    },
                    {
                        class_number: 3,
                        week_day: 4
                    }
                ],
                majorList: ["软件工程","保密技术"],
                location: "H3109",
                status: "审核通过",
                capacity: "180",
                type: "change"
            },
            {
                id: 80,
                name: "大学英语",
                number: "80",
                academy: "计算机科学与技术学院",
                hour: "2",
                credit: "2",
                applicant: {
                    user_number: "66690001",
                    user_name: "Abandon"
                },
                introduction: "introduction for English",
                userInfo: [
                    {
                        user_number: "66690001",
                        user_name: "Abandon"
                    },
                    {
                        user_number: "633801",
                        user_name: "student1"
                    },
                    {
                        user_number: "400045",
                        user_name: "student2"
                    },
                    {
                        user_number: "333666",
                        user_name: "student3"
                    },
                    {
                        user_number: "333556",
                        user_name: "student4"
                    },
                    {
                        user_number: "399999",
                        user_name: "student5"
                    }
                ],
                timeInfo: [
                    {
                        class_number: 6,
                        week_day: 4
                    },
                    {
                        class_number: 7,
                        week_day: 4
                    }
                ],
                majorList: ["软件工程","保密技术","中文"],
                location: "H2106",
                status: "审核通过",
                capacity: "80",
                type: "change"
            }
        ]
    },
    search_result: {
        code: 1,
        msg: "Success to get all eligible courses",
        data:[
            {
                id:4,
                name: "离散数学",
                number: "002",
                academy: "计算机学院",
                hour: "4",
                credit: "4",
                userInfo: [
                    {
                        user_number:"00000002",
                        user_name:"单弋"
                    },
                    {
                        user_number:"00000001",
                        user_name:"syy"
                    },
                    {
                        user_number:"003301",
                        user_name:"sy"
                    }
                ],
                timeInfo: [
                    {
                        class_number:1,
                        week_day:1
                    },
                    {
                        class_number:1,
                        week_day:3
                    }
                ],
                introduction:"good",
                selectedNumber:0,
                classroom: {
                    id: 9,
                    classroom_name: "H3108",
                    capacity:100
                },
                capacity: 100,
                majorList: [
                    "软件工程"
                ],
                school_year: 2021,
                term:1
            }
        ]
    }
}