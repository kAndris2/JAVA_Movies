package com.springboot.movies.controller;

import com.springboot.movies.model.RatingModel;
import com.springboot.movies.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class RatingController {

    RatingService rs = new RatingService();

    public RatingController() throws SQLException { }

    @GetMapping("ratings/{userId}")
    List<RatingModel> getRatingsByUserId(@PathVariable(value = "userId") Integer userId) {
        return rs.getRatingsByUserId(userId);
    }

    @PostMapping("add_rating/{userId}/{movieId}/{rate}")
    void addRating(@PathVariable(value = "userId") Integer userId, @PathVariable(value = "movieId") Integer movieId, @PathVariable(value = "rate") Integer rate) throws SQLException {
        rs.addRating(userId, movieId, rate);
    }

    @DeleteMapping("delete_rating/{userId}/{movieId}")
    void deleteRating(@PathVariable(value = "userId") Integer userId, @PathVariable(value = "movieId") Integer movieId) throws SQLException {
        rs.deleteRating(userId, movieId);
    }

    @DeleteMapping("reset_rating/{userId}")
    void resetRating(@PathVariable(value = "userId") Integer userId) throws SQLException {
        rs.resetRatings(userId);
    }
}
