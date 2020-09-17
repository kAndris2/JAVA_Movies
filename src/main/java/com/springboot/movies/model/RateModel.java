package com.springboot.movies.model;

import java.util.Date;

public class RateModel {
    private Integer id;
    private Integer movieId;
    private Integer rate;
    private Date date;

    public RateModel(Integer id, Integer movieId, Integer rate, Date date) {
        this.id = id;
        this.movieId = movieId;
        this.rate = rate;
        this.date = date;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getMovieId() {
        return this.movieId;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
