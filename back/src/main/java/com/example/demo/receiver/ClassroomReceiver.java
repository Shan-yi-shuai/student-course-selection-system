package com.example.demo.receiver;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data

public class ClassroomReceiver {
    private Integer id;//如果是新增的教室，则id设为-1

    private String classroom_name;

    private Integer capacity;

    private List<CourseReceiver> courseList;

    public ClassroomReceiver(){
        this.courseList=new ArrayList<>();
    }
}
