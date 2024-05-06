package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.EmpFeedback;
import org.example.springbootbackend.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpFeedbackRepository extends JpaRepository<EmpFeedback, Long> {
    List<EmpFeedback> findByEmployeeId(long employeeId);
    List<EmpFeedback> findByEmployee(Employee employee);

    void deleteByEmployeeId(long employeeId);

}
