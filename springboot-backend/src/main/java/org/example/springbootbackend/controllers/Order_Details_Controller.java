package org.example.springbootbackend.controllers;

import org.example.springbootbackend.domain.OrderDetails;
import org.example.springbootbackend.repo.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class Order_Details_Controller {
@Autowired
private OrderDetailsRepository orderDetailsRepository;

@GetMapping("/orderDetails")
public List<OrderDetails> getAllOrderDetails(){
    return orderDetailsRepository.findAll();
}
}
