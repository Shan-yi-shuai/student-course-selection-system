package com.example.demo.mapper;

import com.example.demo.entity.TeacherApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherApplyMapper extends JpaRepository<TeacherApply,Long> {
    TeacherApply getTeacherApplyById(Integer id);
}
