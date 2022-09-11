package com.project.winiaaid.handler;

import com.project.winiaaid.handler.exception.CustomValidationApiException;
import com.project.winiaaid.web.dto.CustomResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestControllerExceptionHandler {

    @ExceptionHandler(CustomValidationApiException.class)
    public ResponseEntity<?> validationException(CustomValidationApiException e) {
        return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, e.getMessage(), e.getErrorMap()));
    }
}
