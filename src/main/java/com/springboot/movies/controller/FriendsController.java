package com.springboot.movies.controller;

import com.springboot.movies.model.UserModel;
import com.springboot.movies.service.FriendsService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class FriendsController {

    FriendsService fs = new FriendsService();

    public FriendsController() throws SQLException {
    }

    @GetMapping("send_friend_request/{from}/{to}")
    Boolean sendFriendRequest(@PathVariable(value = "from") Integer from, @PathVariable(value = "to") Integer to) throws SQLException {
        return fs.validateRequest(from, to);
    }

    @GetMapping("friends/{userId}")
    List<UserModel> getFriends(@PathVariable(value = "userId") Integer userId) {
        return fs.getFriendsOfUser(userId);
    }

    @GetMapping("friend_requests/{userId}")
    List<UserModel> getFriendRequests(@PathVariable(value = "userId") Integer userId) {
        return fs.getFriendRequests(userId);
    }

    @PutMapping("accept_friend_request/{who}/{whose}")
    void acceptFriendRequest(@PathVariable(value = "who") Integer who, @PathVariable(value = "whose") Integer whose) throws SQLException {
        fs.acceptFriendRequest(who, whose);
    }

    @PutMapping("decline_friend_request/{who}/{whose}")
    void declineFriendRequest(@PathVariable(value = "who") Integer who, @PathVariable(value = "whose") Integer whose) throws SQLException {
        fs.declineFriendRequest(who, whose);
    }

    @DeleteMapping("delete_friend/{who}/{whom}")
    void deleteFriend(@PathVariable(value = "who") Integer who, @PathVariable(value = "whom") Integer whom) throws SQLException {
        fs.deleteFriend(who, whom);
    }
}
