package org.example.springbootbackend.service;


import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.utils.ApiResponse;

import java.util.List;

public interface OrderService {
    ApiResponse saveOrder(Order order);
    List<Order> getOrdersByStatus(String status);
    ApiResponse updateOrderDetails(Long orderId, String status, Long driverId);


    ApiResponse getOrdersByDriverId(Long driverId);
}
