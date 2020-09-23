package com.springboot.movies.controller;

import com.springboot.movies.service.ImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

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
}
