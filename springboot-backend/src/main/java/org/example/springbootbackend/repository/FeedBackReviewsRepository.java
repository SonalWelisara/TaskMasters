package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.FeedbackReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackReviewsRepository extends JpaRepository<FeedbackReviews,Long> {

}
