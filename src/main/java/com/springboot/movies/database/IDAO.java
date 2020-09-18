package com.springboot.movies.database;

import com.springboot.movies.model.ProfileModel;

import java.util.ArrayList;
import java.util.List;

public class IDAO {
    List<ProfileModel> profiles = new ArrayList<>();

    public List<ProfileModel> getProfiles() {
        return profiles;
    }

    public void put() {
        profiles.add(
                new ProfileModel(0, "Valaki", System.currentTimeMillis())
        );
    }
}
