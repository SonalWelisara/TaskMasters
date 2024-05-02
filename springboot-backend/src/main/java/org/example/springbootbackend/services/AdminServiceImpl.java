package org.example.springbootbackend.services;

import org.example.springbootbackend.repo.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{
    private final PaymentRepository paymentRepository;
    @Autowired
    public AdminServiceImpl(PaymentRepository paymentRepository){
        this.paymentRepository= paymentRepository;
    }

    public List<Object[]> getMonthlyPayments(int year) {
        return paymentRepository.getMonthlyPayments(year);
    }
}
