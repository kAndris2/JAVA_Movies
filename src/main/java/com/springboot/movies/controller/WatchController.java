package com.springboot.movies.controller;

import com.springboot.movies.model.UserModel;
import com.springboot.movies.model.WatchModel;
import com.springboot.movies.service.WatchService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class WatchController {

    WatchService ws = new WatchService();

    public WatchController() throws SQLException {
    }

    @GetMapping("watchlist/{userId}")
    List<WatchModel> getWatchlist(@PathVariable(value = "userId") Integer userId) {
        return ws.getUserWatchList(userId);
    }

    @PutMapping("add_watch/{userId}/{movieId}")
    void addWatchToList(@PathVariable(value = "userId") Integer userId, @PathVariable(value = "movieId") Integer movieId) throws SQLException {
        ws.addWatch(userId, movieId);
    }

    @DeleteMapping("delete_watch/{userId}/{movieId}")
    void removeWatch(@PathVariable(value = "userId") Integer userId, @PathVariable(value = "movieId") Integer movieId) throws SQLException {
        ws.removeWatch(userId, movieId);
    }

    @DeleteMapping("reset_watchlist/{userId}")
    void resetWatchlist(@PathVariable(value = "userId") Integer userId) throws SQLException {
        ws.resetWatchList(userId);
    }
}
