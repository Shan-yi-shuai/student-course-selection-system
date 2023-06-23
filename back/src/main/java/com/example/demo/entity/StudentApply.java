package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_apply_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class StudentApply {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    @Column(name = "courseId",length = 256,nullable = false)
    private Integer courseId ;
    @Column(name = "courseName",length = 256,nullable = false)
    private String courseName ;
    @Column(name = "courseNumber",length = 256,nullable = false)
    private String courseNumber;
    @Column(name = "applicantName",length = 256,nullable = false)
    private String applicantName;
    @Column(name = "applicantNumber",length = 256,nullable = false)
    private String applicantNumber;
    @Column(name = "schoolYear", length = 256, nullable = false)
    private Integer schoolYear;
    @Column(name = "term", length = 256, nullable = false)
    private Integer term;
    @Column(name = "reason",length = 256,nullable = false)
    private String reason;
    @Column(name = "status",length = 256,nullable = false)
    private String status;
}
