package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.Dev;
import org.example.springbootbackend.utils.ApiResponse;

import java.util.List;

public interface DevService{

    List<Dev> findAll();
    Dev getDevById(Long id);
    Dev updateDev(Dev dev);
    void deleteDev(Long id);
    ApiResponse addDev(Dev dev);



}
