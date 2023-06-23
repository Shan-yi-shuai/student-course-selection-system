package com.example.demo.mapper;

import com.example.demo.entity.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TimeMapper extends JpaRepository<Time,Long> {
    Time getTimeById(Integer id);

    @Modifying
    @Transactional
    void deleteTimeById(Integer id);

    List<Time> findAll();
}
