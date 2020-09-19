package com.springboot.movies.controller;

import java.sql.SQLException;
import java.util.List;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    UserService us = new UserService();

    public UserController() throws SQLException {
    }

    @GetMapping("users")
    public List<UserModel> getUsers() {
        return us.getAllUser();
    }

    @PostMapping("add_user")
    void createUser(@RequestBody UserModel user) throws SQLException {
        us.addUser(user);
    }
}