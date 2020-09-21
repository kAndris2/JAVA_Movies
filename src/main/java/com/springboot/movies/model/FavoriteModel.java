package com.springboot.movies.model;

public class FavoriteModel {
    Integer id;
    Integer userId;
    Integer movieId;

    public FavoriteModel(Integer userId, Integer movieId) {
        this.userId = userId;
        this.movieId = movieId;
    }

    public FavoriteModel(Integer id, Integer userId, Integer movieId) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
    }

    public Integer getId() { return id; }
    public Integer getUserId() { return userId; }
    public Integer getMovieId() { return movieId; }
}
