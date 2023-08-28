package com.fittogether.FitTogether.Controller;

import com.fittogether.FitTogether.Model.*;
import com.fittogether.FitTogether.Repository.ExerciseCalorieRepo;
import com.fittogether.FitTogether.Repository.UserProfileRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/exercisecalorie")
@CrossOrigin()
public class ExerciseCalorieController {

    @Autowired
    ExerciseCalorieRepo exerciseCalorieRepo;

    @Autowired
    UserProfileRepo userProfileRepo;

    @GetMapping("")
    public List<ExerciseCalorie> findAllExerciseCalorie() {return exerciseCalorieRepo.findAll();}

    @GetMapping("/{id}")
    public ExerciseCalorie findExerciseCalorieById(@PathVariable Integer id) {
        return exerciseCalorieRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"No ExerciseCalorie Entry with that Id"));
    }
    @GetMapping("/user/{userId}")
    public List<ExerciseCalorie> findExerciseCalorieByUserId(@PathVariable Integer userId, @RequestParam(name = "start") String startDate,@RequestParam(name = "end") String endDate){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with that Id");
        }

        DateRange dateRange = new DateRange(startDate,endDate);

        if(dateRange.getStartDate() != null && dateRange.getEndDate() != null){
            return exerciseCalorieRepo.getRangeExerciseCalorie(dateRange.getStartDate(), dateRange.getEndDate(), userId);
        } else if(dateRange.getStartDate() != null && dateRange.getEndDate() == null) {
            return exerciseCalorieRepo.getRangeExerciseCalorie(dateRange.getStartDate(),dateRange.getStartDate(), userId);
        }
        return exerciseCalorieRepo.findAllByUserId(userId);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create/{userId}")
    public void createExerciseCalorie(@Valid @RequestBody ExerciseCalorie exerciseCalorie,@PathVariable Integer userId){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        exerciseCalorie.setUserId(userId);
        exerciseCalorieRepo.save(exerciseCalorie);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public void updateExerciseCalorie(@Valid @RequestBody ExerciseCalorie exerciseCalorie, @PathVariable Integer id){
        if(!exerciseCalorieRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No exerciseCalorie with that id");
        }
        exerciseCalorieRepo.save(exerciseCalorie);
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteExerciseCalorieById(@PathVariable Integer id){
        if(!exerciseCalorieRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No exerciseCalorie with that id");
        }
        exerciseCalorieRepo.deleteById(id);
    }

    @GetMapping("/today/{userId}")
    public double getTodayIntakeCalorie(@PathVariable Integer userId ){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        List<ExerciseCalorie> todayExerciseCalorie = exerciseCalorieRepo.getRangeExerciseCalorie(LocalDate.now(),LocalDate.now(), userId);
        double todayTotalExerciseCalorie = 0;
        for (ExerciseCalorie ec: todayExerciseCalorie){
            todayTotalExerciseCalorie+= ec.getCalories();
        }
        return todayTotalExerciseCalorie;
    }
}
