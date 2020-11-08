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

    public AccountErrorModel checkData(String email, String password, String confirmPass, String userName) {
        AccountErrorModel aem = new AccountErrorModel();
        Integer count = 0;

        for (UserModel user : idao.getUsers()) {
            if (email.equals(user.getEmail())) {
                aem.setState(false);
                aem.setEmailError("Email is already taken");
                count++;
            }

            if (userName.equals(user.getName())) {
                aem.setState(false);
                aem.setUsernameError("Username is already taken");
                count++;
            }

            if (count == 2)
                break;
        }

        if (password.length() < 4) {
            aem.setState(false);
            aem.setPasswordError("Password needs to be at least 4 characters long");
        }
        else if (!password.equals(confirmPass)) {
            aem.setState(false);
            aem.setPasswordError("Password and password confirmation do not match");
        }

        return aem;
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

            login(
                    newUser,
                    response
            );
        }

        return aem;
    }

    UserModel register(UserModel user) throws Exception {
        UserModel newUser = (UserModel) user.clone();
        newUser.setPassword(
                ps.getSaltedHash(newUser.getPassword())
        );
        UserModel registeredUser = us.getUds().createUser(newUser);
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

    public void changeCookieName(String _old, String _new, HttpServletResponse response, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getValue().equals(_old)) {
                cookie.setMaxAge(0);
                cookie.setValue(null);
                cookie.setPath("/");
                response.addCookie(cookie);
                break;
            }
        }
        Cookie cookie = new Cookie("username", _new);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
