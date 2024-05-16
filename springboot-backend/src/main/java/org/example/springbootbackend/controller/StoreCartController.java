package org.example.springbootbackend.controller;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.dto.StoreCartDto;
import org.example.springbootbackend.entity.StoreCart;
import org.example.springbootbackend.service.impl.StoreCartServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/store")
@CrossOrigin("*")
public class StoreCartController {

    private final StoreCartServiceImpl storeCartService;


    @PostMapping("/storeCart")
    public ResponseEntity<StoreCartDto> postStoreCart(@RequestBody StoreCartDto storeCartDto) {
        return ResponseEntity.status(HttpStatus.OK).body(storeCartService.postStoreCart(storeCartDto));
    }

    //get cart by id
    @GetMapping("/storeCart/{user}")
    public ResponseEntity<StoreCartDto>  getStoreCartById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(storeCartService.getStoreCartById(id));
    }

    //get cart by userid
    @GetMapping("/addcart/{user}")
    public List<StoreCartDto> getAllCartByUser(@PathVariable Long user){
        return storeCartService.getAllAddCartByUserId(user);
    }

    //update Cart
    @DeleteMapping("/storeCart/{id}")
    public ResponseEntity<Boolean> deleteStoreCart(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(storeCartService.deleteStoreCart(id));
    }

    //get All Product
    @GetMapping("/storeCart")
    private List<StoreCartDto> getAllStoreCart(){
        return storeCartService.getAllStoreCart();
    }

    @PutMapping("/storeCart/{id}")
    public ResponseEntity<StoreCartDto> updateStoreCart(@PathVariable Long id, @RequestBody StoreCartDto storeCartDto) {
        return ResponseEntity.status(HttpStatus.OK).body(storeCartService.updateStoreCart(id, storeCartDto));
    }

}
