package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.entity.Driver;
import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.repository.DriverRepository;
import org.example.springbootbackend.repository.OrderRepository;
import org.example.springbootbackend.service.OrderService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private DriverRepository  driverRepository;

    @Override
    public ApiResponse saveOrder(Order order) {
        try {
            logger.info("Saving new order with id: {}", order.getId());
            Order savedOrder = orderRepository.save(order);
            return new ApiResponse("Order saved successfully", savedOrder, 200);
        } catch (Exception e) {
            logger.error("Failed to save order: {}", e.getMessage());
            return new ApiResponse("Failed to save order: " + e.getMessage(), 500);
        }
    }
    @Override
    public List<Order> getOrdersByStatus(String status) {
        logger.info("Fetching all orders with status: {}", status);
        return orderRepository.findByStatus(status);
    }

    @Override
    public ApiResponse updateOrderDetails(Long orderId, String status, Long driverId) {
        try {
            logger.info("Updating order details for order with id: {}", orderId);
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order != null) {
                order.setStatus(status);

                // Retrieve the driver entity by ID
                Driver driver = driverRepository.findById(driverId).orElse(null);
                if (driver != null) {
                    // Set the driver for the order
                    order.setDriver(driver);
                } else {
                    return new ApiResponse("Driver not found with id: " + driverId, 404);
                }

                Order updatedOrder = orderRepository.save(order);
                return new ApiResponse("Order details updated successfully", updatedOrder, 200);
            } else {
                return new ApiResponse("Order not found with id: " + orderId, 404);
            }
        } catch (Exception e) {
            logger.error("Failed to update order details: {}", e.getMessage());
            return new ApiResponse("Failed to update order details: " + e.getMessage(), 500);
        }
    }

    @Override
    public ApiResponse getOrdersByDriverId(Long driverId) {
        try {
            List<Order> orders = orderRepository.findByDriverId(driverId);
            return new ApiResponse("Orders retrieved successfully for driver ID " + driverId, orders, 200);
        } catch (Exception e) {
            return new ApiResponse("Failed to retrieve orders for driver ID " + driverId + ": " + e.getMessage(), null, 500);
        }
    }
}