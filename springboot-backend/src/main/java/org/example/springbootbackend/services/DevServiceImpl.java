package org.example.springbootbackend.services;

import org.example.springbootbackend.domain.Dev;
import org.example.springbootbackend.repo.DevRepository;
import org.springframework.stereotype.Service;

@Service
public class DevServiceImpl implements DevService{

    private final DevRepository devRepository;

    public DevServiceImpl(DevRepository devRepository) {
        this.devRepository = devRepository;
    }

    @Override
    public Iterable<Dev> findAll() {
        return devRepository.findAll();
    }
}
