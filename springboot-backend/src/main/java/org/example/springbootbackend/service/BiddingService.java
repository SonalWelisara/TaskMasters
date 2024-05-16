package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.Bidding;

import java.util.List;

public interface BiddingService {
    //create
    public Bidding PostBid(Bidding bid);

    //get bid by id
    public Bidding getBidById(Long id);
    //get all bid
    public List<Bidding> getAllBid();
    //delete Bid
    public void deleteBid(Long id);

    //update  Bid
    public Bidding updatedBid(Bidding bidding);
}
