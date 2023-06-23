package com.example.demo.service;

import com.example.demo.entity.Course;
import com.example.demo.packageClass.Condition;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.receiver.CourseReceiver;
import com.example.demo.receiver.StudentApplyReceiver;
import com.example.demo.receiver.StudentCourseReceiver;
import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {
    public ResponseEntity<Response<CourseReceiver>> addCourse(CourseReceiver courseReceiver);

    ResponseEntity<Response<CourseReceiver>> deleteCourse(CourseReceiver courseReceiver);

    ResponseEntity<Response<CourseReceiver>> changeCourse(CourseReceiver courseReceiver);

    ResponseEntity<Response<List<CourseReceiver>>> viewAllCourse();

    ResponseEntity<Response<List<CourseReceiver>>> getCourseByUser(String user_number);


    Course receiveCourse(CourseReceiver courseReceiver);

    CourseReceiver sendCourse(Course course);

    CourseReceiver teacherApplyReceiverConvert(TeacherApplyReceiver teacherApplyReceiver);

    StudentCourseReceiver studentCourseReceiverConvert(StudentApplyReceiver studentApplyReceiver);

    ResponseEntity<Response<List<CourseReceiver>>> getCourseByMajor(String major);
    ResponseEntity<Response<List<CourseReceiver>>> getCourseByNumber(String number);

    ResponseEntity<Response<List<CourseReceiver>>> searchCourse(Condition condition);

    boolean ifApplyConflict(List<TimePackage> timeInfo, Integer classroom_id,Integer id,Integer schoolYear,Integer term);
    void oneTurnEndSelect(Integer schoolYear,Integer term);
    ResponseEntity<Response<List<CourseReceiver>>> getStudentSelectedCourse(String studentNumber);//已选
    ResponseEntity<Response<List<CourseReceiver>>> getStudentToSelectCourse(String studentNumber);//可选
    ResponseEntity<Response<List<CourseReceiver>>> getStudentFinishedCourse(String studentNumber);//已修
    ResponseEntity<Response<StudentCourseReceiver>> studentSelectCourse(StudentCourseReceiver studentCourseReceiver,boolean applyFlag);//选课
    ResponseEntity<Response<StudentCourseReceiver>> studentDropCourse(StudentCourseReceiver studentCourseReceiver);//退课
    //String generateCourseNumber(CourseReceiver courseReceiver);//生成
}
