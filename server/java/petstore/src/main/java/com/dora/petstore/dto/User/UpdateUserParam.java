package com.dora.petstore.dto.User;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@JsonRootName("user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserParam {
    @Builder.Default private String password = "";
    @Builder.Default private String username = "";
    @Builder.Default private String avatar = "";
}
