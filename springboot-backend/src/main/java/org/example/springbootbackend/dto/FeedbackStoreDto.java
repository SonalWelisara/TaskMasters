package org.example.springbootbackend.dto;

import jakarta.persistence.*;
import lombok.Data;
import org.example.springbootbackend.entity.StoreItem;

@Data
public class FeedbackStoreDto {

    private long id;
    private String rating;
    private String review;
    private StoreItem storeItem;
}
