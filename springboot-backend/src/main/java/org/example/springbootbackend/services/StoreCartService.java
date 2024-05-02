package org.example.springbootbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.StoreCart;
import org.example.springbootbackend.repo.StoreCartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreCartService {

    private  final StoreCartRepository storeCartRepository;


    //create Store Cart
    public StoreCart postStoreCart(StoreCart storeCart ){
        return storeCartRepository.save(storeCart);
    }

    // get product by id
    public StoreCart getStoreCartById(Long id){
        return storeCartRepository.findById(id).orElse(null);
    }

    //get cart by user id
    //get cart by user id
    public Optional<List<StoreCart>> getAllAddCartByUserId(Long user) {
        return storeCartRepository.findAllByUser(user);
    }


    //update cart by id
    public StoreCart updateStoreCart(StoreCart storeCart){
        return storeCartRepository.save(storeCart);
    }

    //delete Cart
    public void deleteStoreCart(Long id ){
        storeCartRepository.deleteById(id);
    }

    //get all cart
    public List<StoreCart> getAllStoreCart(){
        return  storeCartRepository.findAll();
    }
}
