package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.AccountErrorModel;
import com.springboot.movies.model.UserModel;
import java.sql.SQLException;

public class AccountService {
    IDAO idao = IDAO.getInstance();

    UserService us = new UserService();

    public AccountService() throws SQLException {
    }

    public AccountErrorModel validateUser(UserModel newUser) throws SQLException {
        AccountErrorModel aem = new AccountErrorModel();

        for (UserModel user : idao.getUsers()) {
            if (user.getEmail().equals(newUser.getEmail())) {
                aem.setState(false);
                aem.setEmailError("There is an account with that e-mail address: " + newUser.getEmail());
            }
            if (user.getName().equals(newUser.getName())) {
                aem.setState(false);
                aem.setUsernameError("There is an account with that username: " + newUser.getName());
            }
        }

        if (aem.getState()) {
            aem.setUser(
                    register(newUser)
            );

            login(newUser);
        }

        return aem;
    }

    UserModel register(UserModel user) throws SQLException {
        UserModel registeredUser = us.getUds().createUser(user);
        idao.getUsers().add(registeredUser);
        return registeredUser;
    }

    public AccountErrorModel login(UserModel user) {
        AccountErrorModel aem = new AccountErrorModel();
        UserModel loginUser = us.getUserByEmail(user.getEmail());

        if (loginUser != null) {
            if (loginUser.getPassword().equals(user.getPassword())) {
                aem.setUser(loginUser);
                //cookie
            }
            else {
                aem.setState(false);
                aem.setPasswordError("Invalid password: " + user.getPassword());
            }
        }
        else {
            aem.setState(false);
            aem.setEmailError("Invalid e-mail address: " + user.getEmail());
        }

        return aem;
    }
}
