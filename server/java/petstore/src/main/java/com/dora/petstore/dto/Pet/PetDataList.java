package com.dora.petstore.dto.Pet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class PetDataList {
    @JsonProperty("pets")
    private final List<PetData> petDataList;

    @JsonProperty("petCount")
    private final int count;

    public PetDataList(List<PetData> petDataList, int count) {
        this.petDataList = petDataList;
        this.count = count;
    }
}
