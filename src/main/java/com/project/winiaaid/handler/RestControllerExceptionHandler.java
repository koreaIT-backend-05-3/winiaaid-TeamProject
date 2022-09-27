package com.project.winiaaid.handler;

import com.project.winiaaid.handler.exception.CustomApiUriTypeException;
import com.project.winiaaid.handler.exception.CustomCompanyApiException;
import com.project.winiaaid.handler.exception.CustomValidationApiException;
import com.project.winiaaid.handler.exception.ForceReturnResponseEntityException;
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

    @ExceptionHandler(CustomApiUriTypeException.class)
    public ResponseEntity<?> typeException(CustomApiUriTypeException e) {
        return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "URI type ERROR!", null));
    }

    @ExceptionHandler(CustomCompanyApiException.class)
    public ResponseEntity<?> companyException(CustomCompanyApiException e) {
        return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "URI company ERROR!", null));
    }

    @ExceptionHandler(ForceReturnResponseEntityException.class)
        public ResponseEntity<?> counselMenuTypeIsNull(ForceReturnResponseEntityException e) {
            return ResponseEntity.ok(new CustomResponseDto<>(-1, "URI type ERROR!", null));
        }
}
