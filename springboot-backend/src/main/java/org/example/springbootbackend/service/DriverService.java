package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.Driver;
import org.example.springbootbackend.utils.ApiResponse;

public interface DriverService {
  ApiResponse saveDriver(Driver driver);

  ApiResponse getAllDrivers();

  ApiResponse getDriverById(Long id);
  ApiResponse deleteDriver(Long id);

  ApiResponse updateDriver(Long id, Driver updatedDriver);
}
