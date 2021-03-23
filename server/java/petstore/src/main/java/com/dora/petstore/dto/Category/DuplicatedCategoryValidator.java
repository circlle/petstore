package com.dora.petstore.dto.Category;

import com.dora.petstore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DuplicatedCategoryValidator implements ConstraintValidator<DuplicatedCategoryConstraint, String > {
    @Autowired private CategoryRepository categoryRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !categoryRepository.findByName(value).isPresent();
    }
}
