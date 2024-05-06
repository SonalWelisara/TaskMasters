package org.example.springbootbackend.services;

import org.example.springbootbackend.domain.Employee;
import org.example.springbootbackend.Exception.ResourceNotFoundException;
import org.example.springbootbackend.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LaborServiceImpl implements LaborService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        // Update employee details
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setAddress(employeeDetails.getAddress());
        employee.setMobile(employeeDetails.getMobile());
        employee.setAge(employeeDetails.getAge());
        if (employeeDetails.getProfile() != null) {
            employee.setProfile(employeeDetails.getProfile());
        }

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public String login(Employee credentials) {
        // Implement your login logic here
        return null;
    }

    @Override
    public String login2(Employee credentials) {
        Employee employee = employeeRepository.findByEmailId(credentials.getEmailId());

        // Password verification should be handled in the controller

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }
}
