package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "OrderDetails") // Specify the table name
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_ID")
    private StoreItem storeItem;

    private int quantity;

    @Column(name = "Address")
    private String address;

    @Column(name = "Status")
    private String status;

    @Column(name = "Time")
    private Time time;

    @OneToOne(mappedBy = "orderDetails")
    private Payment payment;

}
