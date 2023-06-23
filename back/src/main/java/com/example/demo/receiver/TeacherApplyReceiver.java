package com.example.demo.receiver;

import com.example.demo.packageClass.ClassroomPackage;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.packageClass.UserPackage;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TeacherApplyReceiver {
    private  Integer id;//如果是新建的申请，则id设为-1

    private Integer course_id;

    private String name ;//课名

    private String number;//课程编号

    private String academy;//开课学院

    private String hour;//学时

    private String credit;//学分

    private UserPackage applicant;//申请者信息

    private String introduction;//介绍

    private List<UserPackage> userInfo;//教师信息

    private List<TimePackage> timeInfo;//时间信息

    private List<String> majorList;//哪些专业可以上这门课

    private ClassroomPackage classroom;//教室

    private String status;//审核状态

    private Integer capacity;//容量

    private String type;//add/change/delete

    private Integer school_year;//学年 如果是2020-2021，就传回来2020

    private Integer term;//学期 1代表第一学期，2代表第二学期

    private  Integer selected_number;

    public TeacherApplyReceiver(){
        timeInfo=new ArrayList<>();
        userInfo=new ArrayList<>();
        majorList=new ArrayList<>();
    }
}
