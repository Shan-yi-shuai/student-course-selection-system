package com.example.demo.receiver;

import lombok.Data;


@Data
public class PermissionReceiver {
    //五种情况：0选课关闭，1一轮选课开始，2一轮选课结束，3二轮选课开始，4二轮选课结束
    private Integer status;

    private Integer school_year;//学年，2019-2020记作2019

    private Integer term;//学期，1/2
}
