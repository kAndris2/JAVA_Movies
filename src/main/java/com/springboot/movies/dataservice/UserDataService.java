package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.UserService;

import java.sql.*;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Map;

public class UserDataService {
    IDAO idao;

    public UserDataService(IDAO idao) throws SQLException {
        this.idao = idao;
    }

    public UserModel createUser(UserModel user) throws SQLException {
        int id = -1;
        long milis = System.currentTimeMillis();
        Map<String, String> data = Map.of(
                "language", "hu-HU",
                "region", "HU",
                "color", "green"
        );

        String sqlstr = String.format("INSERT INTO %s " +
                        "(name, email, password, registration_date, language, region, color, description) " +
                        "VALUES " +
                        "(?, ?, ?, ?, ?, ?, ?, ?) " +
                        "RETURNING id", idao.USER_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setString(1, user.getName());
            pst.setString(2, user.getEmail());
            pst.setString(3, user.getPassword());
            pst.setLong(4, milis);
            pst.setString(5, data.get("language"));
            pst.setString(6, data.get("region"));
            pst.setString(7, data.get("color"));
            pst.setString(8, null);
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
                        milis,
                        data.get("language"),
                        data.get("region"),
                        data.get("color"),
                        data.get("description")
                );
    }

    public void basicSettings(Integer uid, String name, String color, String description, String language, String region) throws SQLException {
        String sqlstr = String.format("UPDATE %s " +
                        "SET name = ?, color = ?, description = ?, language = ?, region = ? " +
                        "WHERE id = %d", idao.USER_TABLE, uid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setString(1, name);
            pst.setString(2, color);
            pst.setString(3, description);
            pst.setString(4, language);
            pst.setString(5, region);
            pst.executeUpdate();
        }
    }

    public void deleteUser(Integer userId) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.USER_TABLE, userId);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
