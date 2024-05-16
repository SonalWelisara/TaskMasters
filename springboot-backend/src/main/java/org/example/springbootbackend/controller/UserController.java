package org.example.springbootbackend.controller;

import org.example.springbootbackend.dto.AuthenticationRequestDto;
import org.example.springbootbackend.dto.AuthenticationResponseDto;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.exception.EmailAlreadyExistsException;
import org.example.springbootbackend.exception.UserNotFoundException;
import org.example.springbootbackend.service.UserService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    // Changed Logger declaration to use SLF4J Logger
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @CrossOrigin("*")
    public ResponseEntity<ApiResponse<User>> registerUser(@RequestBody User user) {
        try {
            logger.info("Starting user registration for {}", user.getEmail());
            ApiResponse registeredUserResponse = userService.registerUser(user);
            logger.info("User registration completed for {}", user.getEmail());
            return ResponseEntity.ok(registeredUserResponse);
        } catch (EmailAlreadyExistsException e) {
            logger.error("Registration unsuccessful for {}: {}", user.getEmail(), e.getMessage());
            ApiResponse<User> response = new ApiResponse<>("Registration Unsuccessful, " + e.getMessage(),409);
            return ResponseEntity.status(401).body(response);
        }catch (Exception e){
            logger.error("Registration unsuccessful for {}: {}", user.getEmail(), e.getMessage());
            ApiResponse<User> response = new ApiResponse<>("Registration Unsuccessful, " + e.getMessage(),200);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDto request) {
        try {
            logger.info("Authentication request for {}", request.getEmail());
            AuthenticationResponseDto response = userService.authenticateUser(request.getEmail(), request.getPassword());
            logger.info("Authentication successful for {}", request.getEmail());
            ApiResponse response1= new ApiResponse<>("Authentication successful",response,200);
            return ResponseEntity.ok(response1);
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user. Incorrect credentials.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>("Authentication failed for user. Incorrect credentials",401));
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>("Authentication failed",401));
        }
        catch (Exception e) {
            logger.error("Error processing authentication for {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>("Error processing authentication request ",500));
        }
    }



    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            logger.info("Password reset request initiated for {}", email);
            userService.initiatePasswordReset(email);
            logger.info("Password reset email sent to {}", email);
            return ResponseEntity.ok(new ApiResponse<>("Password reset email sent.",200));
        } catch (UsernameNotFoundException ex) {
            logger.error("Password reset request failed for {}: User not found", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>("User not found.",404));
        } catch (Exception ex) {
            logger.error("Error processing password reset request for {}: {}", email, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>("An error occurred while processing your request.",500));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            logger.info("Password reset initiated with token {}", token);
            userService.resetPassword(token, newPassword);
            logger.info("Password reset successfully with token {}", token);
            return ResponseEntity.ok(new ApiResponse<>("Password has been reset successfully.",200));
        } catch (RuntimeException ex) {
            logger.error("Password reset failed with token {}: {}", token, ex.getMessage());
            return ResponseEntity.badRequest().body(new ApiResponse<>(ex.getMessage(),400));
        } catch (Exception ex) {
            logger.error("Error processing password reset with token {}: {}", token, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>("An error occurred while processing your request.",500));
        }

    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserByEmail(@RequestParam String email) {
        try {
            logger.info("deleteUserByEmail Request {}",email);
            userService.deleteUserByEmail(email);
            logger.info("deleteUserByEmail Request-End ");
            ApiResponse<User> response = new ApiResponse<>("User with email  "+ email +"  has been deleted successfully.",+200);
            return ResponseEntity.ok().body(response);
        } catch (UserNotFoundException e) {
            ApiResponse<User> response = new ApiResponse<>(e.getMessage(),404);

            return ResponseEntity.status(404).body(response);
        }catch (Exception e) {
            logger.error("Failed to deleting user:{}", e.getMessage());
            ApiResponse<User> response = new ApiResponse<>("Error deleting user "+ e.getMessage(),500);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserByEmail(@RequestParam String email, @RequestBody User updatedUser) {
        try {
            logger.info("UpdateUserByEmail Request {}",email);
            userService.updateUserByEmail(email, updatedUser);
            logger.info("UpdateUserByEmail Request-End :{} ",updatedUser);
            ApiResponse<User> response = new ApiResponse<>("Update UserByEmail Request-End :{} ",updatedUser,200);
            return ResponseEntity.ok().body(response);
        } catch (UserNotFoundException e) {
            ApiResponse<User> response = new ApiResponse<>(e.getMessage(),404);
            return ResponseEntity.status(404).body(response);
        }catch (RuntimeException e) {
            logger.error("Failed to update user:{}", e.getMessage());
            ApiResponse<User> response = new ApiResponse<>("Failed to update user: " + e.getMessage(),null,400);

            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/User-report")
    public ResponseEntity<ApiResponse> getJobPostingReportDetails(@RequestParam Long id) {

        // List of job postings
        ApiResponse Report = userService.generateUserReport(id);

        return ResponseEntity.ok(Report);
    }

}
