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
@Table(name = "class_time_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class ClassTime {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    @Column(name = "start1",length = 256,nullable = false)
    private Integer start1;
    @Column(name = "end1",length = 256,nullable = false)
    private Integer end1;
    @Column(name = "start2",length = 256,nullable = false)
    private Integer start2;
    @Column(name = "end2",length = 256,nullable = false)
    private Integer end2;
    @Column(name = "start3",length = 256,nullable = false)
    private Integer start3;
    @Column(name = "end3",length = 256,nullable = false)
    private Integer end3;
    @Column(name = "start4",length = 256,nullable = false)
    private Integer start4;
    @Column(name = "end4",length = 256,nullable = false)
    private Integer end4;
    @Column(name = "start5",length = 256,nullable = false)
    private Integer start5;
    @Column(name = "end5",length = 256,nullable = false)
    private Integer end5;
    @Column(name = "start6",length = 256,nullable = false)
    private Integer start6;
    @Column(name = "end6",length = 256,nullable = false)
    private Integer end6;
    @Column(name = "start7",length = 256,nullable = false)
    private Integer start7;
    @Column(name = "end7",length = 256,nullable = false)
    private Integer end7;
    @Column(name = "start8",length = 256,nullable = false)
    private Integer start8;
    @Column(name = "end8",length = 256,nullable = false)
    private Integer end8;
    @Column(name = "start9",length = 256,nullable = false)
    private Integer start9;
    @Column(name = "end9",length = 256,nullable = false)
    private Integer end9;
    @Column(name = "start10",length = 256,nullable = false)
    private Integer start10;
    @Column(name = "end10",length = 256,nullable = false)
    private Integer end10;
    @Column(name = "start11",length = 256,nullable = false)
    private Integer start11;
    @Column(name = "end11",length = 256,nullable = false)
    private Integer end11;
    @Column(name = "start12",length = 256,nullable = false)
    private Integer start12;
    @Column(name = "end12",length = 256,nullable = false)
    private Integer end12;
    @Column(name = "start13",length = 256,nullable = false)
    private Integer start13;
    @Column(name = "end13",length = 256,nullable = false)
    private Integer end13;
}
