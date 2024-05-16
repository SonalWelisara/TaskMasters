package org.example.springbootbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_labour_hired")
public class HiredLabour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIgnoreProperties({"firstname", "lastname", "address", "mobile", "Email", "age",
            "email", "profilePic", "password"})
    @JoinColumn(name = "labor_Id", referencedColumnName = "id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"email", "password", "address", "phoneNumber", "role", "resetToken",
            "password", "enabled", "username", "authorities", "fName",
            "lName", "accountNonExpired", "credentialsNonExpired", "tokenExpirationDate","accountNonLocked"})
    private User user;
    private LocalDateTime Date;
    private  String Status;

}
