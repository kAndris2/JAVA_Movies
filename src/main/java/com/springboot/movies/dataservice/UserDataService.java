package com.springboot.movies.dataservice;

import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;

import java.sql.*;

public class UserDataService extends UserService {

    public UserDataService() throws SQLException {
    }

    public UserModel createProfile(UserModel user) throws SQLException {
        int id = -1;
        long milis = System.currentTimeMillis();
        String sqlstr = String.format("INSERT INTO profiles " +
                        "(name, email, password, registration_date) " +
                        "VALUES " +
                        "(?, ?, ?, ?) " +
                        "RETURNING id");
        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setString(1, user.getName());
            pst.setLong(4, milis);
            pst.setString(2, user.getEmail());
            pst.setString(3, user.getPassword());
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return
                new UserModel(
                        id,
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        milis
                );
    }
}
