package com.example.demo.service;

import com.example.demo.receiver.PermissionReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PermissionService {
    ResponseEntity<Response<PermissionReceiver>> changePermission(PermissionReceiver permissionReceiver);

    ResponseEntity<Response<List<PermissionReceiver>>> showPermission();
}
