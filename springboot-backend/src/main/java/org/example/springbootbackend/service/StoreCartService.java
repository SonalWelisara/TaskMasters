package org.example.springbootbackend.service;

import org.example.springbootbackend.dto.StoreCartDto;
import org.example.springbootbackend.entity.StoreCart;

import java.util.List;
import java.util.Optional;

public interface StoreCartService {

    public StoreCartDto postStoreCart(StoreCartDto storeCartDto );
    public StoreCartDto getStoreCartById(Long id);
    public List<StoreCartDto> getAllAddCartByUserId(Long user);
    public StoreCartDto updateStoreCart(Long id,StoreCartDto storeCartDto);
    public Boolean deleteStoreCart(Long id );
    public List<StoreCartDto> getAllStoreCart();

}
