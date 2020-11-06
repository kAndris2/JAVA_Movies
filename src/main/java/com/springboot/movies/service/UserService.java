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
    public UserDataService getUds() { return uds; }

    public void deleteUser(Integer userId) throws SQLException {
        idao.getUsers().remove(
                idao.getUserById(userId)
        );
        uds.deleteUser(userId);
    }

    public UserModel getUserById(Integer id) {
        return idao.getUserById(id);
    }

    public UserModel getUserByEmail(String email) {
        return idao.getUsers().stream()
                .filter(p -> email.equals(p.getEmail()))
                .findAny()
                .orElse(null);
    }

    public void basicSettings(Integer uid, String name, String color, String description, String language, String region) throws SQLException {
        uds.basicSettings(uid, name, color, description, language, region);
        getUserById(uid).update(name, color, language, region);
    }
}
