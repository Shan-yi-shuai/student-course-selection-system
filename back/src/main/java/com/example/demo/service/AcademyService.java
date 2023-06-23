package com.example.demo.service;

import com.example.demo.entity.Academy;
import com.example.demo.entity.Major;
import com.example.demo.receiver.AcademyReceiver;
import com.example.demo.send.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AcademyService {
    public ResponseEntity<Response<List<AcademyReceiver>>> viewAllAcademy();
    public ResponseEntity<Response<AcademyReceiver>> addAcademy(AcademyReceiver academyReceiver);
    public ResponseEntity<Response<AcademyReceiver>> changeAndDeleteAcademy(AcademyReceiver academyReceiver);
    public AcademyReceiver sentAcademy(Academy academy);
    public Academy receiveAcademy(AcademyReceiver academyReceiver);
    public  boolean changeAndDeleteMajor(Academy academy,AcademyReceiver academyReceiver);
    public  boolean majorAddConflict(AcademyReceiver academyReceiver);
    public  boolean majorChangeAndDeleteConflict(AcademyReceiver academyReceiver);
    public  void saveAcademyAndMajor(Academy academy,AcademyReceiver academyReceiver);
    public boolean idAndAcademyNameRight(String id,String name);

    boolean idAndMajorNameRight(String id, String name);

    public  boolean allNewMajor(AcademyReceiver academyReceiver);
    public  boolean allMajorIdExist(AcademyReceiver academyReceiver);
    public boolean noUserInMajor(Major major);
    public boolean noUserInAcademy(Academy academy);
}
