package com.springboot.movies.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserModel implements Cloneable {

    private Integer id;
    private String name;
    private String email;
    private String password;
    private Long registrationDate;
    private String language;
    private String region;
    private String color;
    private String description;

    public UserModel(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserModel(Integer id, String name, String email, String password, Long registration,
                    String language, String region, String color, String description) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.registrationDate = registration;
        this.language = language;
        this.region = region;
        this.color = color;
        this.description = description;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
