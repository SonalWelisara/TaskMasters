package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.springbootbackend.utils.Role;

@Setter
@Getter
@AllArgsConstructor
@Entity
public class Dev {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fName;
    private String lName;
    @Column(unique = true)
    private String email;
    private String contactNo;
    private String username;
    private String password;
//    private String profilePic;

    @Enumerated(EnumType.STRING)
    private Role role;
    public Dev() {
        // Set default role to USER in the no-args constructor
        this.role = Role.ADMIN;
    }
}
