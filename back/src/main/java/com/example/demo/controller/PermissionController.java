package com.example.demo.controller;


import com.example.demo.receiver.PermissionReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/permission")
public class PermissionController {
    private final PermissionService permissionService;

    @Autowired
    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping(path = "/change")
    public @ResponseBody
    ResponseEntity<Response<PermissionReceiver>> changePermission(@RequestBody PermissionReceiver permissionReceiver) {
        return permissionService.changePermission(permissionReceiver);
    }

    @GetMapping(path = "/view-permission")
    public ResponseEntity<Response<List<PermissionReceiver>>> showPermission() {
        return permissionService.showPermission();
    }
}
