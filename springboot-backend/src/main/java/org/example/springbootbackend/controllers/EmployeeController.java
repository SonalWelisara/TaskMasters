package org.example.springbootbackend.controllers;

import org.example.springbootbackend.domain.Employee;
import org.example.springbootbackend.Exception.ResourceNotFoundException;
import org.example.springbootbackend.repo.EmployeeRepository;
import org.example.springbootbackend.services.LaborService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private LaborService laborService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return laborService.getAllEmployees();
    }

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        // No password encoding here, it should be handled in a security configuration

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = laborService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = laborService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        laborService.deleteEmployee(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login2")
    public ResponseEntity<Employee> login2(@RequestBody Employee credentials) {
        Optional<Employee> employeeOptional = Optional.ofNullable(employeeRepository.findByEmailId(credentials.getEmailId()));

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            // Password verification should be handled elsewhere, such as in a security configuration
            return ResponseEntity.ok(employee);
        } else {
            // If login fails due to unknown email, return unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
