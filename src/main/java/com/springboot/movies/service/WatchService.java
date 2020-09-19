package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.WatchDataService;
import com.springboot.movies.model.WatchModel;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class WatchService extends IDAO {

    WatchDataService wds = new WatchDataService();

    public WatchService() throws SQLException {
    }

    public List<WatchModel> getWatchList() { return watchList; }

    WatchModel getWatchById(Integer id) {
        return watchList.stream()
                .filter(w -> id.equals(w.getId()))
                .findAny()
                .orElse(null);
    }

    public List<WatchModel> getUserWatchList(Integer userId) {
        List<WatchModel> result = new ArrayList<>();

        for (WatchModel watch : watchList) {
            if (userId.equals(watch.getId()))
                result.add(watch);
        }
        return result;
    }

    public void addWatch(Integer userId, Integer movieId) throws SQLException {
        watchList.add(
            wds.createWatch(userId, movieId)
        );
    }

    public void removeWatch(Integer pid, Integer mid) throws SQLException {
        for (WatchModel watch : getWatchList()) {
            if (pid.equals(watch.getProfile_id()) && mid.equals(watch.getMovie_id())) {
                wds.removeWatchFromDb(watch.getId());
                watchList.remove(watch);
                break;
            }
        }
    }

    public void resetWatchList(Integer pid) throws SQLException {
        for (WatchModel watch : getWatchList()) {
            if (pid.equals(watch.getProfile_id())) {
                wds.removeWatchFromDb(watch.getId());
                watchList.remove(watch);
            }
        }
    }
}
