package org.example.springbootbackend.services;

import org.example.springbootbackend.domain.Dev;
import org.example.springbootbackend.repo.DevRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DevServiceImpl implements DevService{

    private final DevRepository devRepository;

    public DevServiceImpl(DevRepository devRepository) {
        this.devRepository = devRepository;
    }

    @Override
    public List<Dev> findAll() {
        return devRepository.findAll();
    }

    @Override
    public Dev getDevById(Long id) {
        return devRepository.findById(id).orElse(null);
    }

    @Override
    public Dev updateDev(Dev dev) {
        return devRepository.save(dev);
    }

    @Override
    public void deleteDev(Long id) {
        devRepository.deleteById(id);
    }

    @Override
    public Dev addDev(Dev dev) {
        return devRepository.save(dev);
    }

    @Override
    public Dev findByEmail(String email) {
        return devRepository.findByEmail(email);
    }

    @Override
    public Dev findByUsername(String username) {
        return devRepository.findByUsername(username);
    }

}
