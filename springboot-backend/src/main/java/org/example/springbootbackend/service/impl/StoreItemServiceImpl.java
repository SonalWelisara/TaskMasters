package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.entity.StoreItem;
import org.example.springbootbackend.repository.StoreItemRepository;
import org.example.springbootbackend.service.StoreItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreItemServiceImpl implements StoreItemService {

    @Autowired
    private final StoreItemRepository storeItemRepository;



    //add product
    @Override
    public StoreItem postStoreItem(StoreItem storeItem){

        return storeItemRepository.save(storeItem);
    }




    //get all product
    @Override
    public List<StoreItem> getAllStoreItem(){
        return storeItemRepository.findAll();
    }

    //get product by id
    @Override
    public StoreItem getStoreItemById(Long id){
        return storeItemRepository.findById(id).orElse(null);
    }

    //update product by id
    @Override
    public StoreItem updateProduct(StoreItem storeItem){
        return storeItemRepository.save(storeItem);
    }

    //delete Product
    @Override
    public void deleteStoreItem(Long id){
        storeItemRepository.deleteById(id);
    }
}
