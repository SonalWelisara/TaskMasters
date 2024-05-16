package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.Employee;
import org.example.springbootbackend.utils.ApiResponse;

import java.util.List;

public interface AdminService {
    public List<Object[]> getMonthlyPayments(int year);
    public Employee findMostRatedEmployee();
    public ApiResponse generateAdminReport();
}
