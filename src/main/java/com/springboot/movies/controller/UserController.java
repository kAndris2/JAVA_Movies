package com.springboot.movies.controller;

import java.sql.SQLException;
import java.util.List;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.ProfileModel;
import com.springboot.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    IDAO idao = new IDAO();

    public UserController() throws SQLException {
    }

    @GetMapping("users")
    public List<ProfileModel> getUsers() {
        return idao.getProfiles();
    }

    @PostMapping("add_user")
    void createUser(@RequestBody ProfileModel profile) throws SQLException {
        idao.createProfile(profile);
    }
    /*
    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List <ProfileModel> getUsers() {
        return this.userRepository.findAll();
    }
     */
}