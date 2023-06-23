package com.example.demo.controller;



import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest
@SpringJUnitWebConfig
@AutoConfigureMockMvc
class CourseControllerTest {
    @Autowired
    private WebApplicationContext wac;
    @Autowired
    private MockMvc mvc;

    @Before
    public void setupMockMvc(){
        mvc = MockMvcBuilders.webAppContextSetup(wac).build(); //初始化MockMvc对象
    }

    @Test
    @Transactional
    @Rollback()
    void viewStudentSelectedCourse() throws Exception {
        String number="210002";
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/course/view-selected")
                        .accept(MediaType.ALL)
                        .param("number",number)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }


    @Test
    @Transactional
    @Rollback()
    void viewStudentToSelectCourse() throws Exception {
        String number="210002";
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/course/view-to-select")
                        .accept(MediaType.ALL)
                        .param("number",number)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Transactional
    @Rollback()
    void viewStudentFinishedCourse() throws Exception {
        String number="210002";
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/course/view-finished")
                        .accept(MediaType.ALL)
                        .param("number",number)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Transactional
    @Rollback()
    void studentSelectCourse() throws Exception {
        //同类课程只允许选一门
        String content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 55,\n" +
                "        \"name\": \"离散数学\",\n" +
                "        \"number\": \"00020001.02\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"2\",\n" +
                "        \"credit\": \"1.5\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 1,\n" +
                "                \"week_day\": 7\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 2,\n" +
                "                \"week_day\": 7\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课的名字也叫离散数学\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 80,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/select")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        //人数已满选课失败
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 54,\n" +
                "        \"name\": \"高等数学\",\n" +
                "        \"number\": \"00020001.01\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"3\",\n" +
                "        \"credit\": \"3\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 5,\n" +
                "                \"week_day\": 4\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 4,\n" +
                "                \"week_day\": 4\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 6,\n" +
                "                \"week_day\": 4\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课是高等数学\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 0,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/select")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        //选课成功
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 56,\n" +
                "        \"name\": \"编译原理\",\n" +
                "        \"number\": \"00020005.01\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"3\",\n" +
                "        \"credit\": \"2\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 1,\n" +
                "                \"week_day\": 6\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 2,\n" +
                "                \"week_day\": 6\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课叫做编译原理\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 50,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/select")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        //学生或者课程不存在
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 55,\n" +
                "        \"name\": \"离散数学\",\n" +
                "        \"number\": \"00020001.02\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"2\",\n" +
                "        \"credit\": \"1.5\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 1,\n" +
                "                \"week_day\": 7\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 2,\n" +
                "                \"week_day\": 7\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课的名字也叫离散数学\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 80,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/select")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    @Transactional
    @Rollback()
    void StudentDropCourse() throws Exception {
        String content;
        //你未选此门课
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 56,\n" +
                "        \"name\": \"编译原理\",\n" +
                "        \"number\": \"00020005.01\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"3\",\n" +
                "        \"credit\": \"2\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 1,\n" +
                "                \"week_day\": 6\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 2,\n" +
                "                \"week_day\": 6\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课叫做编译原理\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 50,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/drop")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        //退课成功
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 53,\n" +
                "        \"name\": \"操作系统\",\n" +
                "        \"number\": \"00020004.02\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"3\",\n" +
                "        \"credit\": \"5\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"12345678\",\n" +
                "                \"user_name\": \"单弋\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"user_number\": \"210002\",\n" +
                "                \"user_name\": \"testStudent\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 12,\n" +
                "                \"week_day\": 1\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 13,\n" +
                "                \"week_day\": 1\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这节课也是操作系统\",\n" +
                "        \"selectedNumber\": 1,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 50,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/drop")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        //学生或者课程不存在
        content="{\n" +
                "    \"number\": \"210002\",\n" +
                "    \"courseReceiver\": {\n" +
                "        \"id\": 55,\n" +
                "        \"name\": \"离散数学\",\n" +
                "        \"number\": \"00020001.02\",\n" +
                "        \"academy\": \"计算机学院\",\n" +
                "        \"hour\": \"2\",\n" +
                "        \"credit\": \"1.5\",\n" +
                "        \"userInfo\": [\n" +
                "            {\n" +
                "                \"user_number\": \"44444444\",\n" +
                "                \"user_name\": \"单小弋\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"timeInfo\": [\n" +
                "            {\n" +
                "                \"class_number\": 1,\n" +
                "                \"week_day\": 7\n" +
                "            },\n" +
                "            {\n" +
                "                \"class_number\": 2,\n" +
                "                \"week_day\": 7\n" +
                "            }\n" +
                "        ],\n" +
                "        \"introduction\": \"这门课的名字也叫离散数学\",\n" +
                "        \"selectedNumber\": 0,\n" +
                "        \"classroom\": {\n" +
                "            \"id\": 1,\n" +
                "            \"classroom_name\": \"H3108\",\n" +
                "            \"capacity\": 200\n" +
                "        },\n" +
                "        \"capacity\": 80,\n" +
                "        \"majorList\": [\n" +
                "            \"artificial intelligence\",\n" +
                "            \"computer science\",\n" +
                "            \"专业名3\",\n" +
                "            \"专业名1\",\n" +
                "            \"专业名2\",\n" +
                "            \"专业名4\",\n" +
                "            \"软件工程\",\n" +
                "            \"security\"\n" +
                "        ],\n" +
                "        \"school_year\": 2022,\n" +
                "        \"term\": 1\n" +
                "    }\n" +
                "}";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/course/drop")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }
}