package com.example.demo.service;

import com.example.demo.receiver.StudentApplyReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StudentApplyService {
    ResponseEntity<Response<StudentApplyReceiver>> addApplication(StudentApplyReceiver studentApplyReceiver);

    ResponseEntity<Response<StudentApplyReceiver>> changeStatus(StudentApplyReceiver studentApplyReceiver);

    ResponseEntity<Response<List<StudentApplyReceiver>>> getAllApplication();

    ResponseEntity<Response<List<StudentApplyReceiver>>> getStudentApplication(String studentNumber);
}
