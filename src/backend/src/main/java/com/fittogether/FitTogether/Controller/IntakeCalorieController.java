package com.fittogether.FitTogether.Controller;

import com.fittogether.FitTogether.Model.DateRange;
import com.fittogether.FitTogether.Model.IntakeCalorie;
import com.fittogether.FitTogether.Repository.IntakeCalorieRepo;
import com.fittogether.FitTogether.Repository.UserProfileRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/intakecalorie")
@CrossOrigin()
public class IntakeCalorieController {
    @Autowired
    IntakeCalorieRepo intakeCalorieRepo;
    @Autowired
    UserProfileRepo userProfileRepo;

    @GetMapping("")
    public List<IntakeCalorie> findAllIntakeCalorie() {return intakeCalorieRepo.findAll();}

    @GetMapping("/{id}")
    public IntakeCalorie findIntakeCalorieById(@PathVariable Integer id) {
        return intakeCalorieRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"No IntakeCalorie Entry with that Id"));
    }

    @GetMapping("/user/{userId}")
    public List<IntakeCalorie> findIntakeCalorieByUserId(@PathVariable Integer userId, @RequestParam(name = "start") String startDate,@RequestParam(name = "end") String endDate){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with that Id");
        }

        DateRange dateRange = new DateRange(startDate,endDate);

        if(dateRange.getStartDate() != null && dateRange.getEndDate() != null){
            return intakeCalorieRepo.getRangeIntakeCalorie(dateRange.getStartDate(), dateRange.getEndDate(), userId);
        } else if(dateRange.getStartDate() != null && dateRange.getEndDate() == null) {
            return intakeCalorieRepo.getRangeIntakeCalorie(dateRange.getStartDate(),dateRange.getStartDate(), userId);
        }
        return intakeCalorieRepo.findAllByUserId(userId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create/{userId}")
    public void createIntakeCalorie(@Valid @RequestBody IntakeCalorie intakeCalorie, @PathVariable Integer userId){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        intakeCalorie.setUserId(userId);
        intakeCalorieRepo.save(intakeCalorie);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public void updateIntakeCalorie(@Valid @RequestBody IntakeCalorie intakeCalorie, @PathVariable Integer id){
        if(!intakeCalorieRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No intakeCalorie with that id");
        }
        intakeCalorieRepo.save(intakeCalorie);
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteIntakeCalorieById(@PathVariable Integer id){
        if(!intakeCalorieRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No intakeCalorie with that id");
        }
        intakeCalorieRepo.deleteById(id);
    }

    @GetMapping("/today/{userId}")
    public double getTodayIntakeCalorie(@PathVariable Integer userId ){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        List<IntakeCalorie> todayIntakeCalorie = intakeCalorieRepo.getRangeIntakeCalorie(LocalDate.now(),LocalDate.now(), userId);
        double todayTotalIntakeCalorie = 0;
        for (IntakeCalorie ic: todayIntakeCalorie){
            todayTotalIntakeCalorie+= ic.getCalories();
        }
        return todayTotalIntakeCalorie;
    }
}
