package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    List<JobPost> findByUserId(Long userId);
    Optional<JobPost> findById(Long id);
}
