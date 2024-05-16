package org.example.springbootbackend.service.impl;

import jakarta.transaction.Transactional;
import org.example.springbootbackend.entity.Dev;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.exception.EmailAlreadyExistsException;
import org.example.springbootbackend.repository.DevRepository;
import org.example.springbootbackend.service.DevService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class DevServiceImpl implements DevService {

    private static final Logger logger = LoggerFactory.getLogger(DevServiceImpl.class);
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
    public ApiResponse addDev(Dev dev) {
        try {
            logger.info("Attempting to register user with email: {}", dev.getEmail());
            devRepository.findByEmail(dev.getEmail())
                    .ifPresent(u -> {
                        throw new EmailAlreadyExistsException(dev.getEmail());
                    });

//            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//            String encodedPassword = encoder.encode(dev.getPassword());
//            dev.setPassword(encodedPassword);
            Dev data= devRepository.save(dev);
            String massage="User registered successfully with email: "+ dev.getEmail();
            logger.info("User registered successfully with email: {}", dev.getEmail());
            return  new ApiResponse(massage,data,200);
        } catch (EmailAlreadyExistsException e) {
            logger.error("Registration failed: Email already exists - {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("An unexpected error occurred during registration: {}", e.getMessage());
            throw new RuntimeException("Registration failed due to an unexpected error");
        }
    }
}



