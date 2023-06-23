package com.example.demo.service.impl;

import com.example.demo.entity.Permission;
import com.example.demo.mapper.PermissionMapper;
import com.example.demo.receiver.PermissionReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.CourseService;
import com.example.demo.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {
    private PermissionMapper permissionMapper=null;
private CourseService courseService=null;
    @Autowired
    public PermissionServiceImpl(PermissionMapper permissionMapper,CourseService courseService){
        this.permissionMapper=permissionMapper;
        this.courseService=courseService;
    }

    //修改权限(数据库里就一行数据)
    public ResponseEntity<Response<PermissionReceiver>> changePermission(PermissionReceiver permissionReceiver){
        if(permissionReceiver.getStatus().equals(2)){
            courseService.oneTurnEndSelect(permissionReceiver.getSchool_year(),permissionReceiver.getTerm());
        }
        permissionMapper.deleteAll();
        Permission permission=receivePermission(permissionReceiver);
        permissionMapper.save(permission);
        return ResponseEntity.ok(new Response<>(1,"Success to change the permission",permissionReceiver));
    }

    //显示权限
    public ResponseEntity<Response<List<PermissionReceiver>>> showPermission(){
        List<Permission> permissionList=permissionMapper.findAll();
        List<PermissionReceiver> permissionReceiverList=new ArrayList<>();
        for(Permission p:permissionList){
            permissionReceiverList.add(sendPermission(p));
        }
        return ResponseEntity.ok(new Response<>(1,"Success to send the permission",permissionReceiverList));
    }


    //转换
    private Permission receivePermission(PermissionReceiver permissionReceiver){
        Permission permission=new Permission();
        permission.setStatus(permissionReceiver.getStatus());
        permission.setSchoolYear(permissionReceiver.getSchool_year());
        permission.setTerm(permissionReceiver.getTerm());
        return permission;
    }

    private PermissionReceiver sendPermission(Permission permission){
        PermissionReceiver permissionReceiver=new PermissionReceiver();
        permissionReceiver.setStatus(permission.getStatus());
        permissionReceiver.setSchool_year(permission.getSchoolYear());
        permissionReceiver.setTerm(permission.getTerm());
        return permissionReceiver;
    }


}
