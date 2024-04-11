package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.StoreCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreCartRepository extends JpaRepository<StoreCart,Long> {
}
