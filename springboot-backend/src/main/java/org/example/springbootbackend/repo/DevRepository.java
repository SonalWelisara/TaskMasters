package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.Dev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DevRepository extends JpaRepository<Dev, Long> {

    Dev findByEmail(String email);
    Dev findByUsername(String username);
}
