package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.FavoriteModel;

import java.sql.*;

public class FavoriteDataService {
    IDAO idao;

    public FavoriteDataService(IDAO idao) {
        this.idao = idao;
    }

    public FavoriteModel createFavorite(FavoriteModel favorite) throws SQLException {
        int id = -1;
        String sqlstr = String.format("INSERT INTO %s " +
                "(user_id, movie_id) " +
                "VALUES " +
                "(?, ?) " +
                "RETURNING id", idao.FAVORITE_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setInt(1, favorite.getUserId());
            pst.setInt(2, favorite.getMovieId());
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return
                new FavoriteModel(
                        id,
                        favorite.getUserId(),
                        favorite.getMovieId()
                );
    }

    public void removeFavoriteFromDb(Integer fid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.FAVORITE_TABLE, fid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }

    public void resetFavorites(Integer uid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE user_id = %d", idao.FAVORITE_TABLE, uid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
