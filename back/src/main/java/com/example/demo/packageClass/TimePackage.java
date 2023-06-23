package com.example.demo.packageClass;

import com.example.demo.entity.TeacherApplyTime;
import com.example.demo.entity.Time;
import lombok.Data;

@Data
public class TimePackage {
    private Integer class_number;

    private Integer week_day;

    public TimePackage(Time time){
        this.class_number=time.getClassNumber();
        this.week_day=time.getWeekDay();
    }

    public TimePackage(TeacherApplyTime time){
        this.class_number=time.getClassNumber();
        this.week_day=time.getWeekDay();
    }

    public TimePackage(){}
}
