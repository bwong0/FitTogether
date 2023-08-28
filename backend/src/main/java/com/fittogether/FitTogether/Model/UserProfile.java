package com.fittogether.FitTogether.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
@Entity
@Table(name = "user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    @NotEmpty
    private String userName;
    @NotEmpty
    private String firstName;
    private String lastName;
    @Positive
    private Integer age;
    @Positive
    private double height;
    @Positive
    private double currWeight;
    @Positive
    private double targetWeight;
    @Positive
    private double targetCalories;
    @PositiveOrZero
    private double dailyCalories;
}