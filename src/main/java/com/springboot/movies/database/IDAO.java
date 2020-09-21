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
    final public String RATING_TABLE = "ratings";

    List<UserModel> users = new ArrayList<>();
    List<ImageModel> pictures = new ArrayList<>();
    List<WatchModel> watchList = new ArrayList<>();
    List<FavoriteModel> favorites = new ArrayList<>();
    List<UserModel> friendList = new ArrayList<>();
    List<RateModel> ratings = new ArrayList<>();

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
    public List<UserModel> getFriendList() { return friendList; }
    public List<RateModel> getRatings() { return ratings; }

    //-Profile Methods--------------------------------------------------------------------------------------------------
    //-Watchlist Methods------------------------------------------------------------------------------------------------
    //-Favorites Methods------------------------------------------------------------------------------------------------
    //-Friendlist Methods-----------------------------------------------------------------------------------------------
    public void addToFriendList(UserModel profile) { friendList.add(profile); }
    public void removeFromFriendList(UserModel user) { friendList.remove(user); }
    public void resetFriendList() { friendList.clear(); }

    //-Rating Methods---------------------------------------------------------------------------------------------------
    public void addToRatings(RateModel rate) { ratings.add(rate); }
    public void removeFromRatings(RateModel rate) { ratings.remove(rate); }
    public void resetRatings() { ratings.clear(); }

    //-Picture Methods--------------------------------------------------------------------------------------------------
    public void addToPictures(ImageModel image) { pictures.add(image); }
    public void removeFromPictures(ImageModel image) { pictures.remove(image); }
    public void resetPictures() { pictures.clear(); }
    public ImageModel getProfileImage() throws IllegalAccessException {
        if (pictures.size() >= 1)
            return pictures.get(pictures.size() - 1);
        throw new IllegalAccessException();
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
        }
    }
}
