package org.example.springbootbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long r_Id;
    @OneToOne
    @JsonIgnoreProperties({"user","address"})
    @JoinColumn(name = "hiredLabourId", referencedColumnName = "id")
    private  HiredLabour hiredLabour;

    private  String review;

    private  String rating;

    private  String serviceType;




}
