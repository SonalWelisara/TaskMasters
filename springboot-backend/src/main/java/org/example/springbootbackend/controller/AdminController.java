package org.example.springbootbackend.controller;

import org.example.springbootbackend.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
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
