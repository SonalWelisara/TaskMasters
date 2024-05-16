package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.springbootbackend.dto.StoreCartDto;
import org.example.springbootbackend.dto.StoreItemDto;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "store_cart")
public class StoreCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private int quantity;


    @Column(name = "item_ID")
    private Long storeItem;

    @Column(name = "user_ID")
    private Long user;

    @Column(name = "p_name")
    private String p_name ;

    @Column(name = "p_price")
    private Double p_price;

    public StoreCartDto toDto(ModelMapper mapper) {
        StoreCartDto storeCartDto = mapper.map(this, StoreCartDto.class);

        return storeCartDto;
    }
}
