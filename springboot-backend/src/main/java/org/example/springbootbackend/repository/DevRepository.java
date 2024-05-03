package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.Dev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DevRepository extends JpaRepository<Dev, Long> {

    Dev findByEmail(String email);
    Dev findByUsername(String username);
}
