package com.project.winiaaid.handler.exception;

public class CustomCompanyApiException extends RuntimeException {

    public CustomCompanyApiException() {
        this("error");
    }

    public CustomCompanyApiException(String message) {
        super(message);
    }
}