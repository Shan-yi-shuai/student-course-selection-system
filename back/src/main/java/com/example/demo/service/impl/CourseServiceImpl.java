package com.example.demo.service.impl;

import com.example.demo.entity.*;
import com.example.demo.mapper.*;
import com.example.demo.packageClass.ClassroomPackage;
import com.example.demo.packageClass.Condition;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.packageClass.UserPackage;
import com.example.demo.receiver.CourseReceiver;
import com.example.demo.receiver.StudentApplyReceiver;
import com.example.demo.receiver.StudentCourseReceiver;
import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.*;

@Service
public class CourseServiceImpl implements CourseService {
    private CourseMapper courseMapper = null;
    private UserMapper userMapper = null;
    private TimeMapper timeMapper = null;
    private MajorMapper majorMapper = null;
    private AcademyMapper academyMapper =null;
    private ClassRoomMapper classRoomMapper=null;
    private PermissionMapper permissionMapper=null;

    @Autowired
    public CourseServiceImpl(CourseMapper courseMapper, UserMapper userMapper, TimeMapper timeMapper, MajorMapper majorMapper,AcademyMapper academyMapper,ClassRoomMapper classRoomMapper,PermissionMapper permissionMapper) {
        this.courseMapper = courseMapper;
        this.userMapper = userMapper;
        this.timeMapper = timeMapper;
        this.majorMapper = majorMapper;
        this.academyMapper = academyMapper;
        this.classRoomMapper=classRoomMapper;
        this.permissionMapper=permissionMapper;
    }

    //单独增(还差一个number判断重复)
    public ResponseEntity<Response<CourseReceiver>> addCourse(CourseReceiver courseReceiver) {
        if(!this.ifValid(courseReceiver)){
            return ResponseEntity.ok(new Response<>(0, "Some messages are invalid", courseReceiver));
        }
        if (this.ifConflict(courseReceiver)) {
            return ResponseEntity.ok(new Response<>(0, "Time and Location conflict", courseReceiver));
        }
        Course flag = courseMapper.getCourseById(courseReceiver.getId());
        if (flag != null) {
            return ResponseEntity.ok(new Response<>(0, "Number conflict", courseReceiver));
        }
        Course c = this.receiveCourse(courseReceiver);
        c.setNumber(generateCourseNumber(courseReceiver));
        for (UserPackage user_info : courseReceiver.getUserInfo()) {
            User user = userMapper.getUserByNumber(user_info.getUser_number());
            c.getUserSet().add(user);
        }
        List<Time> time_list = this.timeConvert(courseReceiver);
        for (Time time : time_list) {
            time.setCourse(c);
            Time t = timeMapper.save(time);
            c.getTimeSet().add(t);
        }
        for (String major : courseReceiver.getMajorList()) {
            Major major1 = majorMapper.getMajorByMajor(major);
            c.getMajorSet().add(major1);
        }
        Course c1 = courseMapper.save(c);
        if (c1 == null) {
            return ResponseEntity.ok(new Response<>(0, "Fail to add course", courseReceiver));
        } else {
            return ResponseEntity.ok(new Response<>(1, "Success to add course", sendCourse(c1)));
        }
    }


    //删
    @Transactional
    public ResponseEntity<Response<CourseReceiver>> deleteCourse(CourseReceiver courseReceiver) {
        Course c = courseMapper.getCourseById(courseReceiver.getId());
        if (c == null) {
            return ResponseEntity.ok(new Response<>(0, "Course did not exist", courseReceiver));
        }
        List<User> studentList=new ArrayList<>();

        for(User u:c.getUserSet()){
            if(u.getRole().equals("student")){
                studentList.add(u);
            }
        }
        if(studentList.size()!=0){
            return ResponseEntity.ok(new Response<>(0, "Can not delete course for students exist ", courseReceiver));
        }
        for (Time t : c.getTimeSet()) {
            timeMapper.deleteTimeById(t.getId());
        }
        courseMapper.deleteCourseById(courseReceiver.getId());
        return ResponseEntity.ok(new Response<>(1, "Success to delete course", courseReceiver));

    }

    //改(还差一个判断重复)
    public ResponseEntity<Response<CourseReceiver>> changeCourse(CourseReceiver courseReceiver) {
        if (this.ifConflict(courseReceiver)) {
            return ResponseEntity.ok(new Response<>(0, "Time and Location conflict", courseReceiver));
        }
        Course c = courseMapper.getCourseById(courseReceiver.getId());
        if (c == null) {
            return ResponseEntity.ok(new Response<>(0, "Course did not exist", courseReceiver));
        } else {
            for (Time t : c.getTimeSet()) {
                timeMapper.deleteTimeById(t.getId());
            }
            c.getUserSet().clear();
            c.getTimeSet().clear();
            for (UserPackage user_info : courseReceiver.getUserInfo()) {
                User user = userMapper.getUserByNumber(user_info.getUser_number());
                c.getUserSet().add(user);
            }
            List<Time> time_list = this.timeConvert(courseReceiver);
            for (Time time : time_list) {
                time.setCourse(c);
                Time t = timeMapper.save(time);
                c.getTimeSet().add(t);
            }
            for (String major : courseReceiver.getMajorList()) {
                Major major1 = majorMapper.getMajorByMajor(major);
                c.getMajorSet().add(major1);
            }
            //填入修改信息
            c.setName(courseReceiver.getName());
            c.setNumber(courseReceiver.getNumber());
            c.setAcademy(academyMapper.getAcademyByAcademyName(courseReceiver.getAcademy()));
            c.setHour(courseReceiver.getHour());
            c.setCredit(courseReceiver.getCredit());
            c.setIntroduction(courseReceiver.getIntroduction());
            c.setClassRoom(classRoomMapper.getClassRoomById(courseReceiver.getClassroom().getId()));
            c.setCapacity(courseReceiver.getCapacity());
            c.setSchoolYear(courseReceiver.getSchool_year());
            c.setTerm(courseReceiver.getTerm());
            courseMapper.save(c);
            return ResponseEntity.ok(new Response<>(1, "Success to change course", courseReceiver));
        }
    }


    //查所有课
    public List<CourseReceiver> getAllCourse() {
        List<CourseReceiver> courseReceiverList = new ArrayList<>();
        List<Course> courseList = courseMapper.findAll();
        for (Course course : courseList) {
            CourseReceiver courseReceiver = this.sendCourse(course);
            courseReceiverList.add(courseReceiver);
        }
        return courseReceiverList;
    }
    //查当前学期所有课
    public List<CourseReceiver> getAllCurrentCourse(Integer schoolYear,Integer term) {
        List<CourseReceiver> courseReceiverList = new ArrayList<>();
        List<Course> courseList = courseMapper.findAll();
        //Permission permission=permissionMapper.getPermissionBySchoolYearAndTerm(schoolYear,term);
        for (Course course : courseList) {
            if(course.getSchoolYear().equals(schoolYear)&course.getTerm().equals(term)){
                CourseReceiver courseReceiver = this.sendCourse(course);
                courseReceiverList.add(courseReceiver);
            }

        }
        return courseReceiverList;
    }

    //查一个老师上的课
    public ResponseEntity<Response<List<CourseReceiver>>> getCourseByUser(String user_number) {
        List<CourseReceiver> courseReceiverList = this.getAllCourse();
        List<CourseReceiver> userList = new ArrayList<>();
        for (CourseReceiver cr : courseReceiverList) {
            for (UserPackage user : cr.getUserInfo()) {
                if (user.getUser_number().equals(user_number)) {
                    userList.add(cr);
                    break;
                }
            }
        }
        return ResponseEntity.ok(new Response<>(1, "Success to send user's courses", userList));
    }

    //获取已选课程
    @Override
    public ResponseEntity<Response<List<CourseReceiver>>> getStudentSelectedCourse(String studentNumber) {
        User student=userMapper.getUserByNumber(studentNumber);
        if(student==null){
            return ResponseEntity.ok(new Response<>(0,"学生不存在",null));
        }
        else{
            List<CourseReceiver> courseReceiverList=new ArrayList<>();
            for(Course c:student.getCourseSet()){
                if(permissionMapper.getPermissionBySchoolYearAndTerm(c.getSchoolYear(),c.getTerm())!=null){//判断是否是已选
                    courseReceiverList.add(sendCourse(c));
                }
            }
            return ResponseEntity.ok(new Response<>(1,"成功查询已选课程",courseReceiverList));
        }
    }

    //查看可选课程
    @Override
    public ResponseEntity<Response<List<CourseReceiver>>> getStudentToSelectCourse(String studentNumber) {
        User student=userMapper.getUserByNumber(studentNumber);
        if(student==null){
            return ResponseEntity.ok(new Response<>(0,"学生不存在",null));
        }
        else{
            List<CourseReceiver> courseReceiverList=new ArrayList<>();
            List<Course> allCourse= courseMapper.getCoursesByMajorSetContaining(student.getMajor());
            for(Course c:allCourse){
                if(!c.getUserSet().contains(student)&&permissionMapper.getPermissionBySchoolYearAndTerm(c.getSchoolYear(),c.getTerm())!=null){
                    courseReceiverList.add(sendCourse(c));
                }
            }
            return ResponseEntity.ok(new Response<>(1,"成功查询可选课程",courseReceiverList));
        }
    }

    //查看已修课程
    @Override
    public ResponseEntity<Response<List<CourseReceiver>>> getStudentFinishedCourse(String studentNumber) {
        User student=userMapper.getUserByNumber(studentNumber);
        if(student==null){
            return ResponseEntity.ok(new Response<>(0,"学生不存在",null));
        }
        else{
            List<CourseReceiver> courseReceiverList=new ArrayList<>();
            for(Course c:student.getCourseSet()){
                if(permissionMapper.getPermissionBySchoolYearAndTerm(c.getSchoolYear(),c.getTerm())==null){//判断是否是已修
                    courseReceiverList.add(sendCourse(c));
                }
            }
            return ResponseEntity.ok(new Response<>(1,"成功查询已修课程",courseReceiverList));
        }
    }

    //选课
    @Override
    public ResponseEntity<Response<StudentCourseReceiver>> studentSelectCourse(StudentCourseReceiver studentCourseReceiver,boolean applyFlag) {
        User student=userMapper.getUserByNumber(studentCourseReceiver.getNumber());
        Course course=courseMapper.getCourseById(studentCourseReceiver.getCourseReceiver().getId());

        Permission permission=permissionMapper.getPermissionBySchoolYearAndTerm(course.getSchoolYear(),course.getTerm());
        if(student!=null&course!=null){
            if(!existSameNameCourse(student,course.getName())){
                if(applyFlag&&Objects.equals(course.getCapacity(),course.getSelectedNumber())&&course.getCapacity()<course.getClassRoom().getCapacity()){
                    course.setCapacity(course.getCapacity()+1);
                    courseMapper.save(course);
                }
                if(timeConflict(student,course)){
                    return ResponseEntity.ok(new Response<>(0,"课程时间冲突",studentCourseReceiver));
                }
                if(permission.getStatus()<2||course.getSelectedNumber()<course.getCapacity()){
                    course.getUserSet().add(student);
                    course.setSelectedNumber(course.getSelectedNumber()+1);
                    course=courseMapper.save(course);
                    studentCourseReceiver.getCourseReceiver().setSelectedNumber(course.getSelectedNumber());
                    return ResponseEntity.ok(new Response<>(1,"选课成功",studentCourseReceiver));
                }
                else {
                    return ResponseEntity.ok(new Response<>(0,"人数已满选课失败",studentCourseReceiver));
                }
            }
            else{
                return ResponseEntity.ok(new Response<>(0,"同类课程只允许选一门",studentCourseReceiver));
            }
        }
        else{
            return ResponseEntity.ok(new Response<>(0,"学生或者课程不存在",studentCourseReceiver));

        }
    }
    private boolean timeConflict(User student,Course course){
        for(Course selectedCourse:student.getCourseSet()){
            for(Time t:selectedCourse.getTimeSet()){
                for(Time t1:course.getTimeSet()){
                    if(t.getClassNumber().equals(t1.getClassNumber())&t.getWeekDay().equals(t1.getWeekDay())){
                        return true;
                    }
                }
            }
        }
        return false;

    }

    //退课
    @Override
    public ResponseEntity<Response<StudentCourseReceiver>> studentDropCourse(StudentCourseReceiver studentCourseReceiver) {
        User student=userMapper.getUserByNumber(studentCourseReceiver.getNumber());
        Course course=courseMapper.getCourseById(studentCourseReceiver.getCourseReceiver().getId());
        if(student!=null&course!=null){
            if(student.getCourseSet().contains(course)){
                course.getUserSet().remove(student);
                course.setSelectedNumber(course.getSelectedNumber()-1);
                course=courseMapper.save(course);
                studentCourseReceiver.getCourseReceiver().setSelectedNumber(course.getSelectedNumber());
                return ResponseEntity.ok(new Response<>(1,"退课成功",studentCourseReceiver));
            }
            else{
                return ResponseEntity.ok(new Response<>(0,"你未选此门课",studentCourseReceiver));
            }
        }
        else{
            return ResponseEntity.ok(new Response<>(0,"学生或者课程不存在",studentCourseReceiver));

        }
    }
    //生成课程number

    private String generateCourseNumber(CourseReceiver courseReceiver) {
        String number;
        Academy academy=academyMapper.getAcademyByAcademyName(courseReceiver.getAcademy());
        //TODO:三段，1学院id（四位），2课名集合代表编号（四位），
        String fore,mid,end;
        fore=String.format("%04d",academy.getId());
        mid=getMidNumber(courseReceiver.getName());
        end=getEndNumber(courseReceiver);
        number=fore+mid+"."+end;
        return number;
    }

    private String getEndNumber(CourseReceiver courseReceiver) {

        String endNumber="01";
        List<Course> courseList=courseMapper.findAllByNameAndSchoolYearAndTerm(courseReceiver.getName(),courseReceiver.getSchool_year(),courseReceiver.getTerm());
        List<String> endNumberList=new ArrayList<>();
        if(courseList.size()!=0){
            for(Course c:courseList){
                    endNumberList.add(c.getNumber().substring(9,11));
            }
            if(endNumberList.size()!=0){
                Integer currentMax=Integer.parseInt(Collections.max(endNumberList))+1;

                endNumber=String.format("%02d",currentMax);
            }

        }

        return  endNumber;
    }

    private String getMidNumber(String courseName) {
       List<Course>  courseList=courseMapper.findAllByName(courseName);
        String midNumber;
        if(courseList.size()!=0){
            Course course=courseList.get(0);
            midNumber=course.getNumber().substring(4,8);
        }
        else {
            List<String> midNumberList=new ArrayList<>();
            for(Course c:courseMapper.findAll()){

                midNumberList.add(c.getNumber().substring(4,8));
            }
            if(midNumberList.size()==0){
                midNumber="0001";
            }
            else{
                Integer currentMax=Integer.parseInt(Collections.max(midNumberList))+1;
                midNumber=String.format("%04d",currentMax);
            }

        }
        return  midNumber;
    }

    //查一个专业能上的课
    public ResponseEntity<Response<List<CourseReceiver>>> getCourseByMajor(String major) {
        List<CourseReceiver> courseReceiverList = this.getAllCourse();
        List<CourseReceiver> majorList = new ArrayList<>();
        for (CourseReceiver cr : courseReceiverList) {
            for (String m : cr.getMajorList()) {
                if (m == major) {
                    majorList.add(cr);
                    break;
                }
            }
        }
        return ResponseEntity.ok(new Response<>(1, "Success to send major's courses", courseReceiverList));
    }

    @Override
    public ResponseEntity<Response<List<CourseReceiver>>> getCourseByNumber(String number) {
        User user = userMapper.getUserByNumber(number);
        List<CourseReceiver> courseReceiverList = new ArrayList<>();
        for (Course c : courseMapper.getCoursesByMajorSetContaining(user.getMajor())) {
            courseReceiverList.add(sendCourse(c));
        }
        return ResponseEntity.ok(new Response<>(1, "Success to get courses by number", courseReceiverList));
    }

    public ResponseEntity<Response<List<CourseReceiver>>> viewAllCourse() {
        List<CourseReceiver> courseReceiverList = this.getAllCourse();
        return ResponseEntity.ok(new Response<>(1, "Success to send all course", courseReceiverList));
    }

    //搜索
    public ResponseEntity<Response<List<CourseReceiver>>> searchCourse(Condition condition) {
        List<CourseReceiver> courseReceiverList = this.getAllCourse();
        if(condition.getSchoolYear()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                if(!Objects.equals(c.getSchool_year(), condition.getSchoolYear())){
                    it.remove();
                }
            }
        }
        if(condition.getTerm()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                if(!Objects.equals(c.getTerm(), condition.getTerm())){
                    it.remove();
                }
            }
        }
        if(condition.getTime().getWeek_day()!=null&&condition.getTime().getClass_number()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                boolean flag=false;
                CourseReceiver c=it.next();
                for(TimePackage timePackage:c.getTimeInfo()){
                    if(timePackage.getWeek_day().equals(condition.getTime().getWeek_day())&&timePackage.getClass_number().equals(condition.getTime().getClass_number())){
                        flag=true;
                    }
                }
                if(!flag){
                    it.remove();
                }
            }
        }
        if(condition.getClassroomName()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                if(!c.getClassroom().getClassroom_name().equals(condition.getClassroomName())){
                    it.remove();
                }
            }
        }

        if(condition.getCourseNumber()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                if(!c.getNumber().contains(condition.getCourseNumber())&&!c.getNumber().equals(condition.getCourseNumber())){
                    it.remove();
                }
            }
        }

        if(condition.getCourseName()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                if(!(c.getName().contains(condition.getCourseName())||c.getName().equals(condition.getCourseName()))){
                    it.remove();
                }
            }
        }

        if(condition.getTeacherName()!=null){
            for(Iterator<CourseReceiver> it=courseReceiverList.iterator();it.hasNext();){
                CourseReceiver c=it.next();
                boolean flag=true;
                for(UserPackage userPackage: c.getUserInfo()){
                    if(userPackage.getUser_number().length()==8&&(userPackage.getUser_name().contains(condition.getTeacherName())||userPackage.getUser_name().equals(condition.getTeacherName()))){
                        flag=false;
                    }
                }
                if(flag)it.remove();
            }
        }

        return ResponseEntity.ok(new Response<>(1, "Success to get all eligible courses", courseReceiverList));
    }

    public Course receiveCourse(CourseReceiver courseReceiver) {
        Course c = new Course();
        c.setName(courseReceiver.getName());
        c.setNumber(courseReceiver.getNumber());
        c.setAcademy(academyMapper.getAcademyByAcademyName(courseReceiver.getAcademy()));
        c.setHour(courseReceiver.getHour());
        c.setCredit(courseReceiver.getCredit());
        c.setIntroduction(courseReceiver.getIntroduction());
        c.setClassRoom(classRoomMapper.getClassRoomByClassroomName(courseReceiver.getClassroom().getClassroom_name()));
        c.setCapacity(courseReceiver.getCapacity());
        c.setSelectedNumber(courseReceiver.getSelectedNumber());
        c.setSchoolYear(courseReceiver.getSchool_year());
        c.setTerm(courseReceiver.getTerm());
        c.setSelectedNumber(courseReceiver.getSelectedNumber());
        return c;
    }

    public CourseReceiver sendCourse(Course course) {
        CourseReceiver cr = new CourseReceiver();
        cr.setId(course.getId());
        cr.setName(course.getName());//课名
        cr.setNumber(course.getNumber());//课程编号
        cr.setAcademy(course.getAcademy().getAcademyName());//开课学院
        cr.setHour(course.getHour());//学时
        cr.setCredit(course.getCredit());//学分
        cr.setIntroduction(course.getIntroduction());//大纲
        cr.setClassroom(new ClassroomPackage(course.getClassRoom().getId(),course.getClassRoom().getClassroomName(),course.getClassRoom().getCapacity()));//教室
        cr.setCapacity(course.getCapacity());//容量
        cr.setSelectedNumber(course.getSelectedNumber());//已选人数
        cr.setSchool_year(course.getSchoolYear());//学年
        cr.setTerm(course.getTerm());//学期
        for (User user : course.getUserSet()) {//开课老师
            cr.getUserInfo().add(new UserPackage(user));
        }
        for (Time time : course.getTimeSet()) {//上课时间
            cr.getTimeInfo().add(new TimePackage(time));
        }
        for (Major major : course.getMajorSet()) {//选课专业
            cr.getMajorList().add(major.getMajor());
        }
        return cr;
    }


    public List<Time> timeConvert(CourseReceiver courseReceiver) {
        List<Time> timeList = new ArrayList<>();
        for (int i = 0; i < courseReceiver.getTimeInfo().size(); i++) {
            Time t = new Time(courseReceiver.getTimeInfo().get(i));
            timeList.add(t);
        }
        return timeList;
    }

    public CourseReceiver teacherApplyReceiverConvert(TeacherApplyReceiver teacherApplyReceiver) {
        CourseReceiver courseReceiver = new CourseReceiver();
        courseReceiver.setId(teacherApplyReceiver.getCourse_id());
        courseReceiver.setName(teacherApplyReceiver.getName());
        courseReceiver.setNumber(teacherApplyReceiver.getNumber());
        courseReceiver.setAcademy(teacherApplyReceiver.getAcademy());
        courseReceiver.setHour(teacherApplyReceiver.getHour());
        courseReceiver.setCredit(teacherApplyReceiver.getCredit());
        courseReceiver.setIntroduction(teacherApplyReceiver.getIntroduction());
        courseReceiver.setClassroom(teacherApplyReceiver.getClassroom());
        courseReceiver.setCapacity(teacherApplyReceiver.getCapacity());
        courseReceiver.setSchool_year(teacherApplyReceiver.getSchool_year());
        courseReceiver.setTerm(teacherApplyReceiver.getTerm());
        courseReceiver.setSelectedNumber(teacherApplyReceiver.getSelected_number());
        for (UserPackage userPackage : teacherApplyReceiver.getUserInfo()) {
            courseReceiver.getUserInfo().add(userPackage);
        }
        for (TimePackage timePackage : teacherApplyReceiver.getTimeInfo()) {
            courseReceiver.getTimeInfo().add(timePackage);
        }
        for (String major : teacherApplyReceiver.getMajorList()) {
            courseReceiver.getMajorList().add(major);
        }

        return courseReceiver;
    }

    public StudentCourseReceiver studentCourseReceiverConvert(StudentApplyReceiver studentApplyReceiver){
        StudentCourseReceiver studentCourseReceiver=new StudentCourseReceiver();
        CourseReceiver courseReceiver=new CourseReceiver();
        studentCourseReceiver.setNumber(studentApplyReceiver.getApplicant().getUser_number());
        courseReceiver.setId(studentApplyReceiver.getCourse_id());
        studentCourseReceiver.setCourseReceiver(courseReceiver);

        return studentCourseReceiver;
    }


    boolean ifConflict(CourseReceiver courseReceiver) {
        List<CourseReceiver> courseReceiverList = this.getAllCurrentCourse(courseReceiver.getSchool_year(),courseReceiver.getTerm());

        for (CourseReceiver cr : courseReceiverList) {
            boolean time_flag = false;
            boolean location_flag = false;
            for (UserPackage user : cr.getUserInfo()) {
                if(courseReceiver.getId().equals(cr.getId())){continue;}
                for(UserPackage teacher:courseReceiver.getUserInfo()){
                    if (user.getUser_number().equals(teacher.getUser_number())&&Objects.equals(user.getUser_number().length(),8)&&Objects.equals(teacher.getUser_number().length(),8)) {
                        System.out.println(user.getUser_number());
                        System.out.println(teacher.getUser_number());
                        for(TimePackage time1:cr.getTimeInfo()){
                            for(TimePackage time2:courseReceiver.getTimeInfo()){
                                if(time1.getClass_number().equals(time2.getClass_number())&&time1.getWeek_day().equals(time2.getWeek_day())){
                                    System.out.println(1);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }

            if (cr.getClassroom().getClassroom_name().equals(courseReceiver.getClassroom().getClassroom_name())) {
                location_flag = true;
            }
            for (int i = 0; i < cr.getTimeInfo().size(); i++) {
                for (int j = 0; j < courseReceiver.getTimeInfo().size(); j++) {
                    if (cr.getTimeInfo().get(i).getClass_number().equals(courseReceiver.getTimeInfo().get(j).getClass_number()) && cr.getTimeInfo().get(i).getWeek_day().equals(courseReceiver.getTimeInfo().get(j).getWeek_day())) {
                        time_flag = true;
                        if (time_flag && location_flag) {
                            if (!(Objects.equals(cr.getId(),courseReceiver.getId()))) {
                                System.out.println(2);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    public boolean ifApplyConflict(List<TimePackage> timeInfo, Integer classroom_id,Integer id,Integer schoolYear,Integer term) {
        List<CourseReceiver> courseReceiverList = this.getAllCourse();
        for (CourseReceiver cr : courseReceiverList) {
            boolean time_flag = false;
            boolean location_flag = false;
            if (cr.getClassroom().getId()==classroom_id) {
                location_flag = true;
            }
            for (int i = 0; i < cr.getTimeInfo().size(); i++) {
                for (int j = 0; j < timeInfo.size(); j++) {
                    if (cr.getTimeInfo().get(i).getClass_number().equals(timeInfo.get(j).getClass_number()) && cr.getTimeInfo().get(i).getWeek_day().equals(timeInfo.get(j).getWeek_day())) {
                        time_flag = true;
                        if (time_flag && location_flag) {
                            if (!cr.getId().equals(id)&&cr.getSchool_year().equals(schoolYear)&&cr.getTerm().equals(term)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    @Override
    public void oneTurnEndSelect(Integer schoolYear,Integer term) {
        List<Course> courseList=courseMapper.findAllBySchoolYearAndTerm(schoolYear,term);
        for(Course c:courseList){
            if(c.getSelectedNumber()>c.getCapacity()){
                dropStudent(c);
            }
        }
    }
    private void dropStudent(Course course){
        ArrayList<User>  userList=new ArrayList<>();
        for(User user:course.getUserSet()){//把所有学生取出来
            if(user.getRole().equals("student")){
                userList.add(user);
            }
        }
        userList.sort(Comparator.comparing(User::getNumber));
        String lastNumber=userList.get(course.getCapacity()-1).getNumber().substring(0,2);
        ArrayList<User>   toRemoveUserList=new ArrayList<>();
        for(int i=course.getCapacity();i<course.getSelectedNumber();i++){
            toRemoveUserList.add(userList.get(i));
        }
        if(userList.get(course.getCapacity()-1).getNumber().substring(0,2).equals(userList.get(course.getCapacity()).getNumber().substring(0,2))){
            List<User> randomUserList=new ArrayList<>();
            Integer counter=0;
            for(User user:userList){//将需要随机的人集合在一起
                if(user.getNumber().substring(0,2).equals(lastNumber)){
                    randomUserList.add(user);
                }
            }

            for(User user:userList.subList(course.getCapacity(),course.getSelectedNumber())){//把要随机的人清出来
                if(user.getNumber().substring(0,2).equals(lastNumber)){
                    toRemoveUserList.remove(user);
                    counter++;
                }
            }
            for(Integer index:generateRandom(counter,randomUserList.size()+1)){//确定随机的人，加入到清除列表中
                toRemoveUserList.add(randomUserList.get(index));
            }
        }
        course.getUserSet().removeAll(toRemoveUserList);
        course.setSelectedNumber(course.getCapacity());
        courseMapper.save(course);

    }

    List<Integer> generateRandom(Integer size,Integer max){
        List<Integer> randomList=new ArrayList<>();
        Integer counter=0;
        while(true){

            if(randomList.size()>=size){
                break;
            }
            Integer randomNum=(int)(Math.random()*max);
            if(!randomList.contains(randomNum)){
                randomList.add(randomNum);
                counter++;
            }
        }
        return randomList;
    }


    private boolean ifValid(CourseReceiver courseReceiver) {
        Academy academy = academyMapper.getAcademyByAcademyName(courseReceiver.getAcademy());
        ClassRoom classRoom = classRoomMapper.getClassRoomById(courseReceiver.getClassroom().getId());
        Course course=courseMapper.getCourseById(courseReceiver.getId());
        boolean userFlag = true;
        boolean majorFlag = true;
        for (UserPackage userPackage : courseReceiver.getUserInfo()) {
            User user = userMapper.getUserByNumberAndUsername(userPackage.getUser_number(), userPackage.getUser_name());
            if (user == null) {
                userFlag = false;
            }
        }
        for (String major : courseReceiver.getMajorList()) {
            Major major1 = majorMapper.getMajorByMajor(major);
            if (major1 == null) {
                majorFlag = false;
            }
        }
        if(academy!=null&&classRoom!=null&&course==null&&userFlag&&majorFlag){
            return true;
        }
        return false;
    }

    private boolean existSameNameCourse(User student,String courseName){
        for(Course c:student.getCourseSet()){
            if(c.getName().equals(courseName)){
                return true;
            }
        }
        return false;
    }


}