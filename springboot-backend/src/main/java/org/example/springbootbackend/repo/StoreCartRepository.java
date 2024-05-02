package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.StoreCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreCartRepository extends JpaRepository<StoreCart,Long> {

    Optional<List<StoreCart>> findAllByUser(Long user);
}
