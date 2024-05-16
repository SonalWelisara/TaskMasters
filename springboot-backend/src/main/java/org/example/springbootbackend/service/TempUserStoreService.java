package org.example.springbootbackend.service;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TempUserStoreService {
    private final UserRepository userRepository ;


    //get user by id
    public User getUserById(Long id ){
        return userRepository.findById(id).orElse(null);
    }
}
