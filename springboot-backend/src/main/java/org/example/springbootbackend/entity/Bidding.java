package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
