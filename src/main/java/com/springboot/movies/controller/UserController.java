package com.springboot.movies.controller;

import java.sql.SQLException;
import java.util.List;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    UserService us = new UserService();

    public UserController() throws SQLException { }

    @GetMapping("users")
    List<UserModel> getUsers() {
        System.out.println("asd");
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
}