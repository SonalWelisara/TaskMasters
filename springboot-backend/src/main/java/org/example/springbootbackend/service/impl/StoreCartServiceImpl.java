package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.entity.StoreCart;
import org.example.springbootbackend.repository.StoreCartRepository;
import org.example.springbootbackend.service.StoreCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreCartServiceImpl implements StoreCartService {

    private  final StoreCartRepository storeCartRepository;


    //create Store Cart
    @Override
    public StoreCart postStoreCart(StoreCart storeCart ){
        return storeCartRepository.save(storeCart);
    }

    // get product by id
    @Override
    public StoreCart getStoreCartById(Long id){
        return storeCartRepository.findById(id).orElse(null);
    }

    //get cart by user id
    //get cart by user id
    @Override
    public Optional<List<StoreCart>> getAllAddCartByUserId(Long user) {
        return storeCartRepository.findAllByUser(user);
    }


    //update cart by id
    @Override
    public StoreCart updateStoreCart(StoreCart storeCart){
        return storeCartRepository.save(storeCart);
    }

    //delete Cart
    @Override
    public void deleteStoreCart(Long id ){
        storeCartRepository.deleteById(id);
    }

    //get all cart
    @Override
    public List<StoreCart> getAllStoreCart(){
        return  storeCartRepository.findAll();
    }
}
