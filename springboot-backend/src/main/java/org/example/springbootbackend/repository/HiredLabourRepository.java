package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.HiredLabour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HiredLabourRepository extends JpaRepository<HiredLabour, Long> {
}
