package com.dora.petstore.repository;

import com.dora.petstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select user from User user where user.username = ?1")
    Optional<User> findByUsername(String username);
}
