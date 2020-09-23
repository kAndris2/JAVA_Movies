package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.ImageDataService;
import com.springboot.movies.model.ImageModel;
import com.springboot.movies.model.RatingModel;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ImageService {
    IDAO idao = IDAO.getInstance();

    ImageDataService ids = new ImageDataService(idao);

    public ImageService() throws SQLException {
    }

    public ImageModel getProfileImage(Integer userId) throws IllegalAccessException {
        List<ImageModel> images = getImages(userId);

        if (images.size() >= 1)
            return images.get(images.size() - 1);
        return null;
    }

    public List<ImageModel> getImages(Integer userId) {
        List<ImageModel> images = new ArrayList<>();

        for (ImageModel image : idao.getPictures()) {
            if (userId.equals(image.getUserId()))
                images.add(image);
        }
        return images;
    }

    public void uploadImage(MultipartFile file, Integer userId) throws IOException {
        String path = "\\src\\main\\resources\\pics",
                uploadPath = System.getProperty("user.dir") + path;

        if (Files.notExists(Path.of(uploadPath))) {
            Files.createDirectory(Path.of(uploadPath));
        }

        String filename = createUniqueFilename() + file.getName().split(".")[1],
                filePath = uploadPath + filename;

        file.transferTo(
                new File(filePath)
        );

        idao.getPictures().add(
                ids.createImage(filePath, userId)
        );
    }

    String createUniqueFilename() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        char[] chars = characters.toCharArray();
        String unique = "";
        int length = 20;
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            unique += chars[random.nextInt(chars.length)];
        }
        return unique;
    }

    public void deleteImage(Integer iid) throws SQLException {
        for (ImageModel image : idao.getPictures()) {
            if (iid.equals(image.getId())) {
                ids.removeImageFromDb(image.getId());
                idao.getPictures().remove(image);
                break;
            }
        }
    }

    public void resetImages(Integer uid) throws SQLException {
        ids.resetImages(uid);
        for (ImageModel image : idao.getPictures()) {
            if (uid.equals(image.getUserId()))
                idao.getPictures().remove(image);
        }
    }
}
