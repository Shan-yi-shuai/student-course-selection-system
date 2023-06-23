package com.example.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permission_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class Permission {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    //选课关闭，一轮选课开始，一轮选课结束，二轮选课开始，二轮选课结束
    @Column(name = "status",length = 256,nullable = false)
    private Integer status;
    @Column(name = "schoolYear",length = 256,nullable = false)
    private Integer schoolYear;
    @Column(name = "term",length = 256,nullable = false)
    private Integer term;
}
