package com.example.demo.service.impl;

import com.example.demo.entity.Academy;
import com.example.demo.entity.Major;
import com.example.demo.mapper.AcademyMapper;
import com.example.demo.mapper.MajorMapper;
import com.example.demo.receiver.UserReceiver;
import com.example.demo.send.Response;
import com.example.demo.entity.User;
import com.example.demo.receiver.LoginReceiver;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import com.example.demo.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private  UserMapper userMapper = null;
    private MajorMapper majorMapper=null;
    private AcademyMapper academyMapper=null;
    private TokenUtil tokenUtil;//没有初始化可能会出错

    @Autowired
    public  UserServiceImpl(UserMapper userMapper,MajorMapper majorMapper,AcademyMapper academyMapper){
        this.userMapper =userMapper;
        this.majorMapper=majorMapper;
        this.academyMapper=academyMapper;
        this.tokenUtil=new TokenUtil();
    }
//    public  UserServiceImpl(TokenUtil tokenUtil){
//        this.tokenUtil =tokenUtil;
//    }

    public User getUserByUsername(String username){

        return userMapper.getUserByUsername(username);
    }

    public User getUserByUserId(Integer userid){

        return userMapper.getUserById(userid);
    }

    public User getUserByUserNumber(String number){

        return userMapper.getUserByNumber(number);
    }




    public ResponseEntity<Response<UserReceiver>> addUser(UserReceiver userReceiver){
//        Long id = 3L;
//        if (!userMapper.existsById(id)) {
//            return ResponseEntity
//        }
//        User newUser = userMapper.findById(id).orElseThrow(()->new RuntimeException("user not found by id: " + id));
        User user=receiveUser(userReceiver);
        String id_card=user.getCard();
        String number=user.getNumber();
        User u=userMapper.getUserByCard(id_card);
        User u2=userMapper.getUserByNumber(number);
        if(!((user.getNumber().length()==6&user.getRole().equals("student"))|(user.getNumber().length()==8&user.getRole().equals("teacher")))){
            return ResponseEntity.ok(new Response<>(0, "用户信息有误，录入失败",userReceiver));
        }
        if(u==null&&u2==null){
            if(user.getMajor()==null){
            return ResponseEntity.ok(new Response<>(0, "学院专业有误，录入失败",userReceiver));
        }
            userMapper.save(user);
            Major major=majorMapper.getMajorByMajor(user.getMajor().getMajor());
            major.getUserSet().add(user);
            return ResponseEntity.ok(new Response<>(1, "录入用户成功",sentUser(user)));
        }
        else{
            return ResponseEntity.ok(new Response<>(0, "用户冲突，录入失败",userReceiver));
        }

    }

    public ResponseEntity<Response<LoginReceiver>> getLogin(LoginReceiver loginReceiver){
        String number= loginReceiver.getNumber();
        User u=userMapper.getUserByNumber(number);//通过number查询数据库中的用户

        if (u==null){
            return ResponseEntity.ok(new Response<>(0, "用户不存在", loginReceiver));//用户不存在
        }
        else {
            loginReceiver.setRole(u.getRole());
            if (u.getPassword().equals(loginReceiver.getPassword())) {
                if(u.getState().equals("in school")){
                    String token=tokenUtil.sign(u);
                    u.setToken(token);
                    userMapper.save(u);
                    loginReceiver.setToken(token);
                    return ResponseEntity.ok(new Response<>(1, "登录成功", loginReceiver));//用户状态符合，可以登录
                }
                else{
                    return ResponseEntity.ok(new Response<>(0, "用户状态不符，权限不够，登录失败", loginReceiver));//用户状态不符，不可以登录
                }
            }
            else {
                return ResponseEntity.ok(new Response<>(0, "密码错误，登录失败", loginReceiver));//用户存在但密码错误
            }
        }
    }

    @Override
    public ResponseEntity<Response<LoginReceiver>> setNewPassword(LoginReceiver loginReceiver) {
        String number= loginReceiver.getNumber();
        User u=userMapper.getUserByNumber(number);
        if (u==null){
            return ResponseEntity.ok(new Response<>(0, "用户不存在", loginReceiver));//用户不存在
        }
        else{
            u.setPassword(loginReceiver.getPassword());
            userMapper.save(u);
            return ResponseEntity.ok(new Response<>(1, "成功修改密码", loginReceiver));//用户存在，修改密码
        }

    }

    @Override
    public ResponseEntity<Response<UserReceiver>> changeUser(UserReceiver userReceiver) {
        User user=receiveUser(userReceiver);
        User u=userMapper.getUserByNumber(user.getNumber());
        if(u==null){
            return ResponseEntity.ok(new Response<>(0, "用户不存在，修改信息失败", userReceiver));//用户不存在，修改信息失败
        }
        else{
            user.setId(u.getId());
            user.setToken(u.getToken());
            userMapper.save(user);
            return ResponseEntity.ok(new Response<>(1, "用户存在，修改信信息成功", sentUser(user)));//用户存在，修改信信息成功
        }
    }

    @Override
    public User receiveUser(UserReceiver userReceiver) {//解析userReceiver得到user
        User user =new User();
        user.setPassword(userReceiver.getPassword());
        user.setRole(userReceiver.getRole());
        user.setCard(userReceiver.getCard());
        user.setEmail(userReceiver.getEmail());
        user.setNumber(userReceiver.getNumber());
        user.setTel(userReceiver.getTel());
        user.setUsername(userReceiver.getUsername());
        user.setState(userReceiver.getState());
        user.setToken("");
        user.setMajor(null);
        if(academyMapper.getAcademyByAcademyName(userReceiver.getAcademy())!=null){
            Academy academy=academyMapper.getAcademyByAcademyName(userReceiver.getAcademy());
            if(majorMapper.getMajorByMajor(userReceiver.getMajor())!=null){
                Major major=majorMapper.getMajorByMajor(userReceiver.getMajor());
                for(Major m:academy.getMajorSet()){
                    if(major==m){
                        user.setMajor(m);
                    }
                }
            }
        }
        return user;
    }

    @Override
    public UserReceiver sentUser(User user) {//将user包装成userReceiver
        Major major=user.getMajor();
        Academy academy=major.getAcademy();
        UserReceiver userReceiver=new UserReceiver();
        userReceiver.setPassword(user.getPassword());
        userReceiver.setRole(user.getRole());
        userReceiver.setCard(user.getCard());
        userReceiver.setUsername(user.getUsername());
        userReceiver.setEmail(user.getEmail());
        userReceiver.setAcademy(academy.getAcademyName());
        userReceiver.setMajor(major.getMajor());
        userReceiver.setState(user.getState());
        userReceiver.setNumber(user.getNumber());
        userReceiver.setTel(user.getTel());

        return userReceiver;
    }

    @Override
    public ResponseEntity<Response<List<UserReceiver>>> viewAllUser() {
        List<User> userList = userMapper.findAll();
        List<UserReceiver> userReceiverList = new ArrayList<>();
        for (User user : userList) {
            if(!user.getRole().equals("admin")) userReceiverList.add(sentUser(user));//把除了管理员的用户都加入List
        }
        return ResponseEntity.ok(new Response<>(1, "成功查看所有用户", userReceiverList));
    }


    @Override
    public ResponseEntity<Response<UserReceiver>> viewOneUser(String number) {
        if(!number.equals("")){
            if(userMapper.getUserByNumber(number)!=null){
                User user=userMapper.getUserByNumber(number);
                return ResponseEntity.ok(new Response<>(1, "成功查看个人信息", sentUser(user)));//用户存在，返回其信息
            }
        }
        return ResponseEntity.ok(new Response<>(0, "用户number有误", new UserReceiver()));//用户存在，修改密码
    }




//    @Override
//    public String getToken(User user) {
//        Date start = new Date();
//        //6小时有效时间
//        long currentTime = System.currentTimeMillis() + 1000 * 60 * 60 * 6;
//        Date end = new Date(currentTime);
//        //token:number+生效时间+失效时间+加密后的密码
//        String token = JWT.create().withAudience(user.getNumber())
//                .withIssuedAt(start)
//                .withExpiresAt(end)
//                .sign(Algorithm.HMAC256(user.getPassword()));
//
//        return token;
//    }
//
//
//    @Override
//    public void setToken(User user) {
//
//    }


}
