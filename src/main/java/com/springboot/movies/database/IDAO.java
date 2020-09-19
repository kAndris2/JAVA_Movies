package com.springboot.movies.database;

import com.springboot.movies.model.ImageModel;
import com.springboot.movies.model.UserModel;
import com.springboot.movies.model.RateModel;
import com.springboot.movies.model.WatchModel;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class IDAO {
    final protected String URL = "jdbc:postgresql://localhost:5432/MoviesDB";
    final protected String USER = "postgres";
    final protected String PASSWORD = "admin";

    protected List<UserModel> users = new ArrayList<>();
    protected List<ImageModel> pictures = new ArrayList<>();
    protected List<WatchModel> watchList = new ArrayList<>();
    protected List<Integer> favorites = new ArrayList<>();
    protected List<UserModel> friendList = new ArrayList<>();
    protected List<RateModel> ratings = new ArrayList<>();

    public IDAO() throws SQLException {
        loadFiles();
    }

    //-Profile Methods--------------------------------------------------------------------------------------------------
    //-Watchlist Methods------------------------------------------------------------------------------------------------
    //-Favorites Methods------------------------------------------------------------------------------------------------
    public List<Integer> getFavorites() { return favorites; }
    public void addToFavorites(Integer movieID) { favorites.add(movieID); }
    public void removeFromFavorites(Integer movieID) { favorites.remove(movieID); }
    public void resetFavorites() { favorites.clear(); }

    //-Friendlist Methods-----------------------------------------------------------------------------------------------
    public List<UserModel> getFriendList() { return friendList; }
    public void addToFriendList(UserModel profile) { friendList.add(profile); }
    public void removeFromFriendList(UserModel user) { friendList.remove(user); }
    public void resetFriendList() { friendList.clear(); }

    //-Rating Methods---------------------------------------------------------------------------------------------------
    public List<RateModel> getRatings() { return ratings; }
    public void addToRatings(RateModel rate) { ratings.add(rate); }
    public void removeFromRatings(RateModel rate) { ratings.remove(rate); }
    public void resetRatings() { ratings.clear(); }

    //-Picture Methods--------------------------------------------------------------------------------------------------
    public List<ImageModel> getPictures() { return pictures; }
    public void addToPictures(ImageModel image) { pictures.add(image); }
    public void removeFromPictures(ImageModel image) { pictures.remove(image); }
    public void resetPictures() { pictures.clear(); }
    public ImageModel getProfileImage() throws IllegalAccessException {
        if (pictures.size() >= 1)
            return pictures.get(pictures.size() - 1);
        throw new IllegalAccessException();
    }

    void loadFiles() throws SQLException {
        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD)) {
            //-GET USERS
            try (PreparedStatement pst = con.prepareStatement("SELECT * FROM profiles")) {
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
        }
    }
}
