package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);
    @Query("SELECT o FROM Order o WHERE o.driver.id = :driverId")
    List<Order> findByDriverId(@Param("driverId") Long driverId);
    List<Order> findAllByDriverId(Long driverId);
}