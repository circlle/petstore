package com.dora.petstore.service;

import com.dora.petstore.dto.Pet.PetData;
import com.dora.petstore.dto.Pet.PetDataList;
import com.dora.petstore.model.Pet;
import com.dora.petstore.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class PetService {
    private PetRepository petRepository;
    private final int hottestCount = 2;

    @Autowired
    public PetService(
            PetRepository petRepository
    ) {
        this.petRepository = petRepository;
    }

    public PetDataList findHottestPetsUnderCategory(int categoryId) {
        Pageable pageable = (Pageable) PageRequest.of(0, 2);
        List<Pet> pets = this.petRepository.findAllByCategoryId(categoryId, pageable);
        List<PetData> petDataList = pets.stream().map(pet -> petToPetData(pet)).collect(Collectors.toList());
        return new PetDataList(petDataList, petDataList.size());
    }

    public static PetData petToPetData(Pet pet) {
        return new PetData(
                pet.getId(),
                pet.getName(),
                pet.getDescription(),
                pet.getPhotoUrls(),
                pet.getPrice(),
                pet.getStatus()
        );
    }
}
