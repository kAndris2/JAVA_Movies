package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.RatingDataService;
import com.springboot.movies.model.RatingModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RatingService {
    IDAO idao = IDAO.getInstance();

    RatingDataService rds = new RatingDataService(idao);

    public RatingService() throws SQLException {
    }

    public List<RatingModel> getRatingsByUserId(Integer uid) {
        List<RatingModel> result = new ArrayList<>();

        for (RatingModel rating : idao.getRatings()) {
            if (uid.equals(rating.getUserId()))
                result.add(rating);
        }
        return result;
    }

    public Integer countRatings(Integer uid) {
        return getRatingsByUserId(uid).size();
    }

    public Integer getAvgOfRatings(Integer uid) {
        List<RatingModel> ratings = getRatingsByUserId(uid);

        if (ratings.size() == 0)
            return 0;
        else {
            Integer sum = 0;
            for (RatingModel rate : ratings) {
                sum += rate.getRate();
            }
            return sum / ratings.size();
        }
    }

    public void addRating(Integer uid, Integer mid, Integer rate) throws SQLException {
        idao.getRatings().add(
              rds.createRating(uid, mid, rate)
        );
    }

    public void deleteRating(Integer uid, Integer mid) throws SQLException {
        for (RatingModel rating : idao.getRatings()) {
            if (uid.equals(rating.getUserId()) && mid.equals(rating.getMovieId())) {
                rds.removeRatingFromDb(rating.getId());
                idao.getRatings().remove(rating);
                break;
            }
        }
    }

    public void resetRatings(Integer uid) throws SQLException {
        rds.resetRatings(uid);
        for (RatingModel rating : idao.getRatings()) {
            if (uid.equals(rating.getUserId()))
                idao.getRatings().remove(rating);
        }
    }
}
