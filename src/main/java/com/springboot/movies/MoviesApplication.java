package com.springboot.movies;

import com.springboot.movies.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MoviesApplication { //implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MoviesApplication.class, args);
    }

    /*
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String...args) throws Exception {
        this.userRepository.save(new ProfileModel(0, "Alfonz", System.currentTimeMillis()));
    }
     */
}
