package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;

import java.sql.*;

public class UserDataService {
    IDAO idao;

    public UserDataService(IDAO idao) throws SQLException {
        this.idao = idao;
    }

    public UserModel createUser(UserModel user) throws SQLException {
        int id = -1;
        long milis = System.currentTimeMillis();
        String sqlstr = String.format("INSERT INTO %s " +
                        "(name, email, password, registration_date) " +
                        "VALUES " +
                        "(?, ?, ?, ?) " +
                        "RETURNING id", idao.USER_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
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

    public void deleteUser(Integer userId) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.USER_TABLE, userId);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
