package com.luv2code.cruddemo.controller;

import com.luv2code.cruddemo.dao.impl.AppDAOImpl;
import com.luv2code.cruddemo.entity.Instructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class PlaygroundController {

    @Autowired
    private AppDAOImpl appDAOImpl;

    @GetMapping("/instructor/{instructorId}")
    @Cacheable(value = "instructor", key = "#instructorId")
    public Instructor getStudent(@PathVariable("instructorId") String instructorId) {
        Instructor instructor = appDAOImpl.findInstructorById(Integer.parseInt(instructorId));
        log.info("The Instructor : {}", instructor);
        return instructor;
    }

}
