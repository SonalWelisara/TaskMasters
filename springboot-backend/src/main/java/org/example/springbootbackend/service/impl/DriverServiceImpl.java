package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.entity.Driver;
import org.example.springbootbackend.entity.Order;
import org.example.springbootbackend.repository.DriverRepository;
import org.example.springbootbackend.repository.OrderRepository;
import org.example.springbootbackend.service.DriverService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {
    private static final Logger logger = LoggerFactory.getLogger(DriverServiceImpl.class);

    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public ApiResponse saveDriver(Driver driver) {
        try {
            Driver response = driverRepository.save(driver);
            return new ApiResponse("Driver saved successfully", response, 200);
        } catch (Exception e) {
            logger.error("Error occurred while saving driver: {}", e.getMessage());
            return new ApiResponse("Failed to save driver", null, 500);
        }
    }

    @Override
    public ApiResponse getAllDrivers() {
        try {
            List<Driver> drivers = driverRepository.findAll();
            return new ApiResponse("Drivers retrieved successfully", drivers, 200);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving drivers: {}", e.getMessage());
            return new ApiResponse("Failed to retrieve drivers", null, 500);
        }
    }

    @Override
    public ApiResponse getDriverById(Long id) {
        try {
            Driver driver = driverRepository.findById(id).orElse(null);
            if (driver != null) {
                return new ApiResponse("Driver found", driver, 200);
            } else {
                return new ApiResponse("Driver not found", null, 404);
            }
        } catch (Exception e) {
            logger.error("Error occurred while retrieving driver: {}", e.getMessage());
            return new ApiResponse("Failed to retrieve driver", null, 500);
        }
    }
    @Override
    public ApiResponse deleteDriver(Long id) {
        try {
            // Find orders associated with the driver and update them
            List<Order> orders = orderRepository.findAllByDriverId(id);
            for (Order order : orders) {
                order.setDriver(null); // Remove the driver association
                order.setStatus("Pending"); // Update the status to Pending
                orderRepository.save(order); // Save the updated order
            }

            // Delete the driver
            driverRepository.deleteById(id);
            return new ApiResponse("Driver deleted successfully", null, 200);
        } catch (Exception e) {
            logger.error("Error occurred while deleting driver with id {}: {}", id, e.getMessage());
            return new ApiResponse("Failed to delete driver", null, 500);
        }
    }


    @Override
    public ApiResponse updateDriver(Long id, Driver updatedDriver) {
        try {
            Driver existingDriver = driverRepository.findById(id).orElse(null);
            if (existingDriver != null) {
                updatedDriver.setId(existingDriver.getId());
                Driver updatedEntity = driverRepository.save(updatedDriver);
                return new ApiResponse("Driver updated successfully", updatedEntity, 200);
            } else {
                return new ApiResponse("Driver not found", null, 404);
            }
        } catch (Exception e) {
            logger.error("Error occurred while updating driver with id {}: {}", id, e.getMessage());
            return new ApiResponse("Failed to update driver", null, 500);
        }
    }

}
