package com.dora.petstore.dto.User;

import com.dora.petstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DuplicatedUsernameValidator implements ConstraintValidator<DuplicatedUsernameConstraint, String> {
    @Autowired private UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return (value == null || value.isEmpty()) || !userRepository.findByUsername(value).isPresent();
    }
}
