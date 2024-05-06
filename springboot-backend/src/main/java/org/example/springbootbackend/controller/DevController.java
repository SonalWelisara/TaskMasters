package org.example.springbootbackend.controller;

import org.example.springbootbackend.entity.Dev;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.exception.EmailAlreadyExistsException;
import org.example.springbootbackend.service.DevService;
import org.example.springbootbackend.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class DevController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final DevService devService;
    public DevController(DevService devService) {
        this.devService = devService;
    }

    @GetMapping("/devs")
    public ResponseEntity<List<Dev>> getAllDevs() {
        //List<Dev> devs = devService.findAll();
        //return new ResponseEntity<>(devs, HttpStatus.OK);
        return  ResponseEntity.status(HttpStatus.OK).body(devService.findAll());

    }

    @GetMapping("/devs/{id}")
    public ResponseEntity<Dev> getDevById(@PathVariable Long id ){
        Dev dev = devService.getDevById(id);
        if(dev == null){
            return ResponseEntity.notFound().build();
        }
        else{
            return ResponseEntity.ok(dev);
        }
    }

    //update dev
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/updateDev/{id}")
    public ResponseEntity<Dev> updateDev(@PathVariable Long id , @RequestBody Dev dev){
        Dev existingDev = devService.getDevById(id);
        if(existingDev == null){
            return ResponseEntity.notFound().build();
        }
        else{

            existingDev.setFName(dev.getFName());
            existingDev.setLName(dev.getLName());
            existingDev.setContactNo(dev.getContactNo());
            existingDev.setEmail((dev.getEmail()));
            existingDev.setPassword(dev.getPassword());

            Dev updatedDev = devService.updateDev(existingDev);
            return  ResponseEntity.ok(updatedDev);
        }
    }

    @DeleteMapping("/devs/{id}")
    public ResponseEntity<?> deleteDev(@PathVariable Long id){
        Dev existingDev = devService.getDevById(id);
        if(existingDev == null){
            return ResponseEntity.notFound().build();
        }
        else{
            devService.deleteDev(id);
            return ResponseEntity.ok().build();
        }
    }

    @CrossOrigin("*")
    @PostMapping("/addDev")
    public ResponseEntity<ApiResponse<Dev>> addDev(@RequestBody Dev dev ){
        try {
            logger.info("Starting user registration for {}", dev.getEmail());
            ApiResponse registeredUserResponse = devService.addDev(dev);
            logger.info("User registration completed for {}", dev.getEmail());
            return ResponseEntity.ok(registeredUserResponse);
        } catch (EmailAlreadyExistsException e) {
            logger.error("Registration unsuccessful for {}: {}", dev.getEmail(), e.getMessage());
            ApiResponse<Dev> response = new ApiResponse<>("Registration Unsuccessful, " + e.getMessage(),409);
            return ResponseEntity.status(401).body(response);
        }catch (Exception e){
            logger.error("Registration unsuccessful for {}: {}", dev.getEmail(), e.getMessage());
            ApiResponse<Dev> response = new ApiResponse<>("Registration Unsuccessful, " + e.getMessage(),200);
            return ResponseEntity.internalServerError().body(response);
        }
    }

}
