package org.example.springbootbackend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long P_id;

    private String payment_type;

    private Date Date;

    private Time Time;

    private Double Amount;

    private String Labor_store;

    public Long getP_id() {
        return P_id;
    }

    public void setP_id(Long p_id) {
        P_id = p_id;
    }

    public String getPayment_type() {
        return payment_type;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public java.sql.Date getDate() {
        return Date;
    }

    public void setDate(java.sql.Date date) {
        Date = date;
    }

    public java.sql.Time getTime() {
        return Time;
    }

    public void setTime(java.sql.Time time) {
        Time = time;
    }

    public Double getAmount() {
        return Amount;
    }

    public void setAmount(Double amount) {
        Amount = amount;
    }

    public String getLabor_store() {
        return Labor_store;
    }

    public void setLabor_store(String labor_store) {
        Labor_store = labor_store;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Payment payment)) return false;

        return Objects.equals(P_id, payment.P_id);
    }

    @Override
    public int hashCode() {
        return P_id != null ? P_id.hashCode() : 0;
    }
}
