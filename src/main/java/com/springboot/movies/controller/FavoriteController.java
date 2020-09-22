package com.springboot.movies.controller;

import com.springboot.movies.model.FavoriteModel;
import com.springboot.movies.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class FavoriteController {

    FavoriteService fs = new FavoriteService();

    public FavoriteController() throws SQLException { }

    @GetMapping("favorites/{userId}")
    List<FavoriteModel> getFavoritesByUserId(@PathVariable(value = "userId") Integer userId) {
        return fs.getFavoritesByUserId(userId);
    }

    @PostMapping("add_favorite")
    void addFavorite(@RequestBody FavoriteModel favorite) throws SQLException {
        fs.addToFavorites(favorite);
    }

    @DeleteMapping("delete_favorite/{userId}/{movieId}")
    void deleteFavorite(@PathVariable(value = "userId") Integer userId, @PathVariable(value = "movieId") Integer movieId) throws SQLException {
        fs.deleteFavorite(userId, movieId);
    }

    @DeleteMapping("reset_favorites/{userId}")
    void resetFavorites(@PathVariable(value = "userId") Integer userId) throws SQLException {
        fs.resetFavorites(userId);
    }
}
