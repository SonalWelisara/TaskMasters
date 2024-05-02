package org.example.springbootbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.StoreItem;
import org.example.springbootbackend.repo.StoreItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreItemService {

    @Autowired
    private final StoreItemRepository storeItemRepository;



    //add product
    public StoreItem postStoreItem(StoreItem storeItem){

        return storeItemRepository.save(storeItem);
    }




    //get all product
    public List<StoreItem> getAllStoreItem(){
        return storeItemRepository.findAll();
    }

    //get product by id
    public StoreItem getStoreItemById(Long id){
        return storeItemRepository.findById(id).orElse(null);
    }

    //update product by id
    public StoreItem updateProduct(StoreItem storeItem){
        return storeItemRepository.save(storeItem);
    }

    //delete Product
    public void deleteStoreItem(Long id){
        storeItemRepository.deleteById(id);
    }
}
