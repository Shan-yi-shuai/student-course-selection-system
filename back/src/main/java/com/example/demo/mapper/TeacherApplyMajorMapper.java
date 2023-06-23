package com.example.demo.mapper;

import com.example.demo.entity.TeacherApplyMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TeacherApplyMajorMapper  extends JpaRepository<TeacherApplyMajor,Long> {
    @Modifying
    @Transactional
    void deleteTeacherApplyMajorById(Integer id);
}
