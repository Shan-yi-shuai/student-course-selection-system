package com.example.demo.controller;

import com.example.demo.packageClass.Condition;
import com.example.demo.receiver.StudentApplyReceiver;
import com.example.demo.receiver.StudentCourseReceiver;
import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import com.example.demo.receiver.CourseReceiver;
import com.example.demo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/course")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @PostMapping(path = "/add")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> addCourse(@RequestBody CourseReceiver courseReceiver) {
        return courseService.addCourse(courseReceiver);
    }

    @PostMapping(path = "/add-all")
    public @ResponseBody
    ResponseEntity<List<Response<CourseReceiver>>> addAllCourse(@RequestBody List<CourseReceiver> courseReceiverList) {
        List<Response<CourseReceiver>> responseList=new ArrayList<>();
        for(CourseReceiver courseReceiver:courseReceiverList){
            ResponseEntity<Response<CourseReceiver>> r=courseService.addCourse(courseReceiver);
            responseList.add(r.getBody());
        }
        return ResponseEntity.ok(responseList);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> deleteCourse(@RequestBody CourseReceiver courseReceiver) {
        return courseService.deleteCourse(courseReceiver);
    }

    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> changeCourse(@RequestBody CourseReceiver courseReceiver) {
        return courseService.changeCourse(courseReceiver);
    }

    @GetMapping(path = "/view-all")
    public ResponseEntity<Response<List<CourseReceiver>>> viewAllCourse() {
        return courseService.viewAllCourse();
    }

    //获取某个用户的课程（在lab3里面就是获取某个老师的课程）
    @GetMapping(path = "/view-user")
    public ResponseEntity<Response<List<CourseReceiver>>> viewUserCourse(@RequestParam("user_number") String user_number) {
        return courseService.getCourseByUser(user_number);
    }

    //获取某个专业可以上的课程
    @GetMapping(path = "/view-major")
    public ResponseEntity<Response<List<CourseReceiver>>> viewMajorCourse(@RequestParam("major") String major) {
        return courseService.getCourseByMajor(major);
    }

    //教师申请接口
    @PostMapping(path = "/apply-add")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> addCourse(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        CourseReceiver courseReceiver=courseService.teacherApplyReceiverConvert(teacherApplyReceiver);
        return courseService.addCourse(courseReceiver);
    }

    @PostMapping(path = "/apply-delete")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> deleteCourse(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        CourseReceiver courseReceiver=courseService.teacherApplyReceiverConvert(teacherApplyReceiver);
        return courseService.deleteCourse(courseReceiver);
    }

    @PostMapping(path = "/apply-change")
    public @ResponseBody
    ResponseEntity<Response<CourseReceiver>> changeCourse(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        CourseReceiver courseReceiver=courseService.teacherApplyReceiverConvert(teacherApplyReceiver);
        return courseService.changeCourse(courseReceiver);
    }
    @GetMapping(path = "/view-student")
    public @ResponseBody
    ResponseEntity<Response<List<CourseReceiver>>> getCoursesByUser(@RequestParam("number") String number) {
        return courseService.getCourseByNumber(number);
    }

    @PostMapping(path = "/search")
    public @ResponseBody
    ResponseEntity<Response<List<CourseReceiver>>> searchCourse(@RequestBody Condition condition) {
        return courseService.searchCourse(condition);
    }

    @GetMapping(path = "/view-selected")//已选课程
    public ResponseEntity<Response<List<CourseReceiver>>> viewStudentSelectedCourse(@RequestParam("number") String number) {
        return courseService.getStudentSelectedCourse(number);
    }
    @GetMapping(path = "/view-to-select")//可选课程
    public ResponseEntity<Response<List<CourseReceiver>>> viewStudentToSelectCourse(@RequestParam("number") String number) {
        return courseService.getStudentToSelectCourse(number);
    }
    @GetMapping(path = "/view-finished")//已修课程
    public ResponseEntity<Response<List<CourseReceiver>>> viewStudentFinishedCourse(@RequestParam("number") String number) {
        return courseService.getStudentFinishedCourse(number);
    }
    @PostMapping(path = "/select")
    public @ResponseBody
    ResponseEntity<Response<StudentCourseReceiver>> studentSelectCourse(@RequestBody StudentCourseReceiver studentCourseReceiver) {

        return courseService.studentSelectCourse(studentCourseReceiver,false);
    }
    @PostMapping(path = "/apply-select")
    public @ResponseBody
    ResponseEntity<Response<StudentCourseReceiver>> studentSelectCourse(@RequestBody StudentApplyReceiver studentApplyReceiver) {
        StudentCourseReceiver studentCourseReceiver=courseService.studentCourseReceiverConvert(studentApplyReceiver);
        return courseService.studentSelectCourse(studentCourseReceiver,true);
    }
    @PostMapping(path = "/drop")
    public @ResponseBody
    ResponseEntity<Response<StudentCourseReceiver>> studentDropCourse(@RequestBody StudentCourseReceiver studentCourseReceiver) {

        return courseService.studentDropCourse(studentCourseReceiver);
    }

}
