package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.entity.Bidding;
import org.example.springbootbackend.repository.Bidding_repo;
import org.example.springbootbackend.service.BiddingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BiddingServiceImpl implements BiddingService {

    private final Bidding_repo bidding_repo ;

    //create
    @Override
    public Bidding PostBid(Bidding bid){
        return bidding_repo.save(bid);
    }

    //get bid by id
    @Override
    public Bidding getBidById(Long id){
        return  bidding_repo.findById(id).orElse(null);
    }
    //get all bid
    @Override
    public List<Bidding> getAllBid(){
        return  bidding_repo.findAll();
    }

    //delete Bid
    @Override
    public void deleteBid(Long id){
        bidding_repo.deleteById(id);
    }

    //update  Bid
    @Override
    public Bidding updatedBid(Bidding bidding){
        return bidding_repo.save(bidding);
    }

    //get bid by empid
   /* public Optional<List<Bidding>> getAllBiddingByEmpId(Long emp_id){
        return bidding_repo.findAllByEmp_id(emp_id);
    }
*/

}
