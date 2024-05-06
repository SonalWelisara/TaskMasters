package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.dto.StoreCartDto;
import org.example.springbootbackend.entity.StoreCart;
import org.example.springbootbackend.entity.StoreItem;
import org.example.springbootbackend.exception.NotFoundException;
import org.example.springbootbackend.repository.StoreCartRepository;
import org.example.springbootbackend.service.StoreCartService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreCartServiceImpl implements StoreCartService {

    private  final StoreCartRepository storeCartRepository;
    private final ModelMapper mapper;

    //create Store Cart
    @Override
    public StoreCartDto postStoreCart(StoreCartDto storeCartDto ){
        storeCartRepository.save(storeCartDto.toEntity(mapper));
        return storeCartDto;
    }

    // get product by id
    @Override
    public StoreCartDto getStoreCartById(Long id){
        Optional<StoreCart> storeCart = storeCartRepository.findById(id);
        if (storeCart.isPresent()) {
            return storeCart.get().toDto(mapper);
        } else {
            throw new NotFoundException("No Cart by this ID");
        }
    }

    @Override
    public List<StoreCartDto> getAllAddCartByUserId(Long user) {
        List<StoreCart> allByUser = storeCartRepository.findAllByUser(user);
        if (allByUser.isEmpty()) {
            return new ArrayList<>();
        }else {
            return allByUser.stream().map(storeCart -> storeCart.toDto(mapper)).toList();
        }
    }


    //update cart by id
    @Override
    public StoreCartDto updateStoreCart(Long id,StoreCartDto storeCartDto){
        StoreCart storeCart = storeCartDto.toEntity(mapper);
        storeCart.setId(id);
        StoreCart savedItem = storeCartRepository.save(storeCart);
        return savedItem.toDto(mapper);
    }

    //delete Cart
    @Override
    public Boolean deleteStoreCart(Long id ){
        StoreCartDto existingStoreCart = getStoreCartById(id);
        if(existingStoreCart == null){
            throw new NotFoundException("No Cart by this ID");
        } else {
            storeCartRepository.deleteById(id);
            return true;
        }
    }

    //get all cart
    @Override
    public List<StoreCartDto> getAllStoreCart(){
        List<StoreCart> all = storeCartRepository.findAll();
        if (all.isEmpty()) {
            return new ArrayList<>();
        }else {
            return all.stream().map(storeCart -> storeCart.toDto(mapper)).toList();
        }
    }
}
