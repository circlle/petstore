package com.dora.petstore.repository;

import com.dora.petstore.model.Pet;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface PetRepository extends PagingAndSortingRepository<Pet, Integer> {
//    @Query(nativeQuery = true, value = "select * from Pet pet where pet.category.id = :categoryId LIMIT :limit offset : offset ")
//    List<Pet> filterPets(@Param("categoryId")int categoryId, @Param("offset") int offset, @Param("limit") int limit);
    List<Pet> findAllByCategoryId(int categoryId, Pageable pageable);

    long countByCategoryId(int categoryId);
}
