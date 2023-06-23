package com.example.demo.mapper;

import com.example.demo.entity.Academy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademyMapper extends JpaRepository<Academy,Long> {
    Academy getAcademyByAcademyName(String academy_name);
    List<Academy> findAll();
    Academy getAcademyById(Integer id);
}