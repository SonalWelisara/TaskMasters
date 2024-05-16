package org.example.springbootbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.service.TempUserStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/store/")
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
