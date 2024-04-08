package org.example.springbootbackend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Date;
import java.util.Objects;

@Entity
public class Bidding {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long B_id;

    private Date Date;

    private Double Bidding_amount;

    public Long getB_id() {
        return B_id;
    }

    public void setB_id(Long b_id) {
        B_id = b_id;
    }

    public java.sql.Date getDate() {
        return Date;
    }

    public void setDate(java.sql.Date date) {
        Date = date;
    }

    public Double getBidding_amount() {
        return Bidding_amount;
    }

    public void setBidding_amount(Double bidding_amount) {
        Bidding_amount = bidding_amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Bidding bidding)) return false;

        return Objects.equals(B_id, bidding.B_id);
    }

    @Override
    public int hashCode() {
        return B_id != null ? B_id.hashCode() : 0;
    }
}
