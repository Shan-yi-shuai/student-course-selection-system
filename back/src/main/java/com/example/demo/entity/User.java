package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
@GenericGenerator(name = "jpa-uuid",strategy = "uuid")
public class User {
    @Id
    @GeneratedValue(generator = "jpa=uuid",strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 35,nullable = false)
    private Integer id;
    @Column(name = "card",length = 256,nullable = false)
    private String card;//身份证
    @Column(name = "tel",length = 256,nullable = false)
    private String tel;//电话
    @Column(name = "password",length = 256,nullable = false)
    private String password;//密码
    @Column(name = "email",length = 256,nullable = false)
    private String email;//邮箱
    @Column(name = "username",length = 256,nullable = false)
    private String username;//用户名
    @Column(name = "role",length = 256,nullable = false)
    private String role;//角色
    @Column(name = "number",length = 256,nullable = false)
    private String number;//学工号
    @Column(name = "token",length = 512,nullable = false)
    private String token;
    @Column(name = "state",length = 256,nullable = false)
    private String state;//状态
    @ManyToOne
    @JoinColumn(name = "major_id")
    private Major major;

    @ManyToMany(mappedBy = "userSet")
    private Set<Course> courseSet=new HashSet<>();




    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
