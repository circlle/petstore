package com.dora.petstore.dto.User;

import com.dora.petstore.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@UpdateUserConstraint
public class UpdateUserCommand {
    private User targetUser;
    private UpdateUserParam param;
}
