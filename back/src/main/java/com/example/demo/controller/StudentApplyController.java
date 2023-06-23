package com.example.demo.controller;

import com.example.demo.receiver.StudentApplyReceiver;

import com.example.demo.send.Response;
import com.example.demo.service.StudentApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/student-apply")
public class StudentApplyController {
    private final StudentApplyService studentApplyService;

    @Autowired
    public StudentApplyController(StudentApplyService studentApplyService){
        this.studentApplyService=studentApplyService;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    ResponseEntity<Response<StudentApplyReceiver>> addApplication(@RequestBody StudentApplyReceiver studentApplyReceiver) {
        return studentApplyService.addApplication(studentApplyReceiver);
    }


    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<StudentApplyReceiver>> changeApplicationStatus(@RequestBody StudentApplyReceiver studentApplyReceiver) {
        return studentApplyService.changeStatus(studentApplyReceiver);
    }

    @GetMapping(path = "/view-all")
    public ResponseEntity<Response<List<StudentApplyReceiver>>> viewAllCourse() {
        return studentApplyService.getAllApplication();
    }

    @GetMapping(path = "/view-student")
    public @ResponseBody
    ResponseEntity<Response<List<StudentApplyReceiver>>> viewTeacherCourse(@RequestParam("number") String number) {
        return studentApplyService.getStudentApplication(number);
    }
}
