package org.example.springbootbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.User;
import org.example.springbootbackend.services.TempUserStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class TempUserStoreController {

    private final TempUserStoreService tempUserStoreService;

    // get user by id
    @GetMapping("userStore/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = tempUserStoreService.getUserById(id);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        else{
            return ResponseEntity.ok(user);
        }
    }
}
