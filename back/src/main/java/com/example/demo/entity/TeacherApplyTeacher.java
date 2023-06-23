package com.example.demo.entity;



import com.example.demo.packageClass.UserPackage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher_apply_teacher_table")
public class TeacherApplyTeacher {
    @Id
    @GeneratedValue(generator = "jpa=uuid", strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 35, nullable = false)
    private Integer id;
    @Column(name = "userName", length = 256, nullable = false)
    private String userName;
    @Column(name = "userNumber", length = 256, nullable = false)
    private String userNumber;


    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)	//表示多方
    @JoinColumn(name ="teacherApply_id")	//维护一个外键，外键在Course一侧
    private TeacherApply teacherApply;

    public TeacherApplyTeacher(UserPackage userPackage){
       this.userName=userPackage.getUser_name();
       this.userNumber=userPackage.getUser_number();
    }
}
