package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.FavoriteDataService;
import com.springboot.movies.model.FavoriteModel;
import com.springboot.movies.model.WatchModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FavoriteService {

    IDAO idao = IDAO.getInstance();
    FavoriteDataService fds = new FavoriteDataService(idao);

    public FavoriteService() throws SQLException {
    }

    public List<FavoriteModel> getFavoritesByUserId(Integer uid) {
        List<FavoriteModel> result = new ArrayList<>();

        for (FavoriteModel favorite : idao.getFavorites()) {
            if (uid.equals(favorite.getUserId()))
                result.add(favorite);
        }
        return result;
    }

    public void addToFavorites(FavoriteModel favorite) throws SQLException {
        idao.getFavorites().add(
          fds.createFavorite(favorite)
        );
    }

    public void deleteFavorite(Integer uid, Integer mid) throws SQLException {
        for (FavoriteModel favorite : idao.getFavorites()) {
            if (uid.equals(favorite.getUserId()) && mid.equals(favorite.getMovieId())) {
                fds.removeFavoriteFromDb(favorite.getId());
                idao.getFavorites().remove(favorite);
                break;
            }
        }
    }

    public void resetFavorites(Integer uid) throws SQLException {
        fds.resetFavorites(uid);
        for (FavoriteModel favorite : idao.getFavorites()) {
            if (uid.equals(favorite.getUserId()))
                idao.getFavorites().remove(favorite);
        }
    }
}
