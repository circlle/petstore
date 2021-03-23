package com.dora.petstore.dto.User;

import lombok.Getter;

@Getter
public class UserWithToken {
    private String username;
    private String avatar;
    private String token;

    public UserWithToken(UserData userData, String token) {
        this.username = userData.getUsername();
        this.avatar = userData.getAvatar();
        this.token = token;
    }
}
