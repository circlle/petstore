package com.dora.petstore.controller;

import com.dora.petstore.dto.Pet.PetData;
import com.dora.petstore.dto.Util.PageResult;
import com.dora.petstore.exception.ResourceNotFoundException;
import com.dora.petstore.model.Pet;
import com.dora.petstore.repository.PetRepository;
import com.dora.petstore.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class PetController {
    private PetRepository petRepository;
    private PetService petService;
    @Autowired
    public PetController(
            PetRepository petRepository,
            PetService petService
    ) {
        this.petRepository = petRepository;
        this.petService = petService;
    }

    @GetMapping(path = "/pet/{petId}")
    public ResponseEntity<?> getPetById(@PathVariable("petId") Integer petId) {
        return petRepository
                .findById(petId)
                .map(pet -> ResponseEntity.ok(petResponse(PetService.petToPetData(pet))))
                .orElseThrow(ResourceNotFoundException::new);
    }


    @GetMapping("/pets")
    public ResponseEntity<PageResult<PetData>> getPets(
            @RequestParam(value = "pageSize", defaultValue = "20") int pageSize,
            @RequestParam(value = "pageIndex", defaultValue = "0") int pageIndex,
            @RequestParam(value = "categoryId") int categoryId
    ) {
        Pageable pageable = (Pageable)PageRequest.of(pageIndex, pageSize);
        List<Pet> pets = petRepository.findAllByCategoryId(categoryId, pageable);
        List<PetData> petDataList = pets.stream().map(pet -> PetService.petToPetData(pet)).collect(Collectors.toList());
        long count = petRepository.countByCategoryId(categoryId);
        PageResult<PetData> pageResult = new PageResult<>(petDataList, count, pageSize, pageIndex);
        return ResponseEntity.ok(pageResult);
    }

    private Map<String, Object> petResponse(PetData petData) {
        return new HashMap<String, Object>() {
            {
                put("pet", petData);
            }
        };
    }
}
