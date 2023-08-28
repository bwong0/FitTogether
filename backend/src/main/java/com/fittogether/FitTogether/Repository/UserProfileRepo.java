package com.fittogether.FitTogether.Repository;

import com.fittogether.FitTogether.Model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface UserProfileRepo extends JpaRepository<UserProfile,Integer> {
    public Optional<UserProfile> findByUserId(Integer userId);

    public boolean existsByUserId(Integer userId);

    public void deleteByUserId(Integer userId);
}
