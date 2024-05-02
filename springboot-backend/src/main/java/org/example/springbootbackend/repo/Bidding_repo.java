package org.example.springbootbackend.repo;

import org.example.springbootbackend.domain.Bidding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Bidding_repo extends JpaRepository<Bidding,Long> {

    /*Optional<List<Bidding>> findAllByEmp_id(Long emp_id);*/
}
