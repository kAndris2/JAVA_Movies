package com.springboot.movies.controller;

import com.springboot.movies.model.AccountErrorModel;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.AccountService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("api/")
public class AccountController {

    AccountService as = new AccountService();

    public AccountController() throws SQLException {
    }

    @PostMapping("register")
    AccountErrorModel register(@RequestBody UserModel user, HttpServletResponse response) throws Exception {
        return as.validateUser(user, response);
    }

    @PostMapping("login")
    AccountErrorModel login(@RequestBody UserModel user, HttpServletResponse response) throws Exception {
        return as.login(user, response);
    }

    @PostMapping("logout")
    void logout(@RequestBody UserModel user, HttpServletResponse response, HttpServletRequest request) {
        as.logout(user, response, request);
    }
}
