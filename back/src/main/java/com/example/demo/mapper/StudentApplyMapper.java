package com.example.demo.mapper;

import com.example.demo.entity.StudentApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentApplyMapper extends JpaRepository<StudentApply,Long> {
    StudentApply findStudentApplyById(Integer id);
    List<StudentApply> findStudentAppliesByApplicantNumber(String number);
}
