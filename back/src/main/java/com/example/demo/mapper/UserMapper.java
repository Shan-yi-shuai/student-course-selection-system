package com.example.demo.mapper;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserMapper extends JpaRepository<User,Long> {
    User getUserByUsername(String username);

    User getUserByCard(String id_card);

    User getUserByNumber(String number);

    User getUserById(Integer id);

    User getUserByNumberAndUsername(String number, String name);


}
