package com.example.demo.controller;


import com.example.demo.receiver.AcademyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.AcademyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/academy")
public class AcademyController {

    private final AcademyService academyService;
    @Autowired
    public AcademyController(AcademyService academyService) {

        this.academyService = academyService;
    }

    @PostMapping("/view-all")
    public @ResponseBody ResponseEntity<Response<List<AcademyReceiver>>> viewAllAcademy(){

        return academyService.viewAllAcademy();
    }
    @PutMapping("/add")
    public @ResponseBody ResponseEntity<Response<AcademyReceiver>> addAcademy(@RequestBody AcademyReceiver academyReceiver){
        System.out.println(academyReceiver);
        return academyService.addAcademy(academyReceiver);
    }
    @PutMapping("/change-delete")
    public @ResponseBody ResponseEntity<Response<AcademyReceiver>> changeAndDeleteAcademy(@RequestBody AcademyReceiver academyReceiver){

        return academyService.changeAndDeleteAcademy(academyReceiver);
    }
}
