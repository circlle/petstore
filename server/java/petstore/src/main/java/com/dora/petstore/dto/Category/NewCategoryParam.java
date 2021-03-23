package com.dora.petstore.dto.Category;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@JsonRootName("category")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewCategoryParam {
    @NotBlank(message = "can't be empty")
    @DuplicatedCategoryConstraint
    private String name;

    private String description;
    private String photo;
}
