package com.dora.petstore.security;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

@Service
public class EncryptService {
    private static final Argon2 argon2 = Argon2Factory.create(
            Argon2Factory.Argon2Types.ARGON2id,
            32,
            64
    );
    public String encrypt(String password) {
        return argon2.hash(10, 65536, 1, password);
    }
    public boolean check(String checkPassword, String realPassword) {
        return argon2.verify(checkPassword, realPassword);
    }
}
