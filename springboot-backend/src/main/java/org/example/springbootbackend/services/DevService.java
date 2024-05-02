package org.example.springbootbackend.services;

import org.example.springbootbackend.domain.Dev;

import java.util.List;

public interface DevService{

    List<Dev> findAll();
    Dev getDevById(Long id);
    Dev updateDev(Dev dev);
    void deleteDev(Long id);
    Dev addDev(Dev dev);

    //authentication
    Dev findByEmail(String email);
    Dev findByUsername(String username);

}
