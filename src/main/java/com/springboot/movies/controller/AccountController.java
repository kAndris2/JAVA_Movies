package com.springboot.movies.controller;

import com.springboot.movies.model.AccountErrorModel;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class AccountController {

    AccountService as = new AccountService();

    public AccountController() throws SQLException {
    }

    @PostMapping("register")
    AccountErrorModel register(@RequestBody UserModel user) throws SQLException {
        return as.validateUser(user);
    }

    @PostMapping("login")
    AccountErrorModel login(@RequestBody UserModel user) throws SQLException {
        return as.login(user);
    }

    @GetMapping("logout")
    Boolean logout() {
        return true;
    }
}
