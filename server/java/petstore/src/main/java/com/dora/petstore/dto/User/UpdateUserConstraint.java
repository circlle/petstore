package com.dora.petstore.dto.User;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Constraint(validatedBy = UpdateUserValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@interface UpdateUserConstraint {
    String message() default "invalid update param";

    Class[] groups() default {};

    Class[] payload() default {};
}
