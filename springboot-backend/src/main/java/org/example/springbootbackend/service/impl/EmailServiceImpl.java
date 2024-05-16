package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;


    public void sendPasswordResetEmail(String to, String token) throws Exception {
        String subject = "Password Reset Request";
        String resetUrl = "http://localhost:8080/api/users/reset-password?token=" + token; // Adjust URL as needed
//        String message = "Please click the following link to reset your password: " + resetUrl;
        String message = "Please Use This Token To reset password: " + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);

        try {
            mailSender.send(email);
        } catch (MailException ex) {
            // Log the exception to your application's logging system
            // For example:
            // logger.error("Failed to send password reset email to " + to, ex);
                System.out.println(ex);
            // Optionally, rethrow as a custom application-specific exception or handle accordingly
             throw new Exception("Failed to send email", ex);
        }
    }
}
