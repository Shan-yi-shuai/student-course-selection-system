package com.example.demo.config;

import com.example.demo.interceptor.TokenInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;
import org.springframework.web.servlet.config.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * 跨域请求支持/token拦截
 * tip:只能写在一个配置类里
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final TokenInterceptor tokenInterceptor;

    //构造方法
    public WebConfig(TokenInterceptor tokenInterceptor){
        this.tokenInterceptor = tokenInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry arg0) {
        // TODO Auto-generated method stub
        arg0.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer){
        configurer.setTaskExecutor(new ConcurrentTaskExecutor(Executors.newFixedThreadPool(3)));
        configurer.setDefaultTimeout(30000);
    }

//    @Bean
//    public TokenInterceptor tokenInterceptor() {
//        return new TokenInterceptor();
//    }
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        List<String> excludePath = new ArrayList<>();
        //排除拦截，除了注册登录(此时还没token)，其他都拦截
        excludePath.add("/api/users/login");  //登录
        excludePath.add("/api/users/register");
        excludePath.add("/api/users/teacher-in-academy");
        excludePath.add("/api/users/register-all");
        excludePath.add("/api/users//viewAllUser");
        excludePath.add("/api/users//viewOneUser");
        excludePath.add("/api/users//change");
        excludePath.add("/api/course/add");
        excludePath.add("/api/course/delete");
        excludePath.add("/api/course/change");
        excludePath.add("/api/course/select");
        excludePath.add("/api/course/drop");
        excludePath.add("/api/course//view-student");
        excludePath.add("/api/course//view-selected");
        excludePath.add("/api/course//view-finished");
        excludePath.add("/api/course//view-to-select");
        excludePath.add("/api/academy/view-all");
        excludePath.add("/api/academy/add");
        excludePath.add("/api/academy/change-delete");
//        excludePath.add("/user/login");     //注册
//        excludePath.add("/static/**");  //静态资源
//        excludePath.add("/assets/**");  //静态资源

        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(excludePath);
        WebMvcConfigurer.super.addInterceptors(registry);
    }



}

