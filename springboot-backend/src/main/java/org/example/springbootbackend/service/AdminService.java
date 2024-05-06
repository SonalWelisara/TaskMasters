package org.example.springbootbackend.service;

import java.util.List;

public interface AdminService {
    public List<Object[]> getMonthlyPayments(int year);
}
