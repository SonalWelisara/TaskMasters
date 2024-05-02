package org.example.springbootbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.StoreItem;
import org.example.springbootbackend.services.StoreItemService;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StoreItemController {

    private final StoreItemService storeItemService;

    //Create Product
    @PostMapping("/storeItem")
    public StoreItem postStoreItem(@RequestBody StoreItem storeItem ){
        return storeItemService.postStoreItem(storeItem);
    }

    //get all product
    @GetMapping("/storeItem")
    private List<StoreItem> getAllStoreItem(){
        return  storeItemService.getAllStoreItem();
    }

    //get product by id
    @GetMapping("/storeItem/{id}")
    public ResponseEntity<StoreItem> getStoreItemById(@PathVariable Long id ){
        StoreItem storeItem = storeItemService.getStoreItemById(id);
        if(storeItem == null){
            return ResponseEntity.notFound().build();
        }
        else{
            return ResponseEntity.ok(storeItem);
        }
    }

    //update product
    @PutMapping("/storeItem/{id}")
    public ResponseEntity<StoreItem> updateStoreItem(@PathVariable Long id , @RequestBody StoreItem storeItem){
        StoreItem existingStoreItem = storeItemService.getStoreItemById(id);
        if(existingStoreItem == null){
            return ResponseEntity.notFound().build();
        }
        else{
            existingStoreItem.setCategory(storeItem.getCategory());
            existingStoreItem.setDescription(storeItem.getDescription());
            existingStoreItem.setName(storeItem.getName());
            existingStoreItem.setPrice(storeItem.getPrice());
            existingStoreItem.setQuantity(storeItem.getQuantity());

            StoreItem updatedStoreItem = storeItemService.updateProduct(existingStoreItem);
            return  ResponseEntity.ok(updatedStoreItem);
        }
    }

    //delete Store Item
    @DeleteMapping("storeItem/{id}")
    public ResponseEntity<?> deleteStoreItem(@PathVariable Long id){
        StoreItem existingStoreItem = storeItemService.getStoreItemById(id);
        if(existingStoreItem == null){
            return ResponseEntity.notFound().build();
        }
        else{
            storeItemService.deleteStoreItem(id);
            return ResponseEntity.ok().build();
        }
    }






}
