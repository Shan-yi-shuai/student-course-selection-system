package com.example.demo.mapper;

import com.example.demo.entity.TeacherApplyTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TeacherApplyTeacherMapper extends JpaRepository<TeacherApplyTeacher,Long> {
    @Modifying
    @Transactional
    void deleteTeacherApplyTeacherById(Integer id);
}
