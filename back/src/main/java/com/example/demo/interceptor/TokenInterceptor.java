package com.example.demo.interceptor;


import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest,
                             HttpServletResponse httpServletResponse,
                             Object object) throws IOException {

        // 从 http 请求头中取出 token
        String token = httpServletRequest.getHeader("Authorization");
        System.out.println(token);
        return true;
    }
}
//        if(token != null){
//            boolean result = TokenUtil.verify(token);
//            if(result){
//                System.out.println("通过拦截器");
//                return true;
//            }
//        }
//        httpServletResponse.setCharacterEncoding("UTF-8");
//        httpServletResponse.setContentType("application/json; charset=utf-8");
//        try{
//            httpServletResponse.getWriter().append("failed");
//            System.out.println("认证失败，未通过拦截器");
//        }catch (Exception e){
//            e.printStackTrace();
//            httpServletResponse.sendError(500);
//            return false;
//        }
//        return false;
//
//    }


//        // 如果不是映射到方法直接通过
//        if(!(object instanceof HandlerMethod)){
//            return true;
//        }
//        HandlerMethod handlerMethod=(HandlerMethod)object;
//        Method method=handlerMethod.getMethod();
//        //检查是否有passToken注释，有则跳过认证
//        if (method.isAnnotationPresent(PassToken.class)) {
//            PassToken passToken = method.getAnnotation(PassToken.class);
//            if (passToken.required()) {
//                return true;
//            }
//        }
//        //检查有没有需要用户权限的注解
//        if (method.isAnnotationPresent(LoginToken.class)) {
//            System.out.println("!");
//            LoginToken loginToken = method.getAnnotation(LoginToken.class);
//            if (loginToken.required()) {
//                // 执行认证
//                if (token == null) {
//                    throw new RuntimeException("无token，请重新登录");
//                }
//                // 获取 token 中的 root id
//                String userNumber;
//                try {
//                    userNumber = JWT.decode(token).getAudience().get(0);
//                } catch (JWTDecodeException j) {
//                    throw new RuntimeException("401");
//                }
//                User user = userMapper.getUserByNumber(userNumber);
//                if (user == null) {
//                    throw new RuntimeException("账号不存在，请重新登录");
//                }
//                // 验证 token
//                JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
//                try {
//                    jwtVerifier.verify(token);
//                } catch (JWTVerificationException e) {
//                    throw new RuntimeException("401");
//                }
//                return true;
//            }
//        }
//        return true;


//    @Override
//    public void postHandle(HttpServletRequest httpServletRequest,
//                           HttpServletResponse httpServletResponse,
//                           Object o,
//                           ModelAndView modelAndView) {
//
//    }
//    @Override
//    public void afterCompletion(HttpServletRequest httpServletRequest,
//                                HttpServletResponse httpServletResponse,
//                                Object o,
//                                Exception e) {
//
//    }



