package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.StoreCart;

import java.util.List;
import java.util.Optional;

public interface StoreCartService {

    public StoreCart postStoreCart(StoreCart storeCart );
    public StoreCart getStoreCartById(Long id);
    public Optional<List<StoreCart>> getAllAddCartByUserId(Long user);
    public StoreCart updateStoreCart(StoreCart storeCart);
    public void deleteStoreCart(Long id );
    public List<StoreCart> getAllStoreCart();

}
