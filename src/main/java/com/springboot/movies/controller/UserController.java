package com.springboot.movies.controller;

import java.util.List;

import com.springboot.movies.model.ProfileModel;
import com.springboot.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List <ProfileModel> getUsers() {
        this.userRepository.save(new ProfileModel(0, "Alfonz", System.currentTimeMillis()));
        return this.userRepository.findAll();
    }
}