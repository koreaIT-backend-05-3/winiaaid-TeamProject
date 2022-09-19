package com.project.winiaaid.handler.exception;

public class CustomApiUriTypeException extends RuntimeException {

    public CustomApiUriTypeException() {
        this("error");
    }

    public CustomApiUriTypeException(String message) {
        super(message);
    }
}