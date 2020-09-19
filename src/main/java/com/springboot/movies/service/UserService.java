package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.UserDataService;
import com.springboot.movies.model.UserModel;

import java.sql.SQLException;
import java.util.List;

public class UserService extends IDAO {

    UserDataService uds = new UserDataService();

    public UserService() throws SQLException {
    }

    public List<UserModel> getAllUser() { return users; }

    public void addUser(UserModel user) throws SQLException {
        users.add(
                uds.createProfile(user)
        );
    }

    UserModel getUserById(Integer id) {
        return users.stream()
                .filter(p -> id.equals(p.getId()))
                .findAny()
                .orElse(null);
    }
}
