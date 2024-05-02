package org.example.springbootbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.User;
import org.example.springbootbackend.repo.UserRepository;
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
