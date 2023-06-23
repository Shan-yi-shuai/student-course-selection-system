package com.example.demo.receiver;


import lombok.Data;

@Data
public class LoginReceiver {
    private String number;
    private String password;
    private String role;
    private String token;

}
