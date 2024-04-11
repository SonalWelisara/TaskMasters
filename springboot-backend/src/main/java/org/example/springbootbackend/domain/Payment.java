package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.springbootbackend.Enums.PaymentType;

import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long P_id;

    private String paymentMethod;

    private Date Date;

    private Time Time;

    private Double Amount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @OneToOne
    @JoinColumn(name = "order_ID")
    private OrderDetails orderDetails;

    @OneToOne
    @JoinColumn(name = "hired_ID")
    private HiredLabour hiredLabour;

}
