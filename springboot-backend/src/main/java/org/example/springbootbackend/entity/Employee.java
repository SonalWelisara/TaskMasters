package org.example.springbootbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.processing.Generated;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="First_name")
    private String firstname;
    @Column(name="Last_name")
    private String lastname;
    @Column(name="Address")
    private String address;
    @Column(name="Mobile")
    private int mobile;
    @Column(name="Email")
    private String email;
    @Column(name="age")
    private int age;
    @Column(name="Password")
    private String password;

    private String profilePic;

//    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Bidding bidding;
//
    @OneToOne(mappedBy = "employee")
    private HiredLabour hiredLabours;

}
