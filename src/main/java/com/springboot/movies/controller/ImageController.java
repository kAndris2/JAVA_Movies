package com.springboot.movies.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class ImageController {

    @PostMapping("upload_image")
    void uploadImage(@RequestParam("file") MultipartFile file) {
        
    }
}
