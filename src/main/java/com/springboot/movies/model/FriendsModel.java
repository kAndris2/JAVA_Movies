package com.springboot.movies.model;

import java.util.Arrays;
import java.util.List;

public class FriendsModel {
    Integer id;
    Integer userId_1;
    Integer userId_2;

    public FriendsModel(Integer id, Integer uid1, Integer uid2) {
        this.id = id;
        this.userId_1 = uid1;
        this.userId_2 = uid2;
    }

    public Integer getId() { return id; }

    public List<Integer> getFriends() {
        return Arrays.asList(
                new Integer[] {userId_1, userId_2}
        );
    }
}
