package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "FeedbackReviews")
public class FeedbackReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long R_Id;

    @Column(name = "Reviews")
    private String reviews;

    @Column(name = "Service Type")
    private String service_type;

}
