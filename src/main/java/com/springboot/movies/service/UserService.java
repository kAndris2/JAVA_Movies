package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.UserDataService;
import com.springboot.movies.model.UserModel;

import java.sql.SQLException;
import java.util.List;

public class UserService {

    IDAO idao = IDAO.getInstance();
    UserDataService uds = new UserDataService(idao);

    public UserService() throws SQLException {
    }

    public List<UserModel> getAllUser() { return idao.getUsers(); }

    public void addUser(UserModel user) throws SQLException {
        idao.getUsers().add(
                uds.createUser(user)
        );
    }

    public void deleteUser(Integer userId) throws SQLException {
        idao.getUsers().remove(
                getUserById(userId)
        );
        uds.deleteUser(userId);
    }

    UserModel getUserById(Integer id) {
        return idao.getUsers().stream()
                .filter(p -> id.equals(p.getId()))
                .findAny()
                .orElse(null);
    }
}
