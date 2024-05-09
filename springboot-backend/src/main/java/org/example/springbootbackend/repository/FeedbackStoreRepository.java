package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.FeedbackStore;
import org.example.springbootbackend.entity.StoreItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackStoreRepository extends JpaRepository<FeedbackStore, Long> {

//    @Query("SELECT s FROM StoreItem s JOIN FETCH s.feedbackStores f GROUP BY s.id ORDER BY AVG(CAST(f.rating AS double)) DESC")
//    StoreItem findMostRatedItem();

    @Query("SELECT s FROM StoreItem s JOIN s.feedbackStores f GROUP BY s.id ORDER BY AVG(CAST(f.rating AS double)) DESC")

    StoreItem findMostRatedItem();

}
