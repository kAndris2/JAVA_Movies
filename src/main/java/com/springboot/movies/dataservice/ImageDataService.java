package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.ImageModel;
import com.springboot.movies.model.UserModel;

import java.sql.*;

public class ImageDataService {
    IDAO idao;

    public ImageDataService(IDAO idao) {
        this.idao = idao;
    }

    public ImageModel createImage(String route, Integer userId) {
        int id = -1;
        long milis = System.currentTimeMillis();
        String sqlstr = String.format("INSERT INTO %s " +
                "(upload_date, route, user_id) " +
                "VALUES " +
                "(?, ?, ?) " +
                "RETURNING id", idao.PICTURE_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setLong(1, milis);
            pst.setString(2, route);
            pst.setInt(3, userId);
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return new ImageModel(id, milis, route);
    }
}
