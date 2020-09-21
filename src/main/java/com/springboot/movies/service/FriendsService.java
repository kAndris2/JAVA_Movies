package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.FriendsDataService;
import com.springboot.movies.model.FriendRequestModel;
import com.springboot.movies.model.FriendsModel;
import com.springboot.movies.model.UserModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FriendsService {
    IDAO idao = IDAO.getInstance();

    FriendsDataService fds = new FriendsDataService(idao);

    public FriendsService() throws SQLException {
    }

    //Akkor is dobja vissza ha ban ilyen request!!!!!!!!
    public Boolean validateRequest(Integer from, Integer to) throws SQLException {
        List<UserModel> friends = getFriendsOfUser(from);

        if (!friends.contains(idao.getUserById(to))) {
            idao.getFriendRequests().add(
                    fds.createFriendRequest(from, to)
            );
            return true;
        }
        return false;
    }

    public List<UserModel> getFriendsOfUser(Integer uid) {
        List<UserModel> users = new ArrayList<>();

        for (FriendsModel fm : idao.getFriendList()) {
            if (fm.getFriends().contains(uid)) {
                int id = fm.getFriends().stream()
                        .filter(u -> u != uid)
                        .findFirst()
                        .orElse(null);
                users.add(idao.getUserById(id));
            }
        }
        return users;
    }

    public void deleteFriend(Integer who, Integer whom) throws SQLException {
        FriendsModel fm = getFriendByUsers(who, whom);

        fds.removeFriendsFromDb(fm.getId());
        idao.getFriendList().remove(fm);
    }

    public void acceptFriendRequest(Integer who, Integer whose) throws SQLException {
        FriendRequestModel frm = getFriendRequestByUsers(who, whose);

        fds.removeFriendRequestFromDb(frm.getId());
        idao.getFriendRequests().remove(frm);
        //
        idao.getFriendList().add(
          fds.createFriends(whose, who)
        );
    }

    public void declineFriendRequest(Integer who, Integer whose) throws SQLException {
        FriendRequestModel frm = getFriendRequestByUsers(who, whose);

        fds.removeFriendRequestFromDb(frm.getId());
        idao.getFriendRequests().remove(frm);
    }

    FriendRequestModel getFriendRequestByUsers(Integer who, Integer whose) {
        FriendRequestModel frm = null;
        for (FriendRequestModel request : idao.getFriendRequests()) {
            if (who.equals(request.getTo()) && whose.equals(request.getFrom())) {
                frm = request;
                break;
            }
        }
        return frm;
    }

    FriendsModel getFriendByUsers(Integer uid1, Integer uid2) {
        FriendsModel fm = null;
        for (FriendsModel friends : idao.getFriendList()) {
            if (friends.getFriends().contains(uid1) && friends.getFriends().contains(uid2)) {
                fm = friends;
                break;
            }
        }
        return fm;
    }
}
