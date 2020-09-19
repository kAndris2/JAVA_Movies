package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.WatchModel;

import java.sql.*;

public class WatchDataService {

    final String TABLE = "watchlists";
    IDAO idao;

    public WatchDataService(IDAO idao) throws SQLException {
        this.idao = idao;
    }

    public WatchModel createWatch(Integer pid, Integer mid) throws SQLException {
        int id = -1;
        String sqlstr = String.format("INSERT INTO %s " +
                "(profile_id, movie_id) " +
                "VALUES " +
                "(?, ?) " +
                "RETURNING id", TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setInt(1, pid);
            pst.setInt(2, mid);
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return new WatchModel(id, pid, mid);
    }

    public void removeWatchFromDb(Integer wid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", TABLE, wid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
