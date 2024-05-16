package org.example.springbootbackend.entity;

import org.example.springbootbackend.utils.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "jobpost")
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long j_Id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"user", "password", "address", "phoneNumber", "role", "resetToken",
            "tokenExpirationDate", "enabled", "username", "authorities", "fName",
            "lName", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"}) // ignore all except id// This line specifies the foreign key.
    private User user; // This changes from String user_id to User user to directly reference the User entity.

    private String category;
    private String description;
    private LocalDateTime date;
    private String skills;
    private String location;
    private String budget;
    @OneToOne
    @JsonIgnoreProperties({"user","employee","jobPost"})
    @JoinColumn(name = "hiredLabour_Id", referencedColumnName = "id",nullable = true)
    private HiredLabour hiredLabour;

}
