package org.example.springbootbackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name= "feedbackRating")
public class FeedBackRating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "Rating")
    private String rating; // Corrected variable name to lowercase 'rating'

    @Column(name = "Service_Type")
    private String serviceType; // Corrected variable name to follow camelCase convention

    // No-argument constructor required by JPA
    public FeedBackRating() {
    }

    public FeedBackRating(String rating, String serviceType) {
        this.rating = rating;
        this.serviceType = serviceType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }
}
