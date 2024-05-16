package org.example.springbootbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.StoreItem;
import org.example.springbootbackend.service.impl.StoreItemServiceImpl;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StoreItemController {

    private final StoreItemServiceImpl storeItemService;

    //Create Product
    @PostMapping("/storeItem")
    public ResponseEntity<StoreItemDto> postStoreItem(@RequestBody StoreItemDto storeItemDto ){
        return ResponseEntity.status(HttpStatus.OK).body(storeItemService.postStoreItem(storeItemDto));
    }

    //get all product
    @GetMapping("/storeItem")
    private ResponseEntity<List<StoreItemDto>> getAllStoreItem(){
        return  ResponseEntity.status(HttpStatus.OK).body(storeItemService.getAllStoreItem());
    }

    //get product by id
    @GetMapping("/storeItem/{id}")
    public ResponseEntity<StoreItemDto> getStoreItemById(@PathVariable Long id ){
        return ResponseEntity.status(HttpStatus.OK).body(storeItemService.getStoreItemById(id));
    }

    //update product
    @PutMapping("/storeItem/{id}")
    public ResponseEntity<StoreItemDto> updateStoreItem(@PathVariable Long id , @RequestBody StoreItemDto storeItemDto){
        return ResponseEntity.status(HttpStatus.OK).body(storeItemService.updateProduct(id, storeItemDto));
    }

    //delete Store Item
    @DeleteMapping("/storeItem/{id}")
    public ResponseEntity<Boolean> deleteStoreItem(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(storeItemService.deleteStoreItem(id));
    }






}
