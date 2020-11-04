package com.springboot.movies.controller;

import java.sql.SQLException;
import java.util.List;

import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    UserService us = new UserService();

    public UserController() throws SQLException { }

    @GetMapping("users")
    List<UserModel> getUsers() {
        return us.getAllUser();
    }

    @GetMapping("user/{userId}")
    UserModel getUser(@PathVariable(value = "userId") Integer userId) {
        return us.getUserById(userId);
    }

    @DeleteMapping("delete_user/{userId}")
    void deleteUser(@PathVariable(value = "userId") Integer userId) throws SQLException {
        us.deleteUser(userId);
    }

    @PutMapping("basic_settings/{userId}/{name}/{color}/{description}/{language}/{region}")
    void basicSettings(@PathVariable(value = "userId") Integer userId,
                       @PathVariable(value = "name") String name,
                       @PathVariable(value = "color") String color,
                       @PathVariable(value = "description") String description,
                       @PathVariable(value = "language") String language,
                       @PathVariable(value = "region") String region) throws SQLException {
        us.basicSettings(userId, name, color, description, language, region);
    }
}