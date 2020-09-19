package com.springboot.movies.model;

public class WatchModel {
    Integer id;
    Integer profile_id;
    Integer movie_id;

    public WatchModel(Integer id, Integer pid, Integer mid) {
        this.id = id;
        this.profile_id = pid;
        this.movie_id = mid;
    }

    public Integer getId() { return id; }
    public Integer getProfile_id() { return profile_id; }
    public Integer getMovie_id() { return movie_id; }
}
