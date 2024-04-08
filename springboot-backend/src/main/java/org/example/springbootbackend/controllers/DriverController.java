package org.example.springbootbackend.controllers;

import org.example.springbootbackend.domain.Driver;
import org.example.springbootbackend.repo.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")

public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    //get all Driver

    @GetMapping("/drivers")
    public List<Driver> getAllDriver(){
        return driverRepository.findAll();
    }

}
