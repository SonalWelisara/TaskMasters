package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.controller.DriverController;
import org.example.springbootbackend.entity.Driver;
import org.example.springbootbackend.entity.Employee;
import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.repository.*;
import org.example.springbootbackend.service.AdminService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private static final Logger logger = LoggerFactory.getLogger(DriverController.class);
    private final PaymentRepository paymentRepository;
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final FeedbackStoreRepository feedbackStoreRepository;

    @Autowired
    public AdminServiceImpl(PaymentRepository paymentRepository, FeedbackRepository feedbackRepository, UserRepository userRepository, EmployeeRepository employeeRepository, FeedbackStoreRepository feedbackStoreRepository){
        this.paymentRepository= paymentRepository;
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.feedbackStoreRepository = feedbackStoreRepository;
    }

    public List<Object[]> getMonthlyPayments(int year) {
        return paymentRepository.getMonthlyPayments(year);
    }

    public Employee findMostRatedEmployee() {
        List<Object[]> aggregatedRatings = feedbackRepository.aggregateRatingsByEmployee();

        // Initialize variables to track the highest average rating and the employee associated with it
        double highestAverageRating = 0;
        Employee mostRatedEmployee = null;

        // Iterate through the aggregated ratings to calculate average ratings
        for (Object[] aggregate : aggregatedRatings) {
            Employee employee = (Employee) aggregate[0];
            double totalRatings = ((Number) aggregate[1]).doubleValue();
            double totalRatingSum = ((Number) aggregate[2]).doubleValue();
            double averageRating = totalRatingSum / totalRatings;

            // Check if the current employee has a higher average rating
            if (averageRating > highestAverageRating) {
                highestAverageRating = averageRating;
                mostRatedEmployee = employee;
            }
        }

        return mostRatedEmployee;
    }

//    @GetMapping("/report")
    public ApiResponse generateAdminReport() {
        try {

            List<User> users = (List<User>) userRepository.findAll();
            int totalUsers = users.size();

            List<Employee> employees = (List<Employee>) employeeRepository.findAll();
            int totalEmp = employees.size();

            List<Object[]> payments = paymentRepository.getMonthlyPayments(2024);

            String ratedEmp = findMostRatedEmployee().getFirstname()+" "+findMostRatedEmployee().getLastname();
            String ratedItem = feedbackStoreRepository.findMostRatedItem().getName();

            Map<String, Object> report = new HashMap<>();
            report.put("totalUsers", totalUsers);
            report.put("totalEmp", totalEmp);
            report.put("payments", payments);
            report.put("ratedEmp", ratedEmp);
            report.put("ratedItem", ratedItem);

//            return ResponseEntity.ok(new ApiResponse("Admin report with orders generated successfully", report, 200));
            return new ApiResponse("user ReportDetails",report,200);
        } catch (Exception e) {
            logger.error("Error occurred while generating Admin report: {}", e.getMessage());
            return new ApiResponse("Failed to generate Admin report", null, 500);
        }
    }

}
