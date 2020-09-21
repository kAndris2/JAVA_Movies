package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.RatingModel;

import java.sql.*;

public class RatingDataService {
    IDAO idao;

    public RatingDataService(IDAO idao) {
        this.idao = idao;
    }

    public RatingModel createRating(Integer uid, Integer mid, Integer rate) throws SQLException {
        int id = -1;
        long milis = System.currentTimeMillis();
        String sqlstr = String.format("INSERT INTO %s " +
                "(user_id, movie_id, value, date) " +
                "VALUES " +
                "(?, ?, ?, ?) " +
                "RETURNING id", idao.RATING_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setInt(1, uid);
            pst.setInt(2, mid);
            pst.setInt(3, rate);
            pst.setLong(4, milis);
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return new RatingModel(id, uid, mid, rate, milis);
    }

    public void removeRatingFromDb(Integer rid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.RATING_TABLE, rid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
