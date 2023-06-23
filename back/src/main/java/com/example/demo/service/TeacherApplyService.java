package com.example.demo.service;

import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TeacherApplyService {
    ResponseEntity<Response<TeacherApplyReceiver>> addApplication(TeacherApplyReceiver teacherApplyReceiver);

    ResponseEntity<Response<TeacherApplyReceiver>> changeStatus(TeacherApplyReceiver teacherApplyReceiver);

    ResponseEntity<Response<TeacherApplyReceiver>> deleteApplication(TeacherApplyReceiver teacherApplyReceiver);

    ResponseEntity<Response<List<TeacherApplyReceiver>>> viewAllApplication();

    ResponseEntity<Response<List<TeacherApplyReceiver>>> viewTeacherApplication(String number);
}
