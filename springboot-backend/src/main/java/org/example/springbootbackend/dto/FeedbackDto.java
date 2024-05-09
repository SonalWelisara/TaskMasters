package org.example.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import org.example.springbootbackend.entity.HiredLabour;

@Data
public class FeedbackDto {

    private Long r_Id;
    private HiredLabour hiredLabour;
    private  String review;
    private  String rating;
    private  String serviceType;
    private Double ratingDouble;

}
