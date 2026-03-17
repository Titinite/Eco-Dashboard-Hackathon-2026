package com.hackathon.eco_dashboard_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hackathon.eco_dashboard_backend.service.AuthService;
import com.hackathon.eco_dashboard_backend.dto.LoginRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){

        return authService.login(request.getUsername(), request.getPassword());
    }
    @PostMapping("/register")
    public void register(@RequestBody LoginRequest request){

    authService.register(
            request.getUsername(),
            request.getPassword()
    );
}
}