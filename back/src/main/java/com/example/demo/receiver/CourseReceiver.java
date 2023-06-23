package com.example.demo.receiver;

import com.example.demo.packageClass.ClassroomPackage;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.packageClass.UserPackage;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CourseReceiver {
    private Integer id;//新增课程id为-1

    private String name ;//课名

    private String number;//课程编号

    private String academy;//开课学院

    private String hour;//学时

    private String credit;//学分

    private List<UserPackage> userInfo;//开课教师相关信息

    private List<TimePackage> timeInfo;//开课时间相关信息

    private String introduction;//课程介绍

    private Integer selectedNumber;//已选人数

    private ClassroomPackage classroom;//

    private Integer capacity;//课程容量

    private List<String> majorList;//可选此课的专业

    private Integer school_year;//学年 如果是2020-2021，就传回来2020

    private Integer term;//学期 1代表第一学期，2代表第二学期

    public CourseReceiver(){
        userInfo=new ArrayList<>();
        timeInfo=new ArrayList<>();
        majorList=new ArrayList<>();
    }
}
