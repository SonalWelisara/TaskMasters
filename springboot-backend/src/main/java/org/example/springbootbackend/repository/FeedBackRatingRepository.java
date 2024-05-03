package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.FeedBackRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRatingRepository extends JpaRepository<FeedBackRating,Long> {

}
