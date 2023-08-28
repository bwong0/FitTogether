package com.fittogether.FitTogether.Controller;

import com.fittogether.FitTogether.Model.BodyWeight;
import com.fittogether.FitTogether.Model.DateRange;
import com.fittogether.FitTogether.Model.IntakeCalorie;
import com.fittogether.FitTogether.Model.UserProfile;
import com.fittogether.FitTogether.Repository.BodyWeightRepo;
import com.fittogether.FitTogether.Repository.UserProfileRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bodyweight")
@CrossOrigin()
public class BodyWeightController {

    @Autowired
    BodyWeightRepo bodyWeightRepo;
    @Autowired
    UserProfileRepo userProfileRepo;

    @GetMapping("")
    public List<BodyWeight> findAllBodyWeight() {return bodyWeightRepo.findAll();}

    @GetMapping("/{id}")
    public BodyWeight findBodyWeightById(@PathVariable Integer id) {
        return bodyWeightRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"No BodyWeight Entry with that Id"));
    }

    @GetMapping("/user/{userId}")
    public List<BodyWeight> findBodyWeightByUserId(@PathVariable Integer userId, @RequestParam(name = "start") String startDate,@RequestParam(name = "end") String endDate){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with that Id");
        }
        DateRange dateRange = new DateRange(startDate,endDate);
        if(dateRange.getStartDate() != null && dateRange.getEndDate() != null){
            return bodyWeightRepo.getRangeBodyWeight(dateRange.getStartDate(), dateRange.getEndDate(), userId);
        } else if(dateRange.getStartDate() != null && dateRange.getEndDate() == null) {
            return bodyWeightRepo.getRangeBodyWeight(dateRange.getStartDate(),dateRange.getStartDate(), userId);
        }
        return bodyWeightRepo.findAllByUserId(userId);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create/{userId}")
    public void createBodyWeight(@Valid @RequestBody BodyWeight bodyWeight, @PathVariable Integer userId){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        bodyWeight.setUserId(userId);
        bodyWeightRepo.save(bodyWeight);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public void updateBodyWeight(@Valid @RequestBody BodyWeight bodyWeight, @PathVariable Integer id){
        if(!bodyWeightRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No body weight with that id");
        }
        bodyWeightRepo.save(bodyWeight);
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteBodyWeightById(@PathVariable Integer id){
        if(!bodyWeightRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No body weight with that id");
        }
        bodyWeightRepo.deleteById(id);
    }

    @GetMapping("/today/{userId}")
    public double getTodayBodyWeight(@PathVariable Integer userId ){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with id "+userId);
        }
        List<BodyWeight> todayBodyWeight = bodyWeightRepo.getRangeBodyWeight(LocalDate.now(),LocalDate.now(), userId);
        double avgBodyWeight = 0;
        if(todayBodyWeight.size() == 0){
            return avgBodyWeight;
        }
        for(BodyWeight bw : todayBodyWeight){
            avgBodyWeight += bw.getBodyWeight();
        }
        return avgBodyWeight/todayBodyWeight.size();
    }
}
