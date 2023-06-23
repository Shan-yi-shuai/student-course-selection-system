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
@Table(name = "major_table")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Major {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    @Column(name = "major",length = 256,nullable = false)
    private String major;//专业名

    @ManyToOne
    @JoinColumn(name = "academyId")//专业对应的学院
    private Academy academy;


    @ManyToMany(mappedBy = "majorSet")
    private Set<Course> courseSet=new HashSet<>();

    @OneToMany(targetEntity = User.class,mappedBy = "major")
    private Set<User> userSet=new HashSet<>();
}