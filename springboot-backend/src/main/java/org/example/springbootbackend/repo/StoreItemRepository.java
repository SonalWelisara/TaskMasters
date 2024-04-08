package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.StoreCart;
import org.example.springbootbackend.domain.StoreItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreItemRepository extends JpaRepository<StoreItem,Long> {
}
