package org.example.springbootbackend.repository;


import org.example.springbootbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
