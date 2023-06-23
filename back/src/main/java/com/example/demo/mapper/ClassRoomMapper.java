package com.example.demo.mapper;

import com.example.demo.entity.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ClassRoomMapper extends JpaRepository<ClassRoom,Long> {
    ClassRoom getClassRoomByClassroomName(String classroom_name);

    ClassRoom getClassRoomById(Integer id);

    @Transactional
    void deleteClassRoomById(Integer id);
}
