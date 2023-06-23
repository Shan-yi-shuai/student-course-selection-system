package com.example.demo.controller;


import com.example.demo.receiver.ClassroomReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.ClassRoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/classroom")
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @Autowired
    public ClassRoomController(ClassRoomService classRoomService){
        this.classRoomService=classRoomService;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    ResponseEntity<Response<ClassroomReceiver>> addClassRoom(@RequestBody ClassroomReceiver classroomReceiver) {
        return classRoomService.addClassRoom(classroomReceiver);
    }

    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<ClassroomReceiver>> changeClassRoom(@RequestBody ClassroomReceiver classroomReceiver) {
        return classRoomService.changeClassRoom(classroomReceiver);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody
    ResponseEntity<Response<ClassroomReceiver>> deleteClassRoom(@RequestBody ClassroomReceiver classroomReceiver) {
        return classRoomService.deleteClassRoom(classroomReceiver);
    }

    @GetMapping(path = "/view")
    public @ResponseBody
    ResponseEntity<Response<List<ClassroomReceiver>>> viewClassRoom() {
        return classRoomService.showClassRoom();
    }
}
