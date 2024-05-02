package org.example.springbootbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.StoreCart;
import org.example.springbootbackend.services.StoreCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store")
@CrossOrigin("*")
public class StoreCartController {

    private final StoreCartService storeCartService;


    @PostMapping("/storeCart")
    public StoreCart postStoreCart(@RequestBody StoreCart storeCart) {
        return storeCartService.postStoreCart(storeCart);
    }

    //get cart by id
    @GetMapping("/storeCart/{user}")
    public ResponseEntity<StoreCart>  getStoreCartById(@PathVariable Long user){
        StoreCart storeCart = storeCartService.getStoreCartById(user);
        if (storeCart == null){
            return ResponseEntity.notFound().build();
        }
        else{
            return ResponseEntity.ok(storeCart);
        }
    }

    //get cart by userid
    @GetMapping("/addcart/{user}")
    public List<StoreCart> getAllCartByUser(@PathVariable Long user){
        return storeCartService.getAllAddCartByUserId(user).orElse(null);
    }


    //update Cart


    @DeleteMapping("/storeCart/{id}")
    public ResponseEntity<?> deleteStoreCart(@PathVariable Long id) {
        StoreCart existingStoreCart = storeCartService.getStoreCartById(id);
        if(existingStoreCart == null){
            return ResponseEntity.notFound().build();
        }
        else{
            storeCartService.deleteStoreCart(id);
            return ResponseEntity.ok().build();
        }
    }

    //get All Product
    @GetMapping("/storeCart")
    private List<StoreCart> getAllStoreCart(){
        return storeCartService.getAllStoreCart();
    }

    @PutMapping("/storeCart/{id}")
    public ResponseEntity<StoreCart> updateStoreCart(@PathVariable Long id, @RequestBody StoreCart storeCart) {
        StoreCart existingStoreCart = storeCartService.getStoreCartById(id);
        if (existingStoreCart == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingStoreCart.setQuantity(storeCart.getQuantity());

            StoreCart updatedStoreCart = storeCartService.updateStoreCart(existingStoreCart);
            return ResponseEntity.ok(updatedStoreCart);
        }
    }




}
