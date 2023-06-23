package com.example.demo.service.impl;

import com.example.demo.entity.Academy;
import com.example.demo.entity.Major;
import com.example.demo.mapper.AcademyMapper;
import com.example.demo.mapper.MajorMapper;
import com.example.demo.receiver.AcademyReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.AcademyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AcademyServiceImpl implements AcademyService {
    private AcademyMapper academyMapper=null;
    private MajorMapper majorMapper=null;
    @Autowired
    public AcademyServiceImpl(AcademyMapper academyMapper, MajorMapper majorMapper){
        this.academyMapper=academyMapper;
        this.majorMapper=majorMapper;
    }

    public ResponseEntity<Response<List<AcademyReceiver>>> viewAllAcademy(){
        List<Academy> academyList = academyMapper.findAll();
        List<AcademyReceiver> academyReceiverList=new ArrayList<>();
        for(Academy academy:academyList){
            academyReceiverList.add(sentAcademy(academy));
        }
        return ResponseEntity.ok(new Response<>(1,"查看成功",academyReceiverList));
    }

    @Override
    public ResponseEntity<Response<AcademyReceiver>> addAcademy(AcademyReceiver academyReceiver) {
        Map.Entry<String, String> entryAcademy;
        entryAcademy = academyReceiver.getIdAndAcademyName().entrySet().iterator().next();
        if (entryAcademy.getKey().equals("")) {//进入新增一个全新的学院的功能
            // 判断学院是否存在
            if (academyMapper.getAcademyByAcademyName(entryAcademy.getValue()) == null) {//学院不存在
                Academy academy = receiveAcademy(academyReceiver);
                //判断是否有已存在的专业
                if (!allNewMajor(academyReceiver)) {
                    return ResponseEntity.ok(new Response<>(0, "新增学院时专业信息有误", academyReceiver));
                }
                //都不存在就存入
                saveAcademyAndMajor(academy, academyReceiver);
                return ResponseEntity.ok(new Response<>(1, "新增学院成功", sentAcademy(academy)));
            }
            else {
                    return ResponseEntity.ok(new Response<>(0, "新增学院时学院名已存在", academyReceiver));

            }
        }
        else {
            //通过学院名和学院的id，验证是否一致
            if (!idAndAcademyNameRight(entryAcademy.getKey(),entryAcademy.getValue())) {
                //不一致
                return ResponseEntity.ok(new Response<>(0, "新增专业时学院信息有误", academyReceiver));
            }
            else {
                Academy academy = academyMapper.getAcademyByAcademyName(entryAcademy.getValue());
                if(majorAddConflict(academyReceiver)){
                    return ResponseEntity.ok(new Response<>(0, "新增专业时专业有误", academyReceiver));
                }
                else{
                    saveAcademyAndMajor(academy, academyReceiver);
                    return ResponseEntity.ok(new Response<>(1, "专业录入成功", sentAcademy(academy)));
                }
            }
        }
    }


    @Override
    public ResponseEntity<Response<AcademyReceiver>> changeAndDeleteAcademy(AcademyReceiver academyReceiver) {

        Map.Entry<String, String> entryAcademy;
        entryAcademy = academyReceiver.getIdAndAcademyName().entrySet().iterator().next();
        if(entryAcademy.getKey().equals("")){//学院id为空
            return ResponseEntity.ok(new Response<>(0, "删除修改学院和专业时学院信息有误", academyReceiver));
        }
        else{
            Academy academy=academyMapper.getAcademyById(Integer.valueOf(entryAcademy.getKey()));
            if (academy == null) {//学院id对应的学院不存在
                return ResponseEntity.ok(new Response<>(0, "删除修改学院和专业时学院信息有误", academyReceiver));
            }
            else{
                if(!allMajorIdExist(academyReceiver)){//专业中存在id对应的专业不存在或者id为空
                    return ResponseEntity.ok(new Response<>(0, "删除修改学院和专业时专业信息有误", academyReceiver));
                }
                else{

                    if(entryAcademy.getValue().equals("")){//执行删除学院
                        if(!noUserInAcademy(academy)) return ResponseEntity.ok(new Response<>(0, "删除学院或专业时人员未清空", academyReceiver));
                        for(Major major:academy.getMajorSet()){
                            majorMapper.delete(major);
                        }
                        academy.getMajorSet().clear();
                        academyMapper.delete(academy);
                        return ResponseEntity.ok(new Response<>(1,"学院删除成功",sentAcademy(academy)));
                    }
                    else{
                        //执行学院修改或专业修改删除
                            academy.setAcademyName(entryAcademy.getValue());
                            academyMapper.save(academy);
                            if(majorChangeAndDeleteConflict(academyReceiver)){
                            return ResponseEntity.ok(new Response<>(0,"删除修改专业时，专业有误",sentAcademy(academy)));
                            }
                            if(!changeAndDeleteMajor(academy,academyReceiver)){
                                return ResponseEntity.ok(new Response<>(0,"专业删除时人员或课程未清空该专业删除失败",sentAcademy(academy)));
                            }

                            return ResponseEntity.ok(new Response<>(1,"学院专业修改删除成功",sentAcademy(academy)));
                    }
                }
            }
        }
    }

    public AcademyReceiver sentAcademy(Academy academy) {
        AcademyReceiver academyReceiver=new AcademyReceiver();
        List<Map<String,String>> idAndMajorNames = new ArrayList<>();
        Map<String,String> idAndAcademyName = new HashMap<>();
        idAndAcademyName.put(academy.getId().toString(),academy.getAcademyName());
        for(Major major:academy.getMajorSet()){
            Map<String,String> temp = new HashMap<>();
            temp.put(major.getId().toString(),major.getMajor());
            idAndMajorNames.add(temp);
        }
        academyReceiver.setIdAndAcademyName(idAndAcademyName);
        academyReceiver.setIdAndMajorNames(idAndMajorNames);
        return academyReceiver;
    }

    public Academy receiveAcademy(AcademyReceiver academyReceiver) {
        Academy academy = new Academy();
        Map.Entry<String, String> entryAcademy;
        entryAcademy=academyReceiver.getIdAndAcademyName().entrySet().iterator().next();
        academy.setAcademyName(entryAcademy.getValue());
        return academy;
    }

    @Override
    public boolean changeAndDeleteMajor(Academy academy, AcademyReceiver academyReceiver) {
        boolean flag=true;
        Map.Entry<String, String> entryMajor;
        for(Map<String,String> idAndMajorName: academyReceiver.getIdAndMajorNames()){
            entryMajor=idAndMajorName.entrySet().iterator().next();
            Major major=majorMapper.getMajorById(Integer.valueOf(entryMajor.getKey()));
            if(entryMajor.getValue().equals("")&!noUserInMajor(major)){
                System.out.println(flag);
                flag=false;
                continue;
            }
            if(!noCourseInMajor(major)){
                flag=false;
                continue;
            }
            if(entryMajor.getValue().equals("")&noUserInMajor(major)){
                majorMapper.delete(major);
                academy.getMajorSet().remove(major);
                continue;
            }
            major.setMajor(entryMajor.getValue());
            majorMapper.save(major);
        }
        return flag;
    }

    @Override
    public boolean majorAddConflict(AcademyReceiver academyReceiver) {
        Map.Entry<String, String> entryMajor;
        List<String> newNamelist=new ArrayList<>();
        for (Map<String, String> idAndMajorName : academyReceiver.getIdAndMajorNames()) {
            entryMajor = idAndMajorName.entrySet().iterator().next();
            if (!idAndMajorNameRight(entryMajor.getKey(), entryMajor.getValue())) {
                return true;
            }
            if(entryMajor.getKey().equals("")){
                newNamelist.add(entryMajor.getValue());
            }
        }

        HashSet<String> newNameSet = new HashSet<>(newNamelist);
        if(newNameSet.size()!=newNamelist.size()){
            return true;
        }
        return false;
    }

    @Override
    public boolean majorChangeAndDeleteConflict(AcademyReceiver academyReceiver) {
        Map.Entry<String, String> entryMajor;
        List<String> Namelist=new ArrayList<>();
        for (Map<String, String> idAndMajorName : academyReceiver.getIdAndMajorNames()) {
            entryMajor = idAndMajorName.entrySet().iterator().next();
            if(!entryMajor.getKey().equals("")){
                Namelist.add(entryMajor.getValue());
            }
        }

        HashSet<String> NameSet = new HashSet<>(Namelist);
        if(NameSet.size()!=Namelist.size()){
            return true;
        }
        return false;
    }

    @Override
    public void saveAcademyAndMajor(Academy academy, AcademyReceiver academyReceiver) {
        academyMapper.save(academy);
        Map.Entry<String, String> entryMajor;
        for(Map<String,String> idAndMajorName:academyReceiver.getIdAndMajorNames()){
            entryMajor=idAndMajorName.entrySet().iterator().next();
            if(entryMajor.getKey().equals("")){
                Major major=new Major();
                major.setMajor(entryMajor.getValue());
                major.setAcademy(academy);
                majorMapper.save(major);
                academy.getMajorSet().add(major);
            }
        }
    }

    @Override
    public boolean idAndAcademyNameRight(String id, String name) {
        if(name.equals("")) return  false;
        if(academyMapper.getAcademyByAcademyName(name) == null) return false;
        if(academyMapper.getAcademyById(Integer.valueOf(id)) == null) return false;
        if(!academyMapper.getAcademyByAcademyName(name).getId().toString().equals(id)) return false;
        return true;
    }
    @Override
    public boolean idAndMajorNameRight(String id, String name) {
        if(name.equals("")) return  false;
        if(!(id.equals("") & majorMapper.getMajorByMajor(name) == null)) {
            if(majorMapper.getMajorByMajor(name) == null) return false;
            if(majorMapper.getMajorById(Integer.valueOf(id)) == null) return false;
            if(!majorMapper.getMajorByMajor(name).getId().toString().equals(id)) return false;
        }


        return true;
    }
    @Override
    public boolean allNewMajor(AcademyReceiver academyReceiver) {
        Map.Entry<String, String> entryMajor;
        for (Map<String, String> idAndMajorName : academyReceiver.getIdAndMajorNames()) {
            entryMajor = idAndMajorName.entrySet().iterator().next();
            if(!(entryMajor.getKey().equals("")&majorMapper.getMajorByMajor(entryMajor.getValue())==null)){
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean allMajorIdExist(AcademyReceiver academyReceiver) {
        Map.Entry<String, String> entryMajor;
        for(Map<String,String> idAndMajorName: academyReceiver.getIdAndMajorNames()){
            entryMajor=idAndMajorName.entrySet().iterator().next();
            if(entryMajor.getKey().equals("")){
                return false;
            }
            Major major=majorMapper.getMajorById(Integer.valueOf(entryMajor.getKey()));
            if(major==null){
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean noUserInMajor(Major major) {
        if(major.getUserSet().size()==0){
            return true;
        }
        else return false;
    }

    public boolean noCourseInMajor(Major major) {
        if(major.getCourseSet().size()==0){
            return true;
        }
        else return false;
    }
    @Override
    public boolean noUserInAcademy(Academy academy) {
        for(Major major:academy.getMajorSet()){
            if(major.getUserSet().size()!=0) return false;
        }
        return true;
    }
}
