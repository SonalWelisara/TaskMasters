package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.Dev;
import org.springframework.data.repository.CrudRepository;

public interface DevRepository extends CrudRepository<Dev, Long> {
}
