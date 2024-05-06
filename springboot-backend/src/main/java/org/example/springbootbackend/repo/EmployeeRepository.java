package org.example.springbootbackend.repo;


import org.example.springbootbackend.domain.Employee;
import org.example.springbootbackend.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByEmailId(String emailId);
    Optional<Employee> findByEmailIdAndPassword(String emailId, String password);
}
