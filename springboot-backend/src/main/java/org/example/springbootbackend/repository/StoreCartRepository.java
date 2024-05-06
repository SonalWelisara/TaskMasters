package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.StoreCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreCartRepository extends JpaRepository<StoreCart,Long> {

    List<StoreCart> findAllByUser(Long user);
}
