package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.Dev;
import org.example.springbootbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DevRepository extends JpaRepository<Dev, Long> {

    Optional<Dev> findByEmail(String email);
}
