package org.example.springbootbackend.controller;

import org.example.springbootbackend.entity.Dev;
import org.example.springbootbackend.service.DevService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class DevController {

    private final DevService devService;

    public DevController(DevService devService) {
        this.devService = devService;
    }

//    @RequestMapping("/devs")
//    public String getDevs(Model model){
//
//        model.addAttribute("devs", devService.findAll());
//
//        return "devs";
//
//    }

    @GetMapping("/devs")
    public ResponseEntity<List<Dev>> getAllDevs() {
        List<Dev> devs = devService.findAll();
        return new ResponseEntity<>(devs, HttpStatus.OK);
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

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addDev")
    public Dev addDev(@RequestBody Dev dev ){
        return devService.addDev(dev);
    }

//    @CrossOrigin(origins = "http://localhost:4200")
//    @PostMapping("/addDev")
//    public ResponseEntity<?> addDev(@RequestBody Dev dev) {
//        // Check if email already exists
//        Dev existingEmail = devService.findByEmail(dev.getEmail());
//        if (existingEmail != null) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
//        }
//
//        // Check if username already exists
//        Dev existingUsername = devService.findByUsername(dev.getUsername());
//        if (existingUsername != null) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
//        }
//
//        // If email and username don't exist, proceed with adding the developer
//        Dev addedDev = devService.addDev(dev);
//        return ResponseEntity.status(HttpStatus.CREATED).body(addedDev);
//    }

}
