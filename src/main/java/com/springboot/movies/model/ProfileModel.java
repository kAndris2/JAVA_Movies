package com.springboot.movies.model;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
@Entity
@Table(name = "users")
 */
public class ProfileModel {

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Long registrationDate;

    /*
    private List<ImageModel> pictures = new ArrayList<>();
    private List<Integer> watchList = new ArrayList<>();
    private List<Integer> favorites = new ArrayList<>();
    private List<ProfileModel> friendList = new ArrayList<>();
    private List<RateModel> ratings = new ArrayList<>();
     */

    //public ProfileModel() {}

    public ProfileModel(Integer id, String name, Long registration) {
        this.id = id;
        this.name = name;
        this.registrationDate = registration;
    }

    public Integer getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRegistrationDate() {
        DateFormat simple = new SimpleDateFormat("dd MMM yyyy HH:mm:ss:SSS Z");
        Date result = new Date(registrationDate);
        return simple.format(result);
    }

    /*
    public List<Integer> getWatchList() { return watchList; }
    public void addToWatchList(Integer movieID) { this.watchList.add(movieID); }
    public void removeFromWatchList(Integer movieID) { this.watchList.remove(movieID); }
    public void resetWatchList() { this.watchList.clear(); }

    public List<Integer> getFavorites() { return favorites; }
    public void addToFavorites(Integer movieID) { this.favorites.add(movieID); }
    public void removeFromFavorites(Integer movieID) { this.favorites.remove(movieID); }
    public void resetFavorites() { this.favorites.clear(); }

    public List<ProfileModel> getFriendList() { return friendList; }
    public void addToFriendList(ProfileModel profile) { this.friendList.add(profile); }
    public void removeFromFriendList(ProfileModel profile) { this.friendList.remove(profile); }
    public void resetFriendList() { this.friendList.clear(); }

    public List<RateModel> getRatings() { return ratings; }
    public void addToRatings(RateModel rate) { this.ratings.add(rate); }
    public void removeFromRatings(RateModel rate) { this.ratings.remove(rate); }
    public void resetRatings() { this.ratings.clear(); }

    public List<ImageModel> getPictures() { return pictures; }
    public void addToPictures(ImageModel image) { this.pictures.add(image); }
    public void removeFromPictures(ImageModel image) { this.pictures.remove(id); }
    public void resetPictures() { this.pictures.clear(); }
    public ImageModel getProfileImage() throws IllegalAccessException {
        if (pictures.size() >= 1)
            return pictures.get(pictures.size() - 1);
        throw new IllegalAccessException();
    }
     */
}
