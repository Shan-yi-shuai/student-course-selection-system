package com.example.demo.packageClass;

import com.example.demo.entity.ClassRoom;
import lombok.Data;

@Data
public class ClassroomPackage {
    private  Integer id;
    private String classroom_name;
    private Integer capacity;

    public ClassroomPackage(Integer id,String classroom_name,Integer capacity){
        this.id=id;
        this.classroom_name=classroom_name;
        this.capacity=capacity;
    }

    public ClassroomPackage(ClassRoom classRoom){
        this.id=classRoom.getId();
        this.classroom_name=classRoom.getClassroomName();
        this.capacity=classRoom.getCapacity();
    }

}
