package com.springboot.movies.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserModel {

    private Integer id;
    private String name;
    private String email;
    private String password;
    private Long registrationDate;
    private Boolean isLoggedIn = false;

    public UserModel(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserModel(Integer id, String name, String email, String password, Long registration) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.registrationDate = registration;
    }

    public UserModel() {}

    public Integer getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRegistrationDate() {
        DateFormat simple = new SimpleDateFormat("dd MMM yyyy HH:mm:ss:SSS Z");
        Date result = new Date(registrationDate);
        return simple.format(result);
    }

    public Boolean getLoggedIn() {
        return isLoggedIn;
    }

    public void setLoggedIn(Boolean loggedIn) {
        isLoggedIn = loggedIn;
    }
}
