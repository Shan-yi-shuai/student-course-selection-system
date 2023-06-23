package com.example.demo.service.impl;

import com.example.demo.entity.*;
import com.example.demo.mapper.*;
import com.example.demo.packageClass.ClassroomPackage;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.packageClass.UserPackage;
import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.CourseService;
import com.example.demo.service.TeacherApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherApplyServiceImpl implements TeacherApplyService {
    private TeacherApplyMapper teacherApplyMapper = null;
    private CourseService courseService = null;//强耦合不是很好
    private TeacherApplyTimeMapper teacherApplyTimeMapper = null;
    private TeacherApplyTeacherMapper teacherApplyTeacherMapper = null;
    private TeacherApplyMajorMapper teacherApplyMajorMapper=null;
    private ClassRoomMapper classRoomMapper=null;

    @Autowired
    public TeacherApplyServiceImpl(TeacherApplyMapper teacherApplyMapper, CourseService courseService, TeacherApplyTimeMapper teacherApplyTimeMapper,TeacherApplyTeacherMapper teacherApplyTeacherMapper,TeacherApplyMajorMapper teacherApplyMajorMapper,ClassRoomMapper classRoomMapper) {
        this.teacherApplyMapper = teacherApplyMapper;
        this.courseService = courseService;
        this.teacherApplyTimeMapper = teacherApplyTimeMapper;
        this.teacherApplyTeacherMapper=teacherApplyTeacherMapper;
        this.teacherApplyMajorMapper=teacherApplyMajorMapper;
        this.classRoomMapper=classRoomMapper;
    }


    //增（如果不符合要求不让申请，时间地点和别的课重合）
    public ResponseEntity<Response<TeacherApplyReceiver>> addApplication(TeacherApplyReceiver teacherApplyReceiver) {
        System.out.println(teacherApplyReceiver);
        if (courseService.ifApplyConflict(teacherApplyReceiver.getTimeInfo(), teacherApplyReceiver.getClassroom().getId(), teacherApplyReceiver.getCourse_id(),teacherApplyReceiver.getSchool_year(),teacherApplyReceiver.getTerm())) {
            return ResponseEntity.ok(new Response<>(0, "Application conflict with exist course", teacherApplyReceiver));
        }
        TeacherApply teacherApply = this.receiveTeacherApply(teacherApplyReceiver);
        List<TeacherApplyTime> time_list = this.timeConvert(teacherApplyReceiver);
        List<TeacherApplyTeacher> teacher_list = this.teacherConvert(teacherApplyReceiver);
        List<TeacherApplyMajor> major_list=this.majorConvert(teacherApplyReceiver);
        for(TeacherApplyTeacher teacher:teacher_list){
            teacher.setTeacherApply(teacherApply);
            TeacherApplyTeacher t=teacherApplyTeacherMapper.save(teacher);
            teacherApply.getTeacherSet().add(t);
        }
        for (TeacherApplyTime time : time_list) {
            time.setTeacherApply(teacherApply);
            TeacherApplyTime t = teacherApplyTimeMapper.save(time);
            teacherApply.getTimeSet().add(t);
        }
        for(TeacherApplyMajor major:major_list){
            major.setTeacherApply(teacherApply);
            TeacherApplyMajor t=teacherApplyMajorMapper.save(major);
            teacherApply.getMajorSet().add(t);
        }
       teacherApplyMapper.save(teacherApply);
        return ResponseEntity.ok(new Response<>(1, "Success to add application", teacherApplyReceiver));

    }

    //删除一个老师的申请
    @Transactional
    public ResponseEntity<Response<TeacherApplyReceiver>> deleteApplication(TeacherApplyReceiver teacherApplyReceiver) {
        TeacherApply teacherApply = teacherApplyMapper.getTeacherApplyById(teacherApplyReceiver.getId());
        if (teacherApply == null) {
            return ResponseEntity.ok(new Response<>(0, "Fail to delete application", teacherApplyReceiver));
        } else {
            for(TeacherApplyTime t:teacherApply.getTimeSet()){
                teacherApplyTimeMapper.deleteTeacherApplyTimeById(t.getId());
            }
            for(TeacherApplyMajor t:teacherApply.getMajorSet()){
                teacherApplyMajorMapper.deleteTeacherApplyMajorById(t.getId());
            }
            for(TeacherApplyTeacher t:teacherApply.getTeacherSet()){
                teacherApplyTeacherMapper.deleteTeacherApplyTeacherById(t.getId());
            }
            teacherApplyMapper.delete(teacherApply);
            return ResponseEntity.ok(new Response<>(1, "Success to delete application", teacherApplyReceiver));
        }
    }

    //改（只能修改状态，根据状态返回）
    public ResponseEntity<Response<TeacherApplyReceiver>> changeStatus(TeacherApplyReceiver teacherApplyReceiver) {
        if (teacherApplyReceiver.getId() < 0) {
            return ResponseEntity.ok(new Response<>(0, "Application does not exist", teacherApplyReceiver));
        }
        TeacherApply teacherApply = teacherApplyMapper.getTeacherApplyById(teacherApplyReceiver.getId());
        if (teacherApply == null) {
            return ResponseEntity.ok(new Response<>(0, "Application does not exist", teacherApplyReceiver));
        } else {
            teacherApply.setStatus(teacherApplyReceiver.getStatus());
            teacherApplyMapper.save(teacherApply);
            return ResponseEntity.ok(new Response<>(1, "Success to modify application", teacherApplyReceiver));
        }
    }


    //返回所有
    private List<TeacherApplyReceiver> getAllTeacherApply() {
        List<TeacherApplyReceiver> teacherApplyReceiverList = new ArrayList<>();
        List<TeacherApply> teacherApplyList = teacherApplyMapper.findAll();
        for (TeacherApply teacherApply : teacherApplyList) {
            TeacherApplyReceiver teacherApplyReceiver = this.sendTeacherApply(teacherApply);
            teacherApplyReceiverList.add(teacherApplyReceiver);
        }
        return teacherApplyReceiverList;
    }

    public ResponseEntity<Response<List<TeacherApplyReceiver>>> viewAllApplication() {
        List<TeacherApplyReceiver> teacherApplyReceiverList = this.getAllTeacherApply();
        return ResponseEntity.ok(new Response<>(1, "Sucess to send all applications", teacherApplyReceiverList));
    }

    //查看一个老师的所有申请
    public ResponseEntity<Response<List<TeacherApplyReceiver>>> viewTeacherApplication(String number) {
        List<TeacherApplyReceiver> teacherApplyReceiverList = this.getAllTeacherApply();
        List<TeacherApplyReceiver> teacherApplyReceiverList1=new ArrayList<>();
        for(TeacherApplyReceiver teacherApplyReceiver:teacherApplyReceiverList){
            if(teacherApplyReceiver.getApplicant().getUser_number().equals(number)){
                teacherApplyReceiverList1.add(teacherApplyReceiver);
            }
        }
        return ResponseEntity.ok(new Response<>(1, "Sucess to send teacher applications", teacherApplyReceiverList1));
    }


    private List<TeacherApplyTime> timeConvert(TeacherApplyReceiver teacherApplyReceiver) {
        List<TeacherApplyTime> timeList = new ArrayList<>();
        for (int i = 0; i < teacherApplyReceiver.getTimeInfo().size(); i++) {
            TeacherApplyTime t = new TeacherApplyTime(teacherApplyReceiver.getTimeInfo().get(i));
            timeList.add(t);
        }
        return timeList;
    }

    private List<TeacherApplyTeacher> teacherConvert(TeacherApplyReceiver teacherApplyReceiver) {
        List<TeacherApplyTeacher> teacherList = new ArrayList<>();
        for (int i = 0; i < teacherApplyReceiver.getUserInfo().size(); i++) {
            TeacherApplyTeacher t = new TeacherApplyTeacher(teacherApplyReceiver.getUserInfo().get(i));
            teacherList.add(t);
        }
        return teacherList;
    }

    private List<TeacherApplyMajor> majorConvert(TeacherApplyReceiver teacherApplyReceiver){
        List<TeacherApplyMajor> majorList=new ArrayList<>();
        for (int i = 0; i < teacherApplyReceiver.getMajorList().size(); i++) {
           TeacherApplyMajor t=new TeacherApplyMajor(teacherApplyReceiver.getMajorList().get(i));
            majorList.add(t);
        }
        return majorList;
    }

    //将前端传回来的数据转化成表的形式
    private TeacherApply receiveTeacherApply(TeacherApplyReceiver teacherApplyReceiver) {
        TeacherApply teacherApply = new TeacherApply();
//        teacherApply.setId(teacherApplyReceiver.getId());
        teacherApply.setCourseId(teacherApplyReceiver.getCourse_id());
        teacherApply.setCourseName(teacherApplyReceiver.getName());
        teacherApply.setNumber(teacherApplyReceiver.getNumber());
        teacherApply.setAcademy(teacherApplyReceiver.getAcademy());
        teacherApply.setHour(teacherApplyReceiver.getHour());
        teacherApply.setCredit(teacherApplyReceiver.getCredit());
        teacherApply.setCapacity(teacherApplyReceiver.getCapacity());
        teacherApply.setIntroduction(teacherApplyReceiver.getIntroduction());
        teacherApply.setApplicantName(teacherApplyReceiver.getApplicant().getUser_name());
        teacherApply.setApplicantNumber(teacherApplyReceiver.getApplicant().getUser_number());
        teacherApply.setClassroomId(teacherApplyReceiver.getClassroom().getId());
        teacherApply.setStatus(teacherApplyReceiver.getStatus());
        teacherApply.setType(teacherApplyReceiver.getType());
        teacherApply.setSchoolYear(teacherApplyReceiver.getSchool_year());
        teacherApply.setTerm(teacherApplyReceiver.getTerm());
        teacherApply.setSelectedNumber(teacherApplyReceiver.getSelected_number());
        return teacherApply;
    }

    private TeacherApplyReceiver sendTeacherApply(TeacherApply teacherApply) {
        TeacherApplyReceiver teacherApplyReceiver = new TeacherApplyReceiver();
        teacherApplyReceiver.setId(teacherApply.getId());
        teacherApplyReceiver.setCourse_id(teacherApply.getCourseId());
        teacherApplyReceiver.setApplicant(new UserPackage(teacherApply.getApplicantName(), teacherApply.getApplicantNumber()));
        teacherApplyReceiver.setClassroom(new ClassroomPackage(classRoomMapper.getClassRoomById(teacherApply.getClassroomId())));
        teacherApplyReceiver.setNumber(teacherApply.getNumber());
        teacherApplyReceiver.setName(teacherApply.getCourseName());
        teacherApplyReceiver.setAcademy(teacherApply.getAcademy());
        teacherApplyReceiver.setHour(teacherApply.getHour());
        teacherApplyReceiver.setCredit(teacherApply.getCredit());
        teacherApplyReceiver.setIntroduction(teacherApply.getIntroduction());
        teacherApplyReceiver.setCapacity(teacherApply.getCapacity());
        teacherApplyReceiver.setType(teacherApply.getType());
        teacherApplyReceiver.setSchool_year(teacherApply.getSchoolYear());
        teacherApplyReceiver.setTerm(teacherApply.getTerm());
        teacherApplyReceiver.setSelected_number(teacherApply.getSelectedNumber());
        for (TeacherApplyTeacher teacher : teacherApply.getTeacherSet()) {
            teacherApplyReceiver.getUserInfo().add(new UserPackage(teacher));
        }
        for (TeacherApplyTime time : teacherApply.getTimeSet()) {
            teacherApplyReceiver.getTimeInfo().add(new TimePackage(time));
        }
        for(TeacherApplyMajor major: teacherApply.getMajorSet()){
            teacherApplyReceiver.getMajorList().add(major.getMajor());
        }
        teacherApplyReceiver.setStatus(teacherApply.getStatus());
        return teacherApplyReceiver;
    }


}
