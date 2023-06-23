package com.example.demo.entity;


import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "academy_table")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Academy {
    @Id
    @GeneratedValue(generator = "jpa=uuid", strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 35, nullable = false)
    private Integer id;
    @Column(name = "academyName", length = 256, nullable = false)
    private String academyName;//专业名


    @OneToMany(targetEntity = Major.class,mappedBy = "academy")
    private Set<Major> majorSet= new HashSet<>();

    @OneToMany(targetEntity = Course.class,mappedBy = "academy")
    private Set<Course> courseSet=new HashSet<>();



}
