package org.example.springbootbackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "FeedbackReviews")



public class FeedbackReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)


    private Long R_Id;
    @Column(name = "Reviews")
    private String reviews;
    @Column(name = "Service Type")
    private String service_type;

    public FeedbackReviews(Long r_Id, String reviews, String service_type) {
        R_Id = r_Id;
        this.reviews = reviews;
        this.service_type = service_type;
    }

    public FeedbackReviews() {

    }

    public Long getR_Id() {
        return R_Id;
    }

    public void setR_Id(Long r_Id) {
        R_Id = r_Id;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public String getService_type() {
        return service_type;
    }

    public void setService_type(String service_type) {
        this.service_type = service_type;
    }
}
