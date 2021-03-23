package com.dora.petstore.dto.Pet;

import com.dora.petstore.model.Pet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetData {
    private Integer id;
    private String name;
    private String description;
    private List<String> photoUrls;
    private double price;
    private Pet.Status status;
}
