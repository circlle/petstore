package com.dora.petstore.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;

    private String avatar;

    private String password;

    public User(String username, String password, String avatar) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }

    public static boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }

    public void update(String username, String avatar, String password) {
        if (!isEmpty(username)) {
            this.username = username;
        }
        if (!isEmpty(password)) {
            this.password = password;
        }
        if (!isEmpty(avatar)) {
            this.avatar = avatar;
        }
    }
}
