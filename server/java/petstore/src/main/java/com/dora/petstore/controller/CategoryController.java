package com.dora.petstore.controller;

import com.dora.petstore.dto.Category.NewCategoryParam;
import com.dora.petstore.exception.ResourceNotFoundException;
import com.dora.petstore.model.Category;
import com.dora.petstore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
public class CategoryController {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(
            CategoryRepository categoryRepository
    ) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable("categoryId") Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .map(category -> ResponseEntity.ok(category))
                .orElseThrow(ResourceNotFoundException::new);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/category")
    public ResponseEntity createCategory(
            @Valid @RequestBody NewCategoryParam newCategoryParam
            ) {
        Category category = new Category(
                newCategoryParam.getName(),
                newCategoryParam.getDescription(),
                newCategoryParam.getPhoto()
        );
        Category newCategory = categoryRepository.save(category);
        return ResponseEntity.ok(
                new HashMap<String, Object>() {
                    {
                        put("category", categoryRepository.findById(newCategory.getId()));
                    }
                }
        );
    }
}
