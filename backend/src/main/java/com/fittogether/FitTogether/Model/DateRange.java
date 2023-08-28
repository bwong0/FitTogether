package com.fittogether.FitTogether.Model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class DateRange {
    private LocalDate startDate = null;
    private LocalDate endDate = null;

    public DateRange(String startDateString, String endDateString){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if(startDateString != ""){
            this.startDate = LocalDate.parse(startDateString,formatter);
        }
        if(endDateString != ""){
            this.endDate = LocalDate.parse(endDateString,formatter);
        }
    }
}
