package com.springboot.movies.database;

import com.springboot.movies.model.ImageModel;
import com.springboot.movies.model.ProfileModel;
import com.springboot.movies.model.RateModel;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IDAO {
    final String URL = "jdbc:postgresql://localhost:5432/MoviesDB";
    final String USER = "postgres";
    final String PASSWORD = "admin";

    List<ProfileModel> profiles = new ArrayList<>();

    public IDAO() throws SQLException {
        loadFiles();
    }

    public List<ProfileModel> getProfiles() {
        return profiles;
    }

    ProfileModel getProfileById(Integer id) {
        return profiles.stream()
                .filter(profileId -> id.equals(profileId))
                .findAny()
                .orElse(null);
    }

    public void createProfile(ProfileModel profile) throws SQLException {
        int id = -1;
        long milis = System.currentTimeMillis();
        String sqlstr = String.format("INSERT INTO profiles " +
                        "(name, email, password, registration_date) " +
                        "VALUES " +
                        "(?, ?, ?, ?) " +
                        "RETURNING id"
                ,profile.getName(), profile.getEmail(), profile.getPassword(), milis);
        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
            PreparedStatement pst = con.prepareStatement(sqlstr)) {
                pst.setString(1, profile.getName());
                pst.setLong(4, milis);
                pst.setString(2, profile.getEmail());
                pst.setString(3, profile.getPassword());
                //
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        id = rs.getInt(1);
                    }
                }
        }
        profiles.add(
                new ProfileModel(
                        id,
                        profile.getName(),
                        profile.getEmail(),
                        profile.getPassword(),
                        milis
                )
        );
    }

    void loadFiles() throws SQLException {
        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD)) {
            //-GET USERS
            try (PreparedStatement pst = con.prepareStatement("SELECT * FROM profiles")) {
                try (ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        profiles.add(
                                new ProfileModel(
                                        rs.getInt(1),
                                        rs.getString(2),
                                        rs.getString(4),
                                        rs.getString(5),
                                        rs.getLong(3)
                                )
                        );
                        String str = String.format("User: %s added!", rs.getString(2));
                        System.out.println(str);
                    }
                }
            }
        }
    }
}
