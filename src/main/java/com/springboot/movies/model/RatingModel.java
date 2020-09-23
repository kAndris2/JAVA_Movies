package com.springboot.movies.model;

public class RatingModel {
    private Integer id;
    private Integer userId;
    private Integer movieId;
    private Integer rate;
    private Long date;

    public RatingModel(Integer id, Integer userid, Integer movieId, Integer rate, Long date) {
        this.id = id;
        this.userId = userid;
        this.movieId = movieId;
        this.rate = rate;
        this.date = date;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getUserId() { return userId; }

    public Integer getMovieId() {
        return this.movieId;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }
}
