package com.example.demo.service.impl;

import com.example.demo.entity.ClassTime;
import com.example.demo.mapper.ClassTimeMapper;
import com.example.demo.send.Response;
import com.example.demo.service.ClassTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassTimeServiceImpl implements ClassTimeService {
    private ClassTimeMapper classTimeMapper=null;

    @Autowired
    ClassTimeServiceImpl(ClassTimeMapper classTimeMapper){
        this.classTimeMapper=classTimeMapper;
    }

    //改(前端只能修改开始上课时间，结束上课时间自动+45)
    public ResponseEntity<Response<ClassTime>> changeTime(ClassTime classTime){
        classTimeMapper.deleteAll();
        classTimeMapper.save(classTime);
        return ResponseEntity.ok(new Response<>(1,"Success to change class time",classTime));
    }

    //展示
    public ResponseEntity<Response<List<ClassTime>>> showClassTime(){
        List<ClassTime> classTimeList=classTimeMapper.findAll();
        return ResponseEntity.ok(new Response<>(1,"Success to send class time",classTimeList));
    }
}
