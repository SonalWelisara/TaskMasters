package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.springbootbackend.dto.FeedbackStoreDto;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "Rating")
    private String rating;

    private String review;

    @ManyToOne
    private StoreItem storeItem;

    public FeedbackStoreDto toDto(ModelMapper mapper){
        FeedbackStoreDto feedbackStoreDto = mapper.map(this, FeedbackStoreDto.class);
        return feedbackStoreDto;

    }
}
