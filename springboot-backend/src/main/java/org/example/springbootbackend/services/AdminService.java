package org.example.springbootbackend.services;

import org.example.springbootbackend.repo.PaymentRepository;

import java.util.List;

public interface AdminService {
    public List<Object[]> getMonthlyPayments(int year);
}
