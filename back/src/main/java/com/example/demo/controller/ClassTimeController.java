package com.example.demo.controller;

import com.example.demo.entity.ClassTime;
import com.example.demo.send.Response;
import com.example.demo.service.ClassTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/class-time")
public class ClassTimeController {
    private final ClassTimeService classTimeService;

    @Autowired
    public ClassTimeController(ClassTimeService classTimeService){
        this.classTimeService=classTimeService;
    }

    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<ClassTime>> changeClassTime(@RequestBody ClassTime classTime) {
        return classTimeService.changeTime(classTime);
    }

    @GetMapping(path = "/view")
    public ResponseEntity<Response<List<ClassTime>>> viewClassTime() {
        return classTimeService.showClassTime();
    }
}
