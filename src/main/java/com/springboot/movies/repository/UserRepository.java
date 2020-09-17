package com.springboot.movies.repository;

import com.springboot.movies.model.ProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<ProfileModel, Integer>{
    /*
    private List<ProfileModel> profiles = new ArrayList<>();

    public List<ProfileModel> getAll() { return profiles; }
    public void addProfile(ProfileModel profile) { profiles.add(profile); }
     */
}