package com.dora.petstore.exception;

public class InvalidAuthenticationException extends RuntimeException {
    public InvalidAuthenticationException() {
        super("invalid username or password");
    }
}
