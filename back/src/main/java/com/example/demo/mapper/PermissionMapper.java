package com.example.demo.mapper;

import com.example.demo.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionMapper extends JpaRepository<Permission,Long> {
    Permission getPermissionBySchoolYearAndTerm(Integer schoolYear,Integer term);
}
