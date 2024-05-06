package org.example.springbootbackend.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String token) throws Exception;
}
