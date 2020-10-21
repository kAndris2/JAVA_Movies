package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.WatchDataService;
import com.springboot.movies.model.WatchModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class WatchService {

    IDAO idao = IDAO.getInstance();
    WatchDataService wds = new WatchDataService(idao);

    public WatchService() throws SQLException {
    }

    public List<WatchModel> getUserWatchList(Integer userId) {
        List<WatchModel> result = new ArrayList<>();

        for (WatchModel watch : idao.getWatchList()) {
            if (userId.equals(watch.getUserId()))
                result.add(watch);
        }
        return result;
    }

    public void addWatch(Integer userId, Integer movieId) throws SQLException {
        idao.getWatchList().add(
            wds.createWatch(userId, movieId)
        );
    }

    public void removeWatch(Integer uid, Integer mid) throws SQLException {
        for (WatchModel watch : idao.getWatchList()) {
            if (uid.equals(watch.getUserId()) && mid.equals(watch.getMovieId())) {
                wds.removeWatchFromDb(watch.getId());
                idao.getWatchList().remove(watch);
                break;
            }
        }
    }

    public void resetWatchList(Integer uid) throws SQLException {
        wds.resetWatchList(uid);
        for (WatchModel watch : idao.getWatchList()) {
            if (uid.equals(watch.getUserId()))
                idao.getWatchList().remove(watch);
        }
    }
}
