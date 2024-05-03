package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.StoreItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreItemRepository extends JpaRepository<StoreItem,Long> {
}
