package com.example.demo.controller;


import com.example.demo.receiver.TeacherApplyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.TeacherApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/teacher-apply")
public class TeacherApplyController {
    private final TeacherApplyService teacherApplyService;

    @Autowired
    public TeacherApplyController(TeacherApplyService teacherApplyService){
        this.teacherApplyService=teacherApplyService;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    ResponseEntity<Response<TeacherApplyReceiver>> addApplication(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        return teacherApplyService.addApplication(teacherApplyReceiver);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody
    ResponseEntity<Response<TeacherApplyReceiver>> deleteApplication(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        return teacherApplyService.deleteApplication(teacherApplyReceiver);
    }

    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<TeacherApplyReceiver>> changeApplicationStatus(@RequestBody TeacherApplyReceiver teacherApplyReceiver) {
        return teacherApplyService.changeStatus(teacherApplyReceiver);
    }

    @GetMapping(path = "/view-all")
    public ResponseEntity<Response<List<TeacherApplyReceiver>>> viewAllCourse() {
        return teacherApplyService.viewAllApplication();
    }

    @GetMapping(path = "/view-teacher")
    public @ResponseBody
    ResponseEntity<Response<List<TeacherApplyReceiver>>> viewTeacherCourse(@RequestParam("number") String number) {
        return teacherApplyService.viewTeacherApplication(number);
    }
}
