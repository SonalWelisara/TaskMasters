package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.Objects;

@Setter
@Getter
@Entity
public class Bidding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long B_id;

    @OneToOne
    @JoinColumn(name = "employee_ID")
    private Employee employee;

    private Date Date;

    private Double Bidding_amount;

}
