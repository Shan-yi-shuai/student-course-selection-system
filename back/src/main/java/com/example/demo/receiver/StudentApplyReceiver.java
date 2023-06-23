package com.example.demo.receiver;

import com.example.demo.packageClass.UserPackage;
import lombok.Data;

@Data
public class StudentApplyReceiver {
    private  Integer id;//如果是新建的申请，则id设为-1

    private Integer course_id;//课程id,如果是新建的申请，则id设为-1

    private String course_name ;//课名

    private String course_number;//课程编号

    private UserPackage applicant;//申请者信息

    private String reason;//申请理由

    private Integer school_year;//学年 如果是2020-2021，就传回来2020

    private Integer term;//学期 1代表第一学期，2代表第二学期

    private String status;//审核状态
}
