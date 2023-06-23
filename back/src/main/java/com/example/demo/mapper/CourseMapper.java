package com.example.demo.mapper;

import com.example.demo.entity.ClassRoom;
import com.example.demo.entity.Course;
import com.example.demo.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseMapper extends JpaRepository<Course,Long> {
     Course getCourseById(Integer id);
     @Modifying
     void deleteCourseById(Integer id);

     List<Course> findAll();
     List<Course> findAllByName(String name);
     List<Course> findAllByNameAndSchoolYearAndTerm(String name,Integer schoolYear,Integer term);
     List<Course> findAllBySchoolYearAndTerm(Integer schoolYear,Integer term);
     List<Course> getCoursesByMajorSetContaining(Major major);

     List<Course> getCoursesByClassRoom(ClassRoom classRoom);

}
