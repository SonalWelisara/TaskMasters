package org.example.springbootbackend.controller;

import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.Employee;
import org.example.springbootbackend.service.AdminService;
import org.example.springbootbackend.service.FeedbackStoreService;
import org.example.springbootbackend.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final FeedbackStoreService feedbackStoreService;

    public AdminController(AdminService adminService, FeedbackStoreService feedbackStoreService) {
        this.adminService = adminService;
        this.feedbackStoreService = feedbackStoreService;
    }

    @CrossOrigin("*")
    @GetMapping("/adminPayment") // Ensure the path matches the one in your Angular application
    public List<Object[]> getMonthlyPayments(@RequestParam int year) {
        return adminService.getMonthlyPayments(year);
    }

    @CrossOrigin("*")
    @RequestMapping("/mostRatedItem")
    public ResponseEntity<StoreItemDto> getMostRatedItm(){
        return ResponseEntity.status(HttpStatus.OK).body(feedbackStoreService.getMostRatedItem());
    }

    @CrossOrigin("*")
    @RequestMapping("/mostRatedEmp")
    public ResponseEntity<Employee> getMostRatedEmp(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.findMostRatedEmployee());
    }

    @CrossOrigin("*")
    @RequestMapping("/report")
    public ResponseEntity<ApiResponse> getAdminReportDetails(){
        ApiResponse Report = adminService.generateAdminReport();
        return ResponseEntity.ok(Report);
    }


}
