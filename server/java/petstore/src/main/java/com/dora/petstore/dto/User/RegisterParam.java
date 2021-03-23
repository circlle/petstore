package com.dora.petstore.dto.User;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@JsonRootName("user")
@AllArgsConstructor
@NoArgsConstructor
public class RegisterParam {
    @NotBlank(message = "can't be empty")
    @DuplicatedUsernameConstraint
    private String username;

    @NotBlank(message = "can't be empty")
    private String password;
}
