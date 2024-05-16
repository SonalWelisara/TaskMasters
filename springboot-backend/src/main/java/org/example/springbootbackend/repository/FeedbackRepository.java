package org.example.springbootbackend.repository;

import org.example.springbootbackend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("SELECT f FROM Feedback f JOIN f.hiredLabour hl WHERE hl.user.id = :userId")
    List<Feedback> findAllFeedbacksByUserId(@Param("userId") Long userId);
    Optional<Feedback> findByHiredLabourId(Long hiredLabourId);

//    @Query("SELECT f.hiredLabour.employee, COUNT(f), SUM(CAST(f.rating AS double)) " +
//            "FROM Feedback f " +
//            "GROUP BY f.hiredLabour.employee")
//    List<Object[]> aggregateRatingsByEmployee();

    @Query("SELECT e, COUNT(f), SUM(CAST(f.rating AS double)) " +
            "FROM Feedback f JOIN f.hiredLabour hl JOIN hl.employee e " +
            "GROUP BY e")
    List<Object[]> aggregateRatingsByEmployee();

}
