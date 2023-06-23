package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teacher_apply_major_table")
public class TeacherApplyMajor {
    @Id
    @GeneratedValue(generator = "jpa=uuid", strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 35, nullable = false)
    private Integer id;
    @Column(name = "major", length = 256, nullable = false)
    private String major;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)	//表示多方
    @JoinColumn(name ="teacherApply_id")	//维护一个外键，外键在Course一侧
    private TeacherApply teacherApply;

    public TeacherApplyMajor(String major){
        this.major=major;
    }
}
