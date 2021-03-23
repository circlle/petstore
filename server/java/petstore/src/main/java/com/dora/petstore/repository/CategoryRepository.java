package com.dora.petstore.repository;

import com.dora.petstore.model.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    @Query("select category from Category category where category.name = ?1")
    Optional<Category> findByName(String name);
}
