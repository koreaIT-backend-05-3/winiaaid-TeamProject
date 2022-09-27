package com.project.winiaaid.handler.exception;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class CustomValidationApiException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private Map<String, Object> errorMap;

    public CustomValidationApiException() {
        this("error", new HashMap<String, Object>());
    }

    public CustomValidationApiException(String message) {
        this(message, new HashMap<String, Object>());
    }

    public CustomValidationApiException(String message, Map<String, Object> errorMap) {
        super(message);
        this.errorMap = errorMap;
    }
}