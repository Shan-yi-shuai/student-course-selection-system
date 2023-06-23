package com.example.demo.service;

import com.example.demo.receiver.ClassroomReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ClassRoomService {
    ResponseEntity<Response<ClassroomReceiver>> addClassRoom(ClassroomReceiver classroomReceiver);

    ResponseEntity<Response<ClassroomReceiver>> changeClassRoom(ClassroomReceiver classroomReceiver);

    ResponseEntity<Response<ClassroomReceiver>> deleteClassRoom(ClassroomReceiver classroomReceiver);

    ResponseEntity<Response<List<ClassroomReceiver>>> showClassRoom();
}
