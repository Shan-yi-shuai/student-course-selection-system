package com.example.demo.service;

import com.example.demo.receiver.LoginReceiver;
import com.example.demo.receiver.UserReceiver;
import com.example.demo.send.Response;
import com.example.demo.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User getUserByUsername(String username);

    User getUserByUserId(Integer userid);

    User getUserByUserNumber(String number);

    ResponseEntity<Response<UserReceiver>> addUser(UserReceiver userReceiver);

    ResponseEntity<Response<LoginReceiver>> getLogin(LoginReceiver loginReceiver);

    ResponseEntity<Response<LoginReceiver>> setNewPassword(LoginReceiver loginReceiver);
    ResponseEntity<Response<UserReceiver>> changeUser(UserReceiver userReceiver);
    User receiveUser(UserReceiver userReceiver);
    UserReceiver sentUser(User user);
    ResponseEntity<Response<List<UserReceiver>>> viewAllUser();
    ResponseEntity<Response<UserReceiver>> viewOneUser(String number);
    // String generateUserNumber(CourseReceiver courseReceiver);
//    String getToken(User user);
//     void setToken(User user);
}
