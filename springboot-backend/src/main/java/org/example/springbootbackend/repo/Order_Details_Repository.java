package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
@RequestMapping("/api/v1/")

public interface Order_Details_Repository extends JpaRepository<OrderDetails,Long> {



}
