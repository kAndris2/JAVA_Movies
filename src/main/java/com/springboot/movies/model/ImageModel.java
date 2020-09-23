package com.springboot.movies.model;

import java.util.Date;

public class ImageModel {
    private Integer id;
    private Long uploadDate;
    private String route;
    private Integer userId;

    public ImageModel(Integer id, Long date, String route, Integer userId) {
        this.id = id;
        this.uploadDate = date;
        this.route = route;
        this.userId = userId;
    }

    public Integer getId() { return this.id; }

    public Long getUploadDate() { return this.uploadDate; }

    public String getRoute() { return this.route; }

    public Integer getUserId() { return this.userId; }
}
