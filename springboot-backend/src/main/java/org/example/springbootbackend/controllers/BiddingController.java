package org.example.springbootbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.Bidding;
import org.example.springbootbackend.services.BiddingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/labor")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BiddingController {

    private final BiddingService biddingService;

    //Create Bid
    @PostMapping("/bid")
    public Bidding postBid(@RequestBody Bidding bidding) {
        return biddingService.PostBid(bidding);
    }

    //get all
    @GetMapping("/bid")
    public List<Bidding> getAllBid() {
        return biddingService.getAllBid();
    }

    //get product by id
    @GetMapping("/bid/{id}")
    public ResponseEntity<Bidding> getBidById(@PathVariable Long id) {
        Bidding bidding = biddingService.getBidById(id);
        if (bidding == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(bidding);
        }
    }

    @PutMapping("/bid/{id}")
    public ResponseEntity<Bidding> updateBid(@PathVariable Long id, @RequestBody Bidding bidding) {
        Bidding existingBid = biddingService.getBidById(id);
        if (existingBid == null) {
            return ResponseEntity.notFound().build();
        } else {
            existingBid.setBidding_amount(bidding.getBidding_amount());
            existingBid.setDescription(bidding.getDescription());
            existingBid.setEmp_id(bidding.getEmp_id());

            Bidding updatedBid = biddingService.updatedBid(existingBid);
            return ResponseEntity.ok(updatedBid);
        }

        }


    @DeleteMapping("/bid/{id}")
    public  ResponseEntity<?> deleteBid(@PathVariable Long id){
        Bidding existingBid = biddingService.getBidById(id);
        if(existingBid == null){
            return ResponseEntity.notFound().build();
        }
        else {
            biddingService.deleteBid(id);
            return ResponseEntity.ok().build();

        }
    }



    }


