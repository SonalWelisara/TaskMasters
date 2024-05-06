package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.configs.JwtService;
import org.example.springbootbackend.dto.AuthenticationResponseDto;
import org.example.springbootbackend.dto.UserReportDTO;
import org.example.springbootbackend.entity.Feedback;
import org.example.springbootbackend.entity.JobPost;
import org.example.springbootbackend.entity.User;
import org.example.springbootbackend.exception.EmailAlreadyExistsException;
import org.example.springbootbackend.exception.UserNotFoundException;
import org.example.springbootbackend.repository.FeedbackRepository;
import org.example.springbootbackend.repository.JobPostRepository;
import org.example.springbootbackend.repository.UserRepository;
import org.example.springbootbackend.service.EmailService;
import org.example.springbootbackend.service.UserService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;
    @Autowired
    FeedbackRepository feedbackRepository;
    @Autowired
    JobPostRepository jobPostRepository;



    @Override
    public ApiResponse registerUser(User user) {
        try {
            logger.info("Attempting to register user with email: {}", user.getEmail());
            userRepository.findByEmail(user.getEmail())
                    .ifPresent(u -> {
                        throw new EmailAlreadyExistsException(user.getEmail());
                    });

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            User data= userRepository.save(user);
                String massage="User registered successfully with email: "+ user.getEmail();
            logger.info("User registered successfully with email: {}", user.getEmail());
            return  new ApiResponse(massage,data,200);
        } catch (EmailAlreadyExistsException e) {
            logger.error("Registration failed: Email already exists - {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("An unexpected error occurred during registration: {}", e.getMessage());
            throw new RuntimeException("Registration failed due to an unexpected error");
        }
    }

    @Override
    public AuthenticationResponseDto authenticateUser(String email, String password) {
        try {
            logger.info("Authenticating user with email: {} password:{}", email,password);
            var user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(password);
            user.setPassword(encodedPassword);
            String jwtToken = jwtService.generateToken(user);
            logger.info("Authentication successful for user: {}", email);
            return AuthenticationResponseDto.builder().accessToken(jwtToken).build();
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user: {}. Incorrect credentials.", email);
            throw e;
        } catch (UsernameNotFoundException e) {
            logger.error("Authentication failed for user: {}. User not found.", email);
            throw e;
        } catch (Exception e) {
            logger.error("Error during authentication for user: {}", email, e);
            throw new RuntimeException("Authentication failed due to an error");
        }
    }

    @Override
    public void initiatePasswordReset(String email) {
        try {
            logger.info("Initiating password reset for email: {}", email);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setTokenExpirationDate(LocalDateTime.now().plusMinutes(30));
            userRepository.save(user);

            emailService.sendPasswordResetEmail(user.getEmail(), token);
            logger.info("Password reset email sent successfully to: {}", email);
       } catch (UsernameNotFoundException e) {
            logger.error("Password reset initiation failed for email: {}. User not found.", email);
            throw e;
        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}", email, e);
            throw new RuntimeException("Failed to send reset email");
        }
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        try {
            logger.info("Resetting password using token: {}", token);
            User user = userRepository.findByResetToken(token)
                    .orElseThrow(() -> new RuntimeException("Invalid token"));

            if (user.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Token expired");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setTokenExpirationDate(null);
            userRepository.save(user);

            logger.info("Password reset successfully for user: {}", user.getEmail());
        } catch (RuntimeException e) {
            logger.error("Error resetting password: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error during password reset", e);
            throw new RuntimeException("Error resetting password", e);
        }
    }

    @Override
    public void deleteUserByEmail(String email) {
        try {
            logger.info("Attempting to delete user with email: {}", email);
            User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
            userRepository.delete(user);
            logger.info("User with email {} deleted successfully.", email);
        } catch (RuntimeException e) {
            logger.error("Error deleting user with email {}: {}", email, e.getMessage());
            throw e; // Rethrow the exception if you want to handle it further up (e.g., at the controller level)
        } catch (Exception e) {
            logger.error("An unexpected error occurred while deleting user with email {}: {}", email, e.getMessage());
            throw new RuntimeException("Deletion failed due to an unexpected error"+e.getMessage());
        }
    }
    @Override
    public void updateUserByEmail(String email, User updatedUser) {
        try {
            logger.info("Attempting to update user with email: {} First Name:{} lastname:{}", email,updatedUser.getFName());
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UserNotFoundException(email));

            // Update user details here
            user.setFName(updatedUser.getFName());
            user.setLName(updatedUser.getLName());
            user.setAddress(updatedUser.getAddress());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            // Continue updating other fields as necessary

            userRepository.save(user);
            logger.info("User with email {} updated successfully.", email);
        } catch (RuntimeException e) {
            logger.error("Error updating user with email {}: {}", email, e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("An unexpected error occurred while updating user with email {}: {}", email, e.getMessage());
            throw new RuntimeException("Update failed due to an unexpected error");
        }
    }

    @Override
    public ApiResponse generateUserReport(Long id) {
        // Fetch user details by ID
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));


        UserReportDTO reportDTO = new UserReportDTO();
        reportDTO.setUserId(user.getId());
        reportDTO.setFirstName(user.getFName());
        reportDTO.setLastName(user.getLName());
        reportDTO.setEmail(user.getEmail());
        reportDTO.setAddress(user.getAddress());
        reportDTO.setPhoneNumber(user.getPhoneNumber());

        List<Feedback> data= feedbackRepository.findAllFeedbacksByUserId(id);
        List<JobPost> data2 = jobPostRepository.findByUserId(id);
        // Initialize variables for report generation
        int totalFeedbackCount = data.size();
        int totalJobPostCount = data2.size();

        // Calculate total feedback count
        reportDTO.setTotalFeedbackCount(totalFeedbackCount);

        // Calculate total post count
        reportDTO.setTotalPostCount(totalJobPostCount);

        return new ApiResponse<>("user ReportDetails",reportDTO,200);
    }
}
