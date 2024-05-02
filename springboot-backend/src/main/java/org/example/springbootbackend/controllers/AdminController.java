package org.example.springbootbackend.controllers;

import org.example.springbootbackend.services.AdminService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/adminPayment") // Ensure the path matches the one in your Angular application
    public List<Object[]> getMonthlyPayments(@RequestParam int year) {
        return adminService.getMonthlyPayments(year);
    }

}
