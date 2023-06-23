package com.example.demo.entity;

import com.example.demo.packageClass.TimePackage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher_apply_time_table")
public class TeacherApplyTime {
    @Id
    @GeneratedValue(generator = "jpa=uuid", strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 35, nullable = false)
    private Integer id;
    @Column(name = "classNumber", length = 256, nullable = false)
    private Integer classNumber;
    @Column(name = "weekDay", length = 256, nullable = false)
    private Integer weekDay;


    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)	//表示多方
    @JoinColumn(name ="teacherApply_id")	//维护一个外键，外键在Course一侧
    private TeacherApply teacherApply;

    public TeacherApplyTime(TimePackage timePackage){
        this.classNumber=timePackage.getClass_number();
        this.weekDay=timePackage.getWeek_day();
    }
}
