package com.example.demo.service;


import com.example.demo.entity.Course;
import com.example.demo.mapper.CourseMapper;
import com.example.demo.receiver.CourseReceiver;
import com.example.demo.receiver.StudentCourseReceiver;
import com.example.demo.send.Response;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


@RunWith(SpringRunner.class)
@SpringBootTest

class CourseServiceTest {
    @Autowired
    private CourseService courseService;
    @Autowired
    private CourseMapper courseMapper;

    @Test
    @Transactional
    @Rollback()
    void getStudentSelectedCourseTest() {
        System.out.println("学生查看已选课程的单元测试");
        String studentNumber;
        ResponseEntity<Response<List<CourseReceiver>>> actualResult;
        //成功查询已选课程
        studentNumber="210002";//这是存在的学生
        actualResult = courseService.getStudentSelectedCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(1, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看已选课程测试失败");
        Assertions.assertEquals("成功查询已选课程", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //学生不存在
        studentNumber="210000";//这是不存在的学生
        actualResult= courseService.getStudentSelectedCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看可选课程测试失败");
        Assertions.assertEquals("学生不存在", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
    }

    @Test
    @Transactional
    @Rollback()
    void getStudentToSelectCourseTest() {
        System.out.println("学生查看可选课程的单元测试");
        String studentNumber;
        ResponseEntity<Response<List<CourseReceiver>>> actualResult;
        //成功查询可选课程
        studentNumber="210002";//这是存在的学生
        actualResult = courseService.getStudentToSelectCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(1, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看可选课程测试失败");
        Assertions.assertEquals("成功查询可选课程", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //学生不存在
        studentNumber="210000";//这是不存在的学生
        actualResult= courseService.getStudentToSelectCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看可选课程测试失败");
        Assertions.assertEquals("学生不存在", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
    }

    @Test
    @Transactional
    @Rollback()
    void getStudentFinishedCourseTest() {
        System.out.println("学生查看已修课程的单元测试");
        String studentNumber;
        ResponseEntity<Response<List<CourseReceiver>>> actualResult;
        //成功查询可选课程
        studentNumber="210002";//这是存在的学生
        actualResult = courseService.getStudentFinishedCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(1, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看已修课程测试失败");
        Assertions.assertEquals("成功查询已修课程", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //学生不存在
        studentNumber="210000";//这是不存在的学生
        actualResult= courseService.getStudentFinishedCourse(studentNumber);
        System.out.println(actualResult.getBody());
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "学生查看已修课程测试失败");
        Assertions.assertEquals("学生不存在", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
    }

    @Test
    @Transactional
    @Rollback()
    void studentSelectCourseTest() {
        System.out.println("学生选课的单元测试");
        String studentNumber;
        ResponseEntity<Response<StudentCourseReceiver>> actualResult;
        //同类课程只允许选一门
        studentNumber="210002";
        StudentCourseReceiver testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(55));
        actualResult=courseService.studentSelectCourse(testData,false);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("同类课程只允许选一门", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //人数已满选课失败
        studentNumber="210002";
        testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(54));
        actualResult=courseService.studentSelectCourse(testData,false);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("人数已满选课失败", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //选课成功
        studentNumber="210002";
        testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(56));
        actualResult=courseService.studentSelectCourse(testData,false);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(1, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("选课成功", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //学生或者课程不存在
        studentNumber="210000";
        testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(55));
        actualResult=courseService.studentSelectCourse(testData,false);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("学生或者课程不存在", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
    }

    @Test
    @Transactional
    @Rollback()
    void studentDropCourseTest() {
        System.out.println("学生退课单元测试");
        String studentNumber;
        ResponseEntity<Response<StudentCourseReceiver>> actualResult;
        //你未选此门课
        studentNumber="210002";
        StudentCourseReceiver testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(56));
        actualResult=courseService.studentDropCourse(testData);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("你未选此门课", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //退课成功
        studentNumber="210002";
        testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(53));
        actualResult=courseService.studentDropCourse(testData);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(1, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("退课成功", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
        //学生或者课程不存在
        studentNumber="210000";
        testData=setStudentCourseReceiver(studentNumber,courseMapper.getCourseById(55));
        actualResult=courseService.studentDropCourse(testData);
        Assertions.assertNotNull(actualResult,"返回数据为空");
        Assertions.assertEquals(HttpStatus.OK, actualResult.getStatusCode());
        Assertions.assertEquals(0, (int) Objects.requireNonNull(actualResult.getBody()).getCode(), "选课测试失败");
        Assertions.assertEquals("学生或者课程不存在", actualResult.getBody().getMsg());
        System.out.println(actualResult.getBody().getMsg());
    }
    private StudentCourseReceiver setStudentCourseReceiver(String studentNumber, Course course){
        StudentCourseReceiver studentCourseReceiver=new StudentCourseReceiver();
        studentCourseReceiver.setNumber(studentNumber);
        studentCourseReceiver.setCourseReceiver(courseService.sendCourse(course));
        return studentCourseReceiver;
    }
}