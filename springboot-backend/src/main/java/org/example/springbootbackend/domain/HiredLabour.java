package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Time;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class HiredLabour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;

    @ManyToOne
    @JoinColumn(name= "employee_id")
    private Employee employee;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @OneToOne(mappedBy = "hiredLabour")
    private Payment payment;

}
