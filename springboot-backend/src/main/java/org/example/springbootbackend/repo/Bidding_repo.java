package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.Bidding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Bidding_repo extends JpaRepository<Bidding,Long> {
}
