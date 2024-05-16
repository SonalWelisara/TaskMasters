package org.example.springbootbackend.service;

import org.example.springbootbackend.dto.AuthenticationResponseDto;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.utils.ApiResponse;

public interface UserService {

    ApiResponse registerUser(User user);
    AuthenticationResponseDto authenticateUser(String email, String password);

    void initiatePasswordReset(String email);

    void resetPassword(String token, String newPassword);
    void deleteUserByEmail(String email);
    void updateUserByEmail(String email, User updatedUser);

    ApiResponse generateUserReport(Long id);

}
