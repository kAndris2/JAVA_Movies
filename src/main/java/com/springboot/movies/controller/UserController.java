package com.springboot.movies.controller;

import java.util.List;

import com.springboot.movies.model.ProfileModel;
import com.springboot.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List <ProfileModel> getUsers() {
        return this.userRepository.findAll();
    }
}