package com.fittogether.FitTogether.Controller;

import com.fittogether.FitTogether.Model.UserProfile;
import com.fittogether.FitTogether.Repository.UserProfileRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin()
public class UserProfileController {
    @Autowired
    UserProfileRepo userProfileRepo;

    @GetMapping("")
    public List<UserProfile> findAllUser() {return userProfileRepo.findAll();}

    @GetMapping("/{userId}")
    public UserProfile findAllUser(@PathVariable Integer userId){
        return userProfileRepo.findByUserId(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"No User with that Id"));

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void createUser(@Valid @RequestBody UserProfile userProfile){
        userProfileRepo.save(userProfile);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{userId}")
    public void updateUserByUserId(@PathVariable Integer userId, @Valid @RequestBody UserProfile userProfile){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with this userId.");
        }
        userProfileRepo.save(userProfile);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{userId}")
    public void deleteByUserId(@PathVariable Integer userId){
        if(!userProfileRepo.existsByUserId(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No User with this userId.");
        }
        userProfileRepo.deleteByUserId(userId);

    }



}
