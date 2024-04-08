package org.example.springbootbackend.controllers;

import org.example.springbootbackend.domain.StoreItem;
import org.example.springbootbackend.repo.StoreItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vi/")
public class StoreItemController {

    @Autowired
    private StoreItemRepository storeItemRepository;

    //get All Store Items
    @RequestMapping("/StoreItems")
    public List<StoreItem> getAllStoreItems(){
        return  storeItemRepository.findAll();
    }


}
