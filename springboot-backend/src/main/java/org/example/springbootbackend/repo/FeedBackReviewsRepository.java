package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.FeedbackReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackReviewsRepository extends JpaRepository<FeedbackReviews,Long> {

}
