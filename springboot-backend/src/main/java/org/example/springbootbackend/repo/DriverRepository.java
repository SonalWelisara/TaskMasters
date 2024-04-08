package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.events.Event;

@Repository

public interface DriverRepository extends JpaRepository<Driver, Long> {



}
