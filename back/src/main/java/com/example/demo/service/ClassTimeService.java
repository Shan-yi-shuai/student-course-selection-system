package com.example.demo.service;

import com.example.demo.entity.ClassTime;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ClassTimeService {
    ResponseEntity<Response<ClassTime>> changeTime(ClassTime classTime);

    ResponseEntity<Response<List<ClassTime>>> showClassTime();
}
