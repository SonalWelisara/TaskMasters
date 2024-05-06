package org.example.springbootbackend.controllers;
//
import org.example.springbootbackend.domain.Employee;
import org.example.springbootbackend.domain.EmpFeedback;

import org.example.springbootbackend.Exception.ResourceNotFoundException;
import org.example.springbootbackend.repo.EmpFeedbackRepository;

import org.example.springbootbackend.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class EmpFeedbackController {

    @Autowired
    private EmpFeedbackRepository empFeedbackRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/feedback")
    public ResponseEntity<List<EmpFeedback>> getAllFeedbacks() {
        List<EmpFeedback> feedbackList = empFeedbackRepository.findAll();
        return ResponseEntity.ok().body(feedbackList);
    }

    @GetMapping("/feedback/{employeeId}")
    public ResponseEntity<List<EmpFeedback>> getFeedbackByEmployeeId(@PathVariable(value = "employeeId") long employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        if (!employeeOptional.isPresent()) {
            throw new ResourceNotFoundException("Employee not found with id: " + employeeId);
        }

        List<EmpFeedback> feedbackList = empFeedbackRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok().body(feedbackList);
    }

    @PostMapping("/feedback")
    public ResponseEntity<EmpFeedback> createFeedback(@RequestBody Map<String, Object> requestBody) {
        Long employeeId = ((Number) requestBody.get("id")).longValue(); // Extract employee ID
        String feedback = (String) requestBody.get("feedback"); // Extract feedback message

        // Fetch the employee from the database
        Employee employee = employeeRepository.findById(employeeId).orElse(null);

        if (employee == null) {
            // Handle case where employee with the given ID is not found
            return ResponseEntity.notFound().build();
        }

        // Create EmpFeedback object with fetched employee and feedback message
        EmpFeedback empFeedback = new EmpFeedback(employee, feedback);

        // Save the feedback
        EmpFeedback createdFeedback = empFeedbackRepository.save(empFeedback);

        return ResponseEntity.ok(createdFeedback);
    }


    @DeleteMapping("/feedback/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable(value = "feedbackId") long feedbackId) {
        Optional<EmpFeedback> feedbackOptional = empFeedbackRepository.findById(feedbackId);
        if (!feedbackOptional.isPresent()) {
            throw new ResourceNotFoundException("Feedback not found with id: " + feedbackId);
        }

        empFeedbackRepository.deleteById(feedbackId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/feedback/{feedbackId}")
    public ResponseEntity<EmpFeedback> updateFeedback(@PathVariable(value = "feedbackId") long feedbackId,
                                                      @RequestBody EmpFeedback updatedFeedback) {
        Optional<EmpFeedback> feedbackOptional = empFeedbackRepository.findById(feedbackId);
        if (!feedbackOptional.isPresent()) {
            throw new ResourceNotFoundException("Feedback not found with id: " + feedbackId);
        }

        EmpFeedback existingFeedback = feedbackOptional.get();
        existingFeedback.setFeedback(updatedFeedback.getFeedback());

        EmpFeedback savedFeedback = empFeedbackRepository.save(existingFeedback);
        return ResponseEntity.ok(savedFeedback);
    }
    @DeleteMapping("/feedback/employee/{employeeId}")
    public ResponseEntity<Void> deleteFeedbacksByEmployeeId(@PathVariable(value = "employeeId") long employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        if (!employeeOptional.isPresent()) {
            throw new ResourceNotFoundException("Employee not found with id: " + employeeId);
        }

        // Retrieve the employee entity
        Employee employee = employeeOptional.get();

        // Retrieve all feedbacks associated with the employee
        List<EmpFeedback> feedbackList = empFeedbackRepository.findByEmployee(employee);
        if (feedbackList.isEmpty()) {
            throw new ResourceNotFoundException("No feedback found for employee with id: " + employeeId);
        }

        // Delete all feedbacks associated with the employee
        empFeedbackRepository.deleteAll(feedbackList);

        return ResponseEntity.noContent().build();
    }


}
