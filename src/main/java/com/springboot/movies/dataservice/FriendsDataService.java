package com.springboot.movies.dataservice;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.model.FriendRequestModel;
import com.springboot.movies.model.FriendsModel;
import java.sql.*;

public class FriendsDataService {
    IDAO idao;

    public FriendsDataService(IDAO idao) {
        this.idao = idao;
    }

    public FriendRequestModel createFriendRequest(Integer from, Integer to) throws SQLException {
        int id = -1;
        String sqlstr = String.format("INSERT INTO %s " +
                "(from, to) " +
                "VALUES " +
                "(?, ?) " +
                "RETURNING id", idao.FRIEND_REQUEST_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setInt(1, from);
            pst.setInt(2, to);
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return new FriendRequestModel(id, from, to);
    }

    public void removeFriendRequestFromDb(Integer frid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.FRIEND_REQUEST_TABLE, frid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }

    public FriendsModel createFriends(Integer uid1, Integer uid2) throws SQLException {
        int id = -1;
        String sqlstr = String.format("INSERT INTO %s " +
                "(user_id_1, user_id_2) " +
                "VALUES " +
                "(?, ?) " +
                "RETURNING id", idao.FRIEND_TABLE);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.setInt(1, uid1);
            pst.setInt(2, uid2);
            //
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    id = rs.getInt(1);
                }
            }
        }
        return new FriendsModel(id, uid1, uid2);
    }

    public void removeFriendsFromDb(Integer fid) throws SQLException {
        String sqlstr = String.format("DELETE FROM %s WHERE id = %d", idao.FRIEND_TABLE, fid);
        try (Connection con = DriverManager.getConnection(idao.URL, idao.USER, idao.PASSWORD);
             PreparedStatement pst = con.prepareStatement(sqlstr)) {
            pst.executeQuery();
        }
    }
}
