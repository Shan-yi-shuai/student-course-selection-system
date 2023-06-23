package com.example.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "classroom_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class ClassRoom {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    @Column(name = "classroomName",length = 256,nullable = false)
    private String classroomName;
    @Column(name = "capacity",length = 256,nullable = false)
    private Integer capacity;
    @OneToMany(targetEntity = Course.class,mappedBy = "classRoom")
    private Set<Course> courseSet=new HashSet<>();

    public ClassRoom(String classroom_name){
        this.classroomName=classroom_name;
    }
}
