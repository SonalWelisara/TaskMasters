package org.example.springbootbackend.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.example.springbootbackend.entity.StoreCart;
import org.example.springbootbackend.entity.StoreItem;
import org.modelmapper.ModelMapper;

@Data
public class StoreCartDto {

    private Long id;
    private int quantity;
    private Long storeItem;
    private Long user;
    private String p_name ;
    private Double p_price;

    public StoreCart toEntity(ModelMapper mapper){
        StoreCart storeCart = mapper.map(this, StoreCart.class);

        return storeCart;
    }

}
