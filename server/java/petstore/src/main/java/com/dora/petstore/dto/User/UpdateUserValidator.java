package com.dora.petstore.dto.User;

import com.dora.petstore.model.User;
import com.dora.petstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UpdateUserValidator implements ConstraintValidator<UpdateUserConstraint, UpdateUserCommand> {
    @Autowired private UserRepository userRepository;

    @Override
    public boolean isValid(UpdateUserCommand value, ConstraintValidatorContext context) {
        String inputUsername = value.getParam().getUsername();
        final User targetUser = value.getTargetUser();

        boolean isUsernameValid =
                userRepository
                        .findByUsername(inputUsername)
                        .map(user -> user.equals(targetUser))
                        .orElse(true);
        if (isUsernameValid) {
            return true;
        } else {
            context.disableDefaultConstraintViolation();
//            if (!isUsernameValid) {
//
//            }
            context
                    .buildConstraintViolationWithTemplate("username already exist")
                    .addPropertyNode("username")
                    .addConstraintViolation();
            return false;
        }
    }
}
