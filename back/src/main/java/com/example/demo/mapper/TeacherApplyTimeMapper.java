package com.example.demo.mapper;

import com.example.demo.entity.TeacherApplyTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TeacherApplyTimeMapper extends JpaRepository<TeacherApplyTime,Long> {
    @Modifying
    @Transactional
    void deleteTeacherApplyTimeById(Integer id);
}
