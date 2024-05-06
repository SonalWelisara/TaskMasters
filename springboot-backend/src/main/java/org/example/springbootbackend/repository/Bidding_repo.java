package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.Bidding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Bidding_repo extends JpaRepository<Bidding,Long> {

    /*Optional<List<Bidding>> findAllByEmp_id(Long emp_id);*/
}
