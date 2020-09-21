package com.springboot.movies.model;

import java.util.Arrays;
import java.util.List;

public class FriendRequestModel {
    Integer id;
    Integer from;
    Integer to;

    public FriendRequestModel(Integer id, Integer from, Integer to) {
        this.id = id;
        this.from = from;
        this.to = to;
    }

    public Integer getId() { return id; }

    public Integer getFrom() { return from; }

    public Integer getTo() { return to; }

    public List<Integer> getUsers() {
        return Arrays.asList(
                new Integer[] { from, to }
        );
    }
}
