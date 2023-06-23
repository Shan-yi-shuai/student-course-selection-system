package com.example.demo.service.impl;

import com.example.demo.entity.*;
import com.example.demo.mapper.ClassRoomMapper;
import com.example.demo.mapper.CourseMapper;
import com.example.demo.packageClass.ClassroomPackage;
import com.example.demo.packageClass.TimePackage;
import com.example.demo.packageClass.UserPackage;
import com.example.demo.receiver.ClassroomReceiver;
import com.example.demo.receiver.CourseReceiver;
import com.example.demo.send.Response;
import com.example.demo.service.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassRoomServiceImpl implements ClassRoomService {
    private final ClassRoomMapper classRoomMapper;
    private final CourseMapper courseMapper;

    @Autowired
    ClassRoomServiceImpl(ClassRoomMapper classRoomMapper,CourseMapper courseMapper) {
        this.classRoomMapper = classRoomMapper;
        this.courseMapper=courseMapper;
    }

    //增
    public ResponseEntity<Response<ClassroomReceiver>> addClassRoom(ClassroomReceiver classroomReceiver) {
        if (classRoomMapper.getClassRoomByClassroomName(classroomReceiver.getClassroom_name()) == null) {
            classRoomMapper.save(receiveClassroom(classroomReceiver));
            return ResponseEntity.ok(new Response<>(1, "Success to add classroom", classroomReceiver));
        } else {
            return ResponseEntity.ok(new Response<>(0, "Class room already exists", classroomReceiver));
        }
    }

    //改（可以修改教室名字和容量）
    public ResponseEntity<Response<ClassroomReceiver>> changeClassRoom(ClassroomReceiver classroomReceiver) {
        ClassRoom classRoom=classRoomMapper.getClassRoomById(classroomReceiver.getId());
        if (classRoom != null) {
            //教室容量不能小于当前在此教室上的课的最大容量
            for(Course course:classRoom.getCourseSet()){
                if(course.getCapacity()>classroomReceiver.getCapacity()){
                    return ResponseEntity.ok(new Response<>(0, "Classroom's capacity is too small", classroomReceiver));
                }
            }
            classRoom.setCapacity(classroomReceiver.getCapacity());
            classRoom.setClassroomName(classroomReceiver.getClassroom_name());
            classRoomMapper.save(classRoom);
            return ResponseEntity.ok(new Response<>(1, "Success to change classroom", classroomReceiver));
        } else {
            return ResponseEntity.ok(new Response<>(0, "Classroom did not exist", classroomReceiver));
        }
    }

    //删
    public ResponseEntity<Response<ClassroomReceiver>> deleteClassRoom(ClassroomReceiver classroomReceiver) {
        ClassRoom classRoom=receiveClassroom(classroomReceiver);
        //待修改
        List<Course> courseList=courseMapper.getCoursesByClassRoom(classRoom);
        if(courseList.size()!=0){
            return ResponseEntity.ok(new Response<>(0, "Class room is occupied", classroomReceiver));
        }
        if (classRoomMapper.getClassRoomById(classroomReceiver.getId()) != null) {
            classRoomMapper.deleteClassRoomById(classroomReceiver.getId());
            return ResponseEntity.ok(new Response<>(1, "Success to delete classroom", classroomReceiver));
        } else {
            return ResponseEntity.ok(new Response<>(0, "Class room dose not exist", classroomReceiver));
        }
    }

    //查看
    public ResponseEntity<Response<List<ClassroomReceiver>>> showClassRoom() {
        List<ClassRoom> classRoomList=classRoomMapper.findAll();
        List<ClassroomReceiver> classroomReceiverList=new ArrayList<>();
        for(ClassRoom classRoom:classRoomList){
            classroomReceiverList.add(sendClassroom(classRoom));
        }
        System.out.println(classroomReceiverList.get(0));
        return ResponseEntity.ok(new Response<>(1, "Success to send classrooms", classroomReceiverList));
    }

    //receiver=>entity
    private ClassRoom receiveClassroom(ClassroomReceiver classroomReceiver){
        ClassRoom classRoom=new ClassRoom();
        classRoom.setId(classroomReceiver.getId());
        classRoom.setClassroomName(classroomReceiver.getClassroom_name());
        classRoom.setCapacity(classroomReceiver.getCapacity());
        return classRoom;
    }

    //entity=>receiver
    private ClassroomReceiver sendClassroom(ClassRoom classRoom){
        ClassroomReceiver classroomReceiver=new ClassroomReceiver();
        classroomReceiver.setId(classRoom.getId());
        classroomReceiver.setClassroom_name(classRoom.getClassroomName());
        classroomReceiver.setCapacity(classRoom.getCapacity());
        for(Course course:classRoom.getCourseSet()){
            System.out.println(course);
            classroomReceiver.getCourseList().add(sendCourse(course));
        }
        return classroomReceiver;
    }

    public CourseReceiver sendCourse(Course course) {
        CourseReceiver cr = new CourseReceiver();
        cr.setName(course.getName());//课名
        cr.setNumber(course.getNumber());//课程编号
        cr.setAcademy(course.getAcademy().getAcademyName());//开课学院
        cr.setHour(course.getHour());//学时
        cr.setCredit(course.getCredit());//学分
        cr.setIntroduction(course.getIntroduction());//大纲
        cr.setClassroom(new ClassroomPackage(course.getClassRoom().getId(),course.getClassRoom().getClassroomName(),course.getClassRoom().getCapacity()));//教室
        cr.setCapacity(course.getCapacity());//容量
        cr.setSelectedNumber(course.getSelectedNumber());//已选人数
        cr.setSchool_year(course.getSchoolYear());//学年
        cr.setTerm(course.getTerm());//学期
        for (User user : course.getUserSet()) {//开课老师
            cr.getUserInfo().add(new UserPackage(user));
        }
        for (Time time : course.getTimeSet()) {//上课时间
            cr.getTimeInfo().add(new TimePackage(time));
        }
        for (Major major : course.getMajorSet()) {//选课专业
            cr.getMajorList().add(major.getMajor());
        }
        return cr;
    }
}
