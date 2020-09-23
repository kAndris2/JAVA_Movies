package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.ImageDataService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.Random;

public class ImageService {
    IDAO idao = IDAO.getInstance();

    ImageDataService ids = new ImageDataService(idao);

    public ImageService() throws SQLException {
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
}
