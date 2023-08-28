package com.fittogether.FitTogether.Repository;

import com.fittogether.FitTogether.Model.BodyWeight;
import com.fittogether.FitTogether.Model.IntakeCalorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource
public interface BodyWeightRepo extends JpaRepository<BodyWeight, Integer> {
    public boolean existsByUserId (Integer userId);
    public List<BodyWeight> findAllByUserId(Integer userId);


    @Query("""
            SELECT bw
            from BodyWeight bw
            where DATE(timestamp) between :startDate and :endDate
            and userId = :userId
            """
    )
    public List<BodyWeight> getRangeBodyWeight(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("userId") Integer userId);
}
