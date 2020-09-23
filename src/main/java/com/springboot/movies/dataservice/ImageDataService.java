package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.ImageModel;

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
        return new ImageModel(id, milis, route, userId);
    }

    public void removeImageFromDb(Integer iid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.PICTURE_TABLE, iid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }

    public void resetImages(Integer uid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE user_id = %d", idao.PICTURE_TABLE, uid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
