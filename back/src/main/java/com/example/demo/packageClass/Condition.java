package com.example.demo.packageClass;

import lombok.Data;

@Data
public class Condition {
    private Integer schoolYear;
    private Integer term;
    private TimePackage time;
    private String classroomName;
    private String courseNumber;
    private String courseName;
    private String teacherName;
}
