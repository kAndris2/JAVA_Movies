package com.springboot.movies.model;

public class WatchModel {
    Integer id;
    Integer userId;
    Integer movieId;

    public WatchModel(Integer id, Integer uid, Integer mid) {
        this.id = id;
        this.userId = uid;
        this.movieId = mid;
    }

    public Integer getId() { return id; }
    public Integer getUserId() { return userId; }
    public Integer getMovieId() { return movieId; }
}
