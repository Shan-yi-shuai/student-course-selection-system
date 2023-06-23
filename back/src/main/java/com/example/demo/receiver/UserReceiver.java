package com.example.demo.receiver;

import lombok.Data;


@Data
public class UserReceiver {
    private String card;//身份证
    private String tel;//电话
    private String password;//密码
    private String email;//邮件
    private String username;//用户名
    private String role;//角色：admin、student、teacher
    private String number;//学号（六位），工号（八位）
    private String academy;//学院
    private String major;//专业
    private String state;//用户的状态，比如毕业，退休
}