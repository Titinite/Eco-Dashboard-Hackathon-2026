package com.hackathon.eco_dashboard_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hackathon.eco_dashboard_backend.model.User;
import com.hackathon.eco_dashboard_backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public String login(String username, String password){

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(username);
    }
    public void register(String username, String password){

    User user = new User();

    user.setUsername(username);
    user.setPassword(password);

    userRepository.save(user);
}

}
