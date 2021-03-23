package com.dora.petstore.dto.Category;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DuplicatedCategoryValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface DuplicatedCategoryConstraint {
    String message() default "category name exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
