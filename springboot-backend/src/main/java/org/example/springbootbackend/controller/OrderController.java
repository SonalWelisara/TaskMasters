package org.example.springbootbackend.controller;

import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.service.OrderService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> saveOrder(@RequestBody Order order) {
        try {
            logger.info("Request to save order received: {}", order);
            ApiResponse response = orderService.saveOrder(order);
            logger.info("Order saved successfully with id: {}", order.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Failed to save order: {}", e.getMessage());
            ApiResponse response = new ApiResponse("Error saving order: " + e.getMessage(), 500);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<Order>>> getPendingOrders() {
        try {
            List<Order> pendingOrders = orderService.getOrdersByStatus("pending");
            logger.info("Retrieved all pending orders");
            ApiResponse<List<Order>> response = new ApiResponse<>("Retrieved all pending orders", pendingOrders, 200);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Failed to retrieve pending orders: {}", e.getMessage());
            ApiResponse<List<Order>> response = new ApiResponse<>("Error retrieving pending orders: " + e.getMessage(), 500);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<ApiResponse> updateOrderDetails(@PathVariable Long orderId,
                                                          @RequestParam String status,
                                                          @RequestParam Long driverId) {
        try {
            logger.info("Request to update order details for order with id: {}", orderId);
            ApiResponse response = orderService.updateOrderDetails(orderId, status, driverId);
            if (response.getStatus() == 200) {
                logger.info("Order details updated successfully for order with id: {}", orderId);
                return ResponseEntity.ok(response);
            } else {
                logger.error("Failed to update order details for order with id: {}", orderId);
                return ResponseEntity.status(response.getStatus()).body(response);
            }
        } catch (Exception e) {
            logger.error("Failed to update order details: {}", e.getMessage());
            ApiResponse response = new ApiResponse("Error updating order details: " + e.getMessage(), 500);
            return ResponseEntity.internalServerError().body(response);
        }
    }
}

