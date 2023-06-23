package com.example.demo.packageClass;

import com.example.demo.entity.TeacherApplyTeacher;
import com.example.demo.entity.User;
import lombok.Data;

@Data
public class UserPackage {
    private String user_number;

    private String user_name;

    public UserPackage(User user){
        this.user_name=user.getUsername();
        this.user_number=user.getNumber();
    }

    public UserPackage(TeacherApplyTeacher teacher){
        this.user_name=teacher.getUserName();
        this.user_number=teacher.getUserNumber();
    }

    public UserPackage(String user_name,String user_number){
        this.user_name=user_name;
        this.user_number=user_number;
    }

    public UserPackage(){}
}
