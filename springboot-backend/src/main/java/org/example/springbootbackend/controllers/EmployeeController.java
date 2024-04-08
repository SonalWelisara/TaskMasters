package org.example.springbootbackend.controllers;

import org.example.springbootbackend.domain.Employee;
import org.example.springbootbackend.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public  List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }
}

