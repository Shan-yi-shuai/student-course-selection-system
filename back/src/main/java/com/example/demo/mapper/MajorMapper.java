package com.example.demo.mapper;

import com.example.demo.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorMapper extends JpaRepository<Major,Long> {
    Major getMajorByMajor(String majorName);
    Major getMajorById(Integer id);
}
