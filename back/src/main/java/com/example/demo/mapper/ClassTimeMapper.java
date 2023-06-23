package com.example.demo.mapper;

import com.example.demo.entity.ClassTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassTimeMapper extends JpaRepository<ClassTime,Long> {

}
