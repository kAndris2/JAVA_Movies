package com.springboot.movies.model;

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
    public Integer getUserId() { return this.userId; }
    public String getRoute() { return this.route; }
}
