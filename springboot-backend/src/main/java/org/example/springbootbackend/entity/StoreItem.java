package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.springbootbackend.dto.StoreItemDto;
import org.modelmapper.ModelMapper;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "store_item")
public class StoreItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String Name;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private double Price;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "category")
    private String Category;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private  byte[] data ;



    @OneToMany(mappedBy = "storeItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails;


    @OneToMany(mappedBy = "storeItem")
    private List<StoreCart> storeCarts;

//    @OneToMany(mappedBy = "storeItem")
//    private List<FeedBackRating> feedBackRatingList;



    @OneToMany(mappedBy = "storeItem")
    private List<FeedbackStore> feedbackStores;

    public StoreItemDto toDto(ModelMapper mapper) {
        StoreItemDto storeItemDto = mapper.map(this, StoreItemDto.class);

        if(!feedbackStores.isEmpty()){
            storeItemDto.setFeedbackStoreDtoList(this.feedbackStores.stream().map(feedbackStore -> feedbackStore.toDto(mapper)).toList());
        }

//        storeItemDto.setRatingId(this.rating.getRatingId());
//        if (!feedBackRatingList.isEmpty()) {
//            storeItemDto.setFeedBackRatingDtoList(this.feedBackRatingList.stream().map(feedBackRating -> feedBackRating.toDto(modelMapper)).toList());
//        }\

        return storeItemDto;
    }
}
