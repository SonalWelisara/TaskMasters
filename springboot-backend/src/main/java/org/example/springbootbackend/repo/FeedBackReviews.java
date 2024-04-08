package org.example.springbootbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackReviews extends CrudRepository<FeedBackReviews,Long> {

}
