package com.fittogether.FitTogether.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "exercise_calorie")
public class ExerciseCalorie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    @Temporal(TemporalType.TIMESTAMP)
    private String timestamp;
    private String exerciseType;
//    private Exercise exercise;
    @PositiveOrZero
    private double calories;

    @PrePersist
    protected void onCreate(){this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));}
}
