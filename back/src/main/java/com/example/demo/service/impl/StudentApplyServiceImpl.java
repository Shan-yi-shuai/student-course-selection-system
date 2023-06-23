package com.example.demo.service.impl;

import com.example.demo.entity.StudentApply;
import com.example.demo.mapper.CourseMapper;
import com.example.demo.mapper.StudentApplyMapper;
import com.example.demo.packageClass.UserPackage;
import com.example.demo.receiver.StudentApplyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.StudentApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentApplyServiceImpl implements StudentApplyService {
    private StudentApplyMapper studentApplyMapper=null;
    private CourseMapper courseMapper=null;

    @Autowired
    public StudentApplyServiceImpl( StudentApplyMapper studentApplyMapper,CourseMapper courseMapper){
        this.studentApplyMapper=studentApplyMapper;
        this.courseMapper=courseMapper;
    }


    //增加申请
    public ResponseEntity<Response<StudentApplyReceiver>> addApplication(StudentApplyReceiver studentApplyReceiver){
        StudentApply studentApply=receiveStudentApply(studentApplyReceiver);
        if(courseMapper.getCourseById(studentApplyReceiver.getCourse_id())!=null){
            studentApplyMapper.save(studentApply);
            return ResponseEntity.ok(new Response<>(1, "Success to add application", studentApplyReceiver));
        }
        return ResponseEntity.ok(new Response<>(0, "Course is not exist", studentApplyReceiver));
    }

    //审核申请（只能修改状态，根据状态返回）
    public ResponseEntity<Response<StudentApplyReceiver>> changeStatus(StudentApplyReceiver studentApplyReceiver){
        StudentApply studentApply=studentApplyMapper.findStudentApplyById(studentApplyReceiver.getId());
        if(studentApply==null){
            return ResponseEntity.ok(new Response<>(0, "Application does not exist", studentApplyReceiver));
        }
        else{
            studentApply.setStatus(studentApplyReceiver.getStatus());
            studentApplyMapper.save(studentApply);
            return ResponseEntity.ok(new Response<>(1, "Success to modify application",studentApplyReceiver));
        }

    }


    //获取所有学生的所有申请
    public ResponseEntity<Response<List<StudentApplyReceiver>>> getAllApplication(){
        List<StudentApply>studentApplyList=studentApplyMapper.findAll();
        List<StudentApplyReceiver>studentApplyReceiverList=new ArrayList<>();
        for(StudentApply studentApply:studentApplyList){
            studentApplyReceiverList.add(sendStudentApply(studentApply));
        }
        return ResponseEntity.ok(new Response<>(1, "Success to send all applications", studentApplyReceiverList));
    }

    //一个学生的所有申请
    public ResponseEntity<Response<List<StudentApplyReceiver>>> getStudentApplication(String studentNumber){
        List<StudentApply>studentApplyList=studentApplyMapper.findStudentAppliesByApplicantNumber(studentNumber);
        List<StudentApplyReceiver>studentApplyReceiverList=new ArrayList<>();
        for(StudentApply studentApply:studentApplyList){
            studentApplyReceiverList.add(sendStudentApply(studentApply));
        }
        return ResponseEntity.ok(new Response<>(1, "Success to send a student's applications", studentApplyReceiverList));
    }


    //receiver=>entity
    private StudentApply receiveStudentApply(StudentApplyReceiver studentApplyReceiver){
        StudentApply studentApply=new StudentApply();
        studentApply.setCourseId(studentApplyReceiver.getCourse_id());
        studentApply.setCourseName(studentApplyReceiver.getCourse_name());
        studentApply.setCourseNumber(studentApplyReceiver.getCourse_number());
        studentApply.setApplicantName(studentApplyReceiver.getApplicant().getUser_name());
        studentApply.setApplicantNumber(studentApplyReceiver.getApplicant().getUser_number());
        studentApply.setSchoolYear(studentApplyReceiver.getSchool_year());
        studentApply.setTerm(studentApplyReceiver.getTerm());
        studentApply.setReason(studentApplyReceiver.getReason());
        studentApply.setStatus(studentApplyReceiver.getStatus());
        return studentApply;
    }
    //entity=>receiver
    private StudentApplyReceiver sendStudentApply(StudentApply studentApply){
        StudentApplyReceiver studentApplyReceiver=new StudentApplyReceiver();
        studentApplyReceiver.setId(studentApply.getId());
        studentApplyReceiver.setCourse_id(studentApply.getCourseId());
        studentApplyReceiver.setCourse_name(studentApply.getCourseName());
        studentApplyReceiver.setCourse_number(studentApply.getCourseNumber());
        studentApplyReceiver.setApplicant(new UserPackage(studentApply.getApplicantName(),studentApply.getApplicantNumber()));
        studentApplyReceiver.setReason(studentApply.getReason());
        studentApplyReceiver.setSchool_year(studentApply.getSchoolYear());
        studentApplyReceiver.setTerm(studentApply.getTerm());
        studentApplyReceiver.setStatus(studentApply.getStatus());
        return studentApplyReceiver;
    }
}
