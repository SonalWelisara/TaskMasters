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

    @Column(name = "emp_id")
    private Long emp_id ;

    @Column(name = "description")
    private  String description ;

    @Column(name = "Bidding_amount")
    private Double Bidding_amount;

}
