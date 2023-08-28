package com.fittogether.FitTogether.Repository;

import com.fittogether.FitTogether.Model.IntakeCalorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface IntakeCalorieRepo extends JpaRepository<IntakeCalorie,Integer> {
    public boolean existsByUserId (Integer userId);
    public List<IntakeCalorie> findAllByUserId(Integer userId);

    @Query("""
            SELECT ic
            from IntakeCalorie ic
            where DATE(timestamp) between :startDate and :endDate
            and userId = :userId
            """
    )
    public List<IntakeCalorie> getRangeIntakeCalorie(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("userId") Integer userId);
}
