package org.example.springbootbackend.repo;


import org.example.springbootbackend.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    @Query("SELECT MONTH(p.Date) AS month, SUM(p.Amount) AS totalAmount " +
            "FROM Payment p " +
            "WHERE YEAR(p.Date) = :year " +
            "GROUP BY MONTH(p.Date)")
    List<Object[]> getMonthlyPayments(@Param("year") int year);

}
