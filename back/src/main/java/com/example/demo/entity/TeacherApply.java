package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher_apply_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class TeacherApply {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;

    @Column(name = "courseId",length = 256,nullable = false)
    private Integer courseId ;

    @Column(name = "courseName",length = 256,nullable = false)
    private String courseName ;//课程名称

    @Column(name = "applicantName",length = 256,nullable = false)
    private String applicantName;//申请人的名字

    @Column(name = "applicantNumber",length = 256,nullable = false)
    private String applicantNumber;//申请人的number

    @Column(name = "number",length = 256,nullable = false)
    private String number;//课程number

    @Column(name = "academy",length = 256,nullable = false)
    private String academy;//开课学院名称

    @Column(name = "hour",length = 256,nullable = false)
    private String hour;//学时

    @Column(name = "credit",length = 256,nullable = false)
    private String credit;//学分

    @Column(name = "introduction",length = 256,nullable = false)
    private String introduction;//课程大纲

    @Column(name = "classroomId",length = 256,nullable = false)
    private Integer classroomId;

    @Column(name = "capacity",length = 256,nullable = false)
    private Integer capacity;//课程容量

    @Column(name = "status",length = 256,nullable = false)
    private String status;//待审核这种

    @Column(name = "type",length = 256,nullable = false)
    private String type;//add/change/delete

    @Column(name = "schoolYear", length = 256, nullable = false)
    private Integer schoolYear;

    @Column(name = "term", length = 256, nullable = false)
    private Integer term;

    @Column(name = "selectedNumber", length = 35, nullable = false)
    private Integer selectedNumber;//已选人数


    @OneToMany(mappedBy = "teacherApply")
    private Set<TeacherApplyTime> timeSet=new HashSet<>();//上课时间

    @OneToMany(mappedBy = "teacherApply")
    private Set<TeacherApplyTeacher> teacherSet=new HashSet<>();//授课老师

    @OneToMany(mappedBy = "teacherApply")
    private Set<TeacherApplyMajor> majorSet=new HashSet<>();//可选课的专业
}
