package com.springboot.movies.database;

import com.springboot.movies.model.ImageModel;
import com.springboot.movies.model.ProfileModel;
import com.springboot.movies.model.RateModel;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IDAO {
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

    void loadFiles() throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/MoviesDB";
        String user = "postgres";
        String password = "admin";

        try (Connection con = DriverManager.getConnection(url, user, password)) {
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
                    }
                }
            }
        }
    }
}
