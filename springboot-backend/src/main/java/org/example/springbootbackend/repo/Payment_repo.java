package org.example.springbootbackend.repo;


import org.example.springbootbackend.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Payment_repo extends JpaRepository<Payment,Long> {
}
