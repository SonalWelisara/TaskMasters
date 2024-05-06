package org.example.springbootbackend.services;

import org.example.springbootbackend.domain.Employee;

import java.util.List;

public interface LaborService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employeeDetails);
    void deleteEmployee(Long id);
    String login(Employee credentials);
    String login2(Employee credentials); // Added login2 method
}
