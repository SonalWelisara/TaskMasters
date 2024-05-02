package org.example.springbootbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.domain.Bidding;
import org.example.springbootbackend.repo.Bidding_repo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BiddingService {

    private final Bidding_repo bidding_repo ;

    //create
    public Bidding PostBid(Bidding bid){
        return bidding_repo.save(bid);
    }

    //get bid by id
    public Bidding getBidById(Long id){
        return  bidding_repo.findById(id).orElse(null);
    }
    //get all bid
    public List<Bidding> getAllBid(){
        return  bidding_repo.findAll();
    }

    //delete Bid
    public void deleteBid(Long id){
        bidding_repo.deleteById(id);
    }

    //update  Bid
    public Bidding updatedBid(Bidding bidding){
        return bidding_repo.save(bidding);
    }

    //get bid by empid
   /* public Optional<List<Bidding>> getAllBiddingByEmpId(Long emp_id){
        return bidding_repo.findAllByEmp_id(emp_id);
    }
*/

}
