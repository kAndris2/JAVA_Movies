package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.AccountErrorModel;
import com.springboot.movies.model.UserModel;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;

public class AccountService {
    IDAO idao = IDAO.getInstance();

    UserService us = new UserService();
    PasswordService ps = new PasswordService();

    public AccountService() throws SQLException {
    }

    public AccountErrorModel validateUser(UserModel newUser, HttpServletResponse response) throws Exception {
        AccountErrorModel aem = new AccountErrorModel();

        for (UserModel user : idao.getUsers()) {
            if (user.getEmail().equals(newUser.getEmail())) {
                aem.setState(false);
                aem.setEmailError("There is an account with that e-mail address");
            }
            if (user.getName().equals(newUser.getName())) {
                aem.setState(false);
                aem.setUsernameError("There is an account with that username");
            }
        }

        if (aem.getState()) {
            aem.setUser(
                    register(newUser)
            );

            login(newUser, response);
        }

        return aem;
    }

    UserModel register(UserModel user) throws Exception {
        user.setPassword(
                ps.getSaltedHash(user.getPassword())
        );
        UserModel registeredUser = us.getUds().createUser(user);
        idao.getUsers().add(registeredUser);
        return registeredUser;
    }

    public AccountErrorModel login(UserModel user, HttpServletResponse response) throws Exception {
        AccountErrorModel aem = new AccountErrorModel();
        UserModel loginUser = us.getUserByEmail(user.getEmail());

        if (loginUser != null) {
            if (ps.check(user.getPassword(), loginUser.getPassword())) {
                aem.setUser(loginUser);
                Cookie cookie = new Cookie("username", loginUser.getName());
                cookie.setMaxAge(3600);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
            else {
                aem.setState(false);
                aem.setPasswordError("Invalid password");
            }
        }
        else {
            aem.setState(false);
            aem.setEmailError("Invalid e-mail address");
        }

        return aem;
    }

    public void logout(UserModel user, HttpServletResponse response, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (request.isRequestedSessionIdValid() && session != null)
            session.invalidate();

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getValue().equals(user.getName())) {
                cookie.setMaxAge(0);
                cookie.setValue(null);
                cookie.setPath("/");
                response.addCookie(cookie);
                break;
            }
        }
    }
}
