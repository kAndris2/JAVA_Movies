package com.springboot.movies.model;

import java.util.Date;

public class ImageModel {
    private Integer id;
    private Date uploadDate;
    private String route;

    public ImageModel(Integer id, Date date, String route) {
        this.id = id;
        this.uploadDate = date;
        this.route = route;
    }

    public Integer getId() { return this.id; }

    public Date getUploadDate() { return this.uploadDate; }

    public String getRoute() { return this.route; }
}
