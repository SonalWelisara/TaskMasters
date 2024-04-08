package org.example.springbootbackend.repo;


import org.example.springbootbackend.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
