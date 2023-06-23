export function userinfo_to_string(userinfo) {
    let return_string = ""
    let info_length = userinfo.length
    for (let i = 0; i < info_length; i++) {
        return_string += userinfo[i].user_name
        if (i !== info_length - 1) {
            return_string += ", "
        }
    }
    return return_string
}

export function timeinfo_to_string(timeinfo) {
    let return_str = ""
    let time_length = timeinfo.length
    for (let i = 0; i < time_length; i++) {
        let incre = ""
        switch (timeinfo[i].week_day) {
            case 1:
                incre += "Mon ";
                break;
            case 2:
                incre += "Tue ";
                break;
            case 3:
                incre += "Wed ";
                break;
            case 4:
                incre += "Thu ";
                break;
            case 5:
                incre += "Fri ";
                break;
            case 6:
                incre += "Sat ";
                break;
            case 7:
                incre += "Sun ";
                break;
            default:
                // console.log(timeinfo[i].week_day)
        }
        incre += timeinfo[i].class_number
        return_str += incre
        if (i !== time_length - 1) {
            return_str += ", "
        }
    }
    return return_str
}

export function time_to_int(time) {
    let hh_mm = time.split(":")
    return parseInt(hh_mm[0]) * 60 + parseInt(hh_mm[1])
}

export function int_to_time(int) {
    let h = Math.floor(int / 60);
    let hh = h.toString();
    if (hh.length === 1) {
        hh = "0" + hh;
    }

    let m = int % 60;
    let mm = m.toString();
    if (mm.length === 1) {
        mm = "0" + mm;
    }
    return hh.toString() + ":" + mm
}

export function semester_to_string(year, term) {
    return year.toString() + "-" + term.toString()
}

function isEscapeString(str) {
    if (typeof(str) === 'string') {
        if (str[0] === ':') {
            return true;
        }
    }
    return false;
}

export function parse_to_object_list(data) {
    if (data[data.length - 1] === "") {
        data.pop();
    }
    let objArray = []
    let len = data.length
    for (let i = 1; i < len; i++) {
        objArray[i - 1] = {};
        let key_len = data[0].length;
        let this_len = data[i].length;
        for (let k = 0; k < key_len && k < this_len; k++) {
            let key = data[0][k];
            let val = data[i][k]
            if (isEscapeString(val)) {
                // val = eval("("+val.substring(1)+")")
                val = JSON.parse(val.substring(1))
            }
            objArray[i - 1][key] = val
        }
    }
    return objArray
}

export function password_re(password) {
    let has_digit = /[0-9]/;
    let has_letter = /[a-zA-Z-_]/;
    let has_char = /[-_]/;
    let reg1 = has_digit.test(password) && has_letter.test(password);
    let reg2 = has_letter.test(password) && has_char.test(password);
    let reg3 = has_char.test(password) && has_digit.test(password);
    return (reg1 || reg2 || reg3) && (!/[^0-9a-zA-Z-_]/.test(password));
}

export function email_re(email) {
    if (email) {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return !reg.test(email);
    } else return false;
}

export function id_card_re(id) {
    let reg = /[0123456789]{17}[0123456789xX]/;
    return !reg.test(id);
}

export function username_re(str) {
    let reg = /[\sa-zA-Z\p{Unified_Ideograph}]/u;
    for (let i = 0; i < str.length; i++)
        if (!reg.test(str.charAt(i))) {
            // console.log(str.charAt(i));
            return true;
        }
    return false;
}

export function has_only_digit(str) {
    let reg = /^[0-9]\d*$/;
    return reg.test(str);
}

export function filterUser(userInfo) {
    let teacherInfo = []
    let studentInfo = []
    userInfo.forEach((user) => {
        if (user.user_number.length === 8)
            teacherInfo.push(user)
        else studentInfo.push(user)
    })
    return {
        teacherInfo: teacherInfo,
        studentInfo: studentInfo
    };
}

export function http_to_json(each_application) {
    // console.log(each_application)
    let ui = userinfo_to_string(each_application.userInfo)
    let ti = timeinfo_to_string(each_application.timeInfo)
    return {
        id: each_application.id,
        course_id: each_application.course_id,
        name: each_application.name,
        number: each_application.number,
        academy: each_application.academy,
        hour: each_application.hour,
        credit: each_application.credit,
        applicant: each_application.applicant.user_name + " " + each_application.applicant.user_number,
        introduction: each_application.introduction,
        userinfo: ui,
        timeinfo: ti,
        userInfo: each_application.userInfo,
        timeInfo: each_application.timeInfo,
        location: each_application.classroom.classroom_name,
        classroom: each_application.classroom,
        status: each_application.status,
        capacity: each_application.capacity,
        type: each_application.type,
        majorList: each_application.majorList,
        school_year: each_application.school_year,
        term: each_application.term,
        selected_number: each_application.selected_number
    }
}

export function course_addition(each_table) {
    let users = filterUser(each_table.userInfo);
    let ui = userinfo_to_string(users.teacherInfo);
    let ti = timeinfo_to_string(each_table.timeInfo);

    return {
        id: each_table.id,
        name: each_table.name,
        number: each_table.number,
        academy: each_table.academy,
        hour: each_table.hour,
        credit: each_table.credit,
        userinfo: ui,
        userInfo: each_table.userInfo,
        timeinfo: ti,
        timeInfo: each_table.timeInfo,
        introduction: each_table.introduction,
        location: classroom_to_string(each_table.classroom),
        classroom: each_table.classroom,
        capacity: each_table.capacity,
        majorList: each_table.majorList,
        majors: each_table.majorList.join(","),
        selectedNumber: each_table.selectedNumber,
        year: each_table.school_year,
        term: each_table.term,
        semester: semester_to_string(each_table.school_year, each_table.term),
        studentInfo: users.studentInfo
    }
}

export function sortArray(attr) {
    return function(a, b) {
        return a[attr] - b[attr]
    }
}

function _notify(tp, msg, d) {
    return {
        type: tp,
        message: msg,
        duration: d
    }
}

export function catch_err(err) {
    // console.log(err)
}

export function message_err(err) {
    return _notify('error', err, 1800);
}

export function push_course(dt) {
    return {
        id: dt.id,
        name: dt.name,
        number: dt.number,
        academy: dt.academy,
        hour: dt.hour,
        credit: dt.credit,
        userInfo: dt.userInfo,
        timeInfo: dt.timeInfo,
        introduction: dt.introduction,
        classroom: dt.classroom,
        capacity: dt.capacity,
        majorList: dt.majorList,
        selectedNumber: dt.selectedNumber,
        school_year: dt.school_year,
        term: dt.term,
        time: [],
    }
}

export function classroom_to_string(classroom) {
    return classroom.classroom_name;
}

export function error_msg(res) {
    return _notify('error', res.data.msg, 1800);
}

export function success_msg(res) {
    return _notify('success', res.data.msg, 1800);
}

export function pass() {
    // return
}