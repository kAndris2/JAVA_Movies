package com.springboot.movies.database;

import com.springboot.movies.model.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class IDAO {
    private static IDAO singleton = null;

    final public String URL = "jdbc:postgresql://localhost:5432/MoviesDB";
    final public String USER = "postgres";
    final public String PASSWORD = "admin";

    final public String USER_TABLE = "users";
    final public String PICTURE_TABLE = "pictures";
    final public String WATCHLIST_TABLE = "watchlists";
    final public String FAVORITE_TABLE = "favorites";
    final public String FRIEND_TABLE = "friends";
    final public String FRIEND_REQUEST_TABLE = "friend_requests";
    final public String RATING_TABLE = "ratings";

    List<UserModel> users = new ArrayList<>();
    List<ImageModel> pictures = new ArrayList<>();
    List<WatchModel> watchList = new ArrayList<>();
    List<FavoriteModel> favorites = new ArrayList<>();
    List<FriendsModel> friendList = new ArrayList<>();
    List<FriendRequestModel> friendRequests = new ArrayList<>();
    List<RatingModel> ratings = new ArrayList<>();

    public IDAO() throws SQLException {
        loadFiles();
    }

    public static IDAO getInstance() throws SQLException {
        if(singleton == null)
            singleton = new IDAO();

        return singleton;
    }

    public List<UserModel> getUsers() { return users; }
    public List<ImageModel> getPictures() { return pictures; }
    public List<WatchModel> getWatchList()  { return watchList; }
    public List<FavoriteModel> getFavorites() { return favorites; }
    public List<FriendsModel> getFriendList() { return friendList; }
    public List<FriendRequestModel> getFriendRequests() { return friendRequests; }
    public List<RatingModel> getRatings() { return ratings; }

    //-Picture Methods--------------------------------------------------------------------------------------------------
    /*
    public void addToPictures(ImageModel image) { pictures.add(image); }
    public void removeFromPictures(ImageModel image) { pictures.remove(image); }
    public void resetPictures() { pictures.clear(); }
    public ImageModel getProfileImage() throws IllegalAccessException {
        if (pictures.size() >= 1)
            return pictures.get(pictures.size() - 1);
        throw new IllegalAccessException();
    }
     */

    public UserModel getUserById(Integer id) {
        return getUsers().stream()
                .filter(p -> id.equals(p.getId()))
                .findAny()
                .orElse(null);
    }

    void loadFiles() throws SQLException {
        String sqlstr;

        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD)) {
            //-GET USERS
            sqlstr = String.format("SELECT * FROM %s", USER_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        users.add(
                                new UserModel(
                                        rs.getInt(1),
                                        rs.getString(2),
                                        rs.getString(4),
                                        rs.getString(5),
                                        rs.getLong(3)
                                )
                        );
                    }
                }
            }
            //-GET RATINGS
            sqlstr = String.format("SELECT * FROM %s", RATING_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        ratings.add(
                            new RatingModel(
                                    rs.getInt(1),
                                    rs.getInt(2),
                                    rs.getInt(3),
                                    rs.getInt(4),
                                    rs.getLong(5)
                            )
                        );
                    }
                }
            }
            //-GET WATCHLISTS
            sqlstr = String.format("SELECT * FROM %s", WATCHLIST_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        watchList.add(
                                new WatchModel(
                                        rs.getInt(1),
                                        rs.getInt(2),
                                        rs.getInt(3)
                                )
                        );
                    }
                }
            }
            //-GET FAVORITES
            sqlstr = String.format("SELECT * FROM %s", FAVORITE_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        favorites.add(
                                new FavoriteModel(
                                        rs.getInt(1),
                                        rs.getInt(2),
                                        rs.getInt(3)
                                )
                        );
                    }
                }
            }
            //-GET FRIENDS
            sqlstr = String.format("SELECT * FROM %s", FRIEND_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        friendList.add(
                                new FriendsModel(
                                        rs.getInt(1),
                                        rs.getInt(2),
                                        rs.getInt(3)
                                )
                        );
                    }
                }
            }
            //-GET FRIEND-REQUESTS
            sqlstr = String.format("SELECT * FROM %s", FRIEND_REQUEST_TABLE);
            try (PreparedStatement pst = con.prepareStatement(sqlstr)) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        friendRequests.add(
                                new FriendRequestModel(
                                        rs.getInt(1),
                                        rs.getInt(2),
                                        rs.getInt(3)
                                )
                        );
                    }
                }
            }
        }
    }
}
