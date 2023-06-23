package com.example.demo.entity;


import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course_table")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Course {
    @Id
    @GeneratedValue(generator = "jpa=uuid", strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 35, nullable = false)
    private Integer id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;//课程名

    @Column(name = "number", length = 256, nullable = false)
    private String number;//课程编号

    @ManyToOne
    @JoinColumn(name = "academyId")
    private Academy academy;//课程--学院--多对一关系

    @Column(name = "hour", length = 256, nullable = false)
    private String hour;//学时

    @Column(name = "credit", length = 256, nullable = false)
    private String credit;//学分

    @Column(name = "introduction",length = 256,nullable = false)
    private String introduction;//课程大纲
    @Column(name = "selectedNumber", length = 35, nullable = false)
    private Integer selectedNumber;//已选人数
    @Column(name = "capacity", length = 35, nullable = false)
    private Integer capacity;//课程容量

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    //映射中间表  joinColumns:当前表中的主键关联中间表的外键
    @JoinTable(name = "course_user_table", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> userSet = new HashSet<>();//学生老师--课程--多对多

    @OneToMany(mappedBy = "course")
    private Set<Time> timeSet=new HashSet<>();//课程--时间--一对多

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    //映射中间表  joinColumns:当前表中的主键关联中间表的外键
    @JoinTable(name = "course_major_table", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "major_id"))
    private Set<Major> majorSet = new HashSet<>();//专业--课程--多对多


    //TODO:2. 课程类需要修改
    //● 教室要改成一对多
    //● 学年和学期
    //● number还是一个

    @Column(name = "schoolYear", length = 35, nullable = false)
    private Integer schoolYear;//学年
    @Column(name = "term", length = 35, nullable = false)
    private Integer term;//学期

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "classRoomId")
    @NotFound(action= NotFoundAction.IGNORE)
    private ClassRoom classRoom;//课程--教室--多对一关系
}
