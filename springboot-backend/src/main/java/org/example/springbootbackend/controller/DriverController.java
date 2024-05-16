package org.example.springbootbackend.controller;

import org.example.springbootbackend.entity.Driver;
import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.service.DriverService;
import org.example.springbootbackend.service.OrderService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/drivers")
public class DriverController {
    private static final Logger logger = LoggerFactory.getLogger(DriverController.class);

    @Autowired
    private DriverService driverService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/save")
    public ApiResponse saveDriver(@RequestBody Driver driver) {
        try {
            return driverService.saveDriver(driver);
        } catch (Exception e) {
            logger.error("Error occurred while saving driver: {}", e.getMessage());
            return new ApiResponse("Failed to save driver", null, 500);
        }
    }

    @GetMapping("/all")
    public ApiResponse getAllDrivers() {
        try {
            return driverService.getAllDrivers();
        } catch (Exception e) {
            logger.error("Error occurred while retrieving all drivers: {}", e.getMessage());
            return new ApiResponse("Failed to retrieve drivers", null, 500);
        }
    }

    @GetMapping("/{id}")
    public ApiResponse getDriverById(@PathVariable Long id) {
        try {
            return driverService.getDriverById(id);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving driver by id {}: {}", id, e.getMessage());
            return new ApiResponse("Failed to retrieve driver", null, 500);
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteDriver(@PathVariable Long id) {
        try {
            return driverService.deleteDriver(id);
        } catch (Exception e) {
            logger.error("Error occurred while deleting driver with id {}: {}", id, e.getMessage());
            return new ApiResponse("Failed to delete driver", null, 500);
        }
    }

    @PutMapping("/{id}")
    public ApiResponse updateDriver(@PathVariable Long id, @RequestBody Driver updatedDriver) {
        try {
            return driverService.updateDriver(id, updatedDriver);
        } catch (Exception e) {
            logger.error("Error occurred while updating driver with id {}: {}", id, e.getMessage());
            return new ApiResponse("Failed to update driver", null, 500);
        }
    }

    @GetMapping("/report")
    public ResponseEntity<ApiResponse> generateDriverReportWithOrders() {
        try {
            ApiResponse driverResponse = driverService.getAllDrivers();
            List<Driver> drivers = (List<Driver>) driverResponse.getData();
            int totalDrivers = drivers.size();

            int totalPendingOrderCount = orderService.getOrdersByStatus("Pending").size(); // Count pending orders
            int totalAssigendOrderCount = orderService.getOrdersByStatus("Assigned").size();
            List<Map<String, Object>> reportData = new ArrayList<>();

            for (Driver driver : drivers) {
                Long driverId = driver.getId();

                ApiResponse orderResponse = orderService.getOrdersByDriverId(driverId);
                if (orderResponse.getStatus() == 200) {
                    List<Order> orders = (List<Order>) orderResponse.getData();

                    // Extract only the order IDs
                    List<Long> orderIds = orders.stream().map(Order::getId).collect(Collectors.toList());

                    Map<String, Object> driverWithOrders = new HashMap<>();
                    driverWithOrders.put("driver", driver);
                    driverWithOrders.put("orderIds", orderIds); // Add order IDs to the report instead of full orders
                    reportData.add(driverWithOrders);
                } else {
                    logger.error("Failed to retrieve orders for driver with ID {}: {}", driverId, orderResponse.getMessage());
                }
            }

            Map<String, Object> report = new HashMap<>();
            report.put("totalDrivers", totalDrivers);
            report.put("pendingOrderCount", totalPendingOrderCount); // Use the total pending order count
            report.put("totalAssigendOrderCount", totalAssigendOrderCount);
            report.put("driversWithOrders", reportData);

            return ResponseEntity.ok(new ApiResponse("Driver report with orders generated successfully", report, 200));
        } catch (Exception e) {
            logger.error("Error occurred while generating driver report with orders: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ApiResponse("Failed to generate driver report with orders", null, 500));
        }
    }

}

