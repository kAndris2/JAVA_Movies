package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.UserDataService;
import com.springboot.movies.model.AccountErrorModel;
import com.springboot.movies.model.UserModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AccountService {
    IDAO idao = IDAO.getInstance();

    UserDataService uds = new UserDataService(idao);

    public AccountService() throws SQLException {
    }

    public AccountErrorModel validateUser(UserModel newUser) throws SQLException {
        AccountErrorModel aem = new AccountErrorModel();

        for (UserModel user : idao.getUsers()) {
            if (user.getEmail().equals(newUser.getEmail())) {
                aem.setState(false);
                aem.setEmailError("There is an account with that email address: " + newUser.getEmail());
            }
            if (user.getName().equals(newUser.getName())) {
                aem.setState(false);
                aem.setUsernameError("There is an account with that username: " + newUser.getName());
            }
        }

        if (aem.getState()) {
            register(newUser);
            //await
        }

        return aem;
    }

    void register(UserModel user) throws SQLException {
        idao.getUsers().add(
                uds.createUser(user)
        );
    }
}
