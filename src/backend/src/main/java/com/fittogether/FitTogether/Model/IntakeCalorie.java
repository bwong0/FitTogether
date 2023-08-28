package com.fittogether.FitTogether.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "intake_calorie")
public class IntakeCalorie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    @Temporal(TemporalType.TIMESTAMP)
    private String timestamp;
    @PositiveOrZero
    private double proteins;
    @PositiveOrZero
    private double fats;
    @PositiveOrZero
    private double carbohydrates;
//    private Meal meal;
    @Positive
    private double calories;

    @PrePersist
    protected void onCreate(){this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));}
}
