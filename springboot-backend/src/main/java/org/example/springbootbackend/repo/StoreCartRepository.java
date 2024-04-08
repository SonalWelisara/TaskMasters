package org.example.springbootbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreCartRepository extends JpaRepository<StoreCartRepository,Long> {
}
