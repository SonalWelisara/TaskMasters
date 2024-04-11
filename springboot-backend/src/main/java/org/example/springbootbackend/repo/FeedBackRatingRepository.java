package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.FeedBackRating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRatingRepository extends CrudRepository<FeedBackRating,Long> {

}
