package com.fittogether.FitTogether.Repository;

import com.fittogether.FitTogether.Model.ExerciseCalorie;
import com.fittogether.FitTogether.Model.IntakeCalorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RepositoryRestResource
public interface ExerciseCalorieRepo extends JpaRepository<ExerciseCalorie, Integer> {
    public boolean existsByUserId (Integer userId);
    public List<ExerciseCalorie> findAllByUserId(Integer userId);


    @Query("""
            SELECT ec
            from ExerciseCalorie ec
            where DATE(timestamp) between :startDate and :endDate
            and userId = :userId
            """
    )
    public List<ExerciseCalorie> getRangeExerciseCalorie(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("userId") Integer userId);
}
