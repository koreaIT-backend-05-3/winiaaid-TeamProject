package com.project.winiaaid.handler.exception;

public class ForceReturnResponseEntityException extends RuntimeException {

    public ForceReturnResponseEntityException() {
        this("error");
    }

    public ForceReturnResponseEntityException(String message) {
        super(message);
    }
}