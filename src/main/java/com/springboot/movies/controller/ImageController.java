package com.springboot.movies.controller;

import com.springboot.movies.model.ImageModel;
import com.springboot.movies.service.ImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class ImageController {

    ImageService is = new ImageService();

    public ImageController() throws SQLException {
    }

    @PostMapping("upload_image/{userId}")
    void uploadImage(@RequestParam("file") MultipartFile file, @PathVariable(value = "userId") Integer userId) throws IOException {
        is.uploadImage(file, userId);
    }

    @GetMapping("images/{userId}")
    List<ImageModel> getImages(@PathVariable(value = "userId") Integer userId) {
        return is.getImages(userId);
    }

    @GetMapping("profile_image/{userId}")
    ImageModel getProfileImage(@PathVariable(value = "userId") Integer userId) throws IllegalAccessException {
        return is.getProfileImage(userId);
    }

    @PostMapping("dominant_color")
    String getDominantColor(@RequestParam("file") MultipartFile file) throws IOException {
        return is.getDominantColor(file);
    }

    @DeleteMapping("delete_image/{imageId}")
    void deleteImage(@PathVariable(value = "imageId") Integer imageId) throws SQLException {
        is.deleteImage(imageId);
    }

    @DeleteMapping("reset_images/{userId}")
    void resetImages(@PathVariable(value = "userId") Integer userId) throws SQLException {
        is.resetImages(userId);
    }
}
