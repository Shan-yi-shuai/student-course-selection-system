package com.example.demo.controller;


import com.example.demo.receiver.LoginReceiver;
import com.example.demo.receiver.UserReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("/hello")
    public String helloUser(){
        return "Hello";
    }



    @PostMapping(path="/register") // Map ONLY POST Requests
    public  @ResponseBody ResponseEntity<Response<UserReceiver>> addNewUser (@RequestBody UserReceiver userReceiver) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return userService.addUser(userReceiver);
    }

    @PostMapping(path="/register-all") // Map ONLY POST Requests
    public  @ResponseBody ResponseEntity<List<Response<UserReceiver>>> addAllUser (@RequestBody List<UserReceiver> userReceiverList) {
        List<Response<UserReceiver>> responseList=new ArrayList<>();
        for(UserReceiver userReceiver:userReceiverList){
            ResponseEntity<Response<UserReceiver>> r=userService.addUser(userReceiver);
            responseList.add(r.getBody());
        }
        return ResponseEntity.ok(responseList);
    }
    @PostMapping(path = "/login")
    public @ResponseBody ResponseEntity<Response<LoginReceiver>> getLogin(@RequestBody LoginReceiver loginReceiver) {

        return userService.getLogin(loginReceiver);
    }
    @PutMapping (path = "/change-password")
    public @ResponseBody ResponseEntity<Response<LoginReceiver>> addNewPassword(@RequestBody LoginReceiver loginReceiver){

        return userService.setNewPassword(loginReceiver);
    }

    @PostMapping(path = "/viewAllUser")
    public @ResponseBody ResponseEntity<Response<List<UserReceiver>>> getAllUser() {

        return userService.viewAllUser();
    }
    @PutMapping (path = "/change")
    public @ResponseBody ResponseEntity<Response<UserReceiver>> changeUser(@RequestBody UserReceiver userReceiver){

        return userService.changeUser(userReceiver);
    }
    @GetMapping(path = "/viewOneUser")
    public @ResponseBody ResponseEntity<Response<UserReceiver>> getOneUser(@RequestParam("number") String number) {

        return userService.viewOneUser(number);
    }
    @PostMapping(path = "/teacher-in-academy")
    public @ResponseBody ResponseEntity<Response<List<UserReceiver>>> getTeacherInAcademy(@RequestBody LoginReceiver loginReceiver) {
        return null;
        //return userService.getLogin(loginReceiver);
    }

}

