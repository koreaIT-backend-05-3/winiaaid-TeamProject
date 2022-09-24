package com.project.winiaaid.handler.aop;

import com.project.winiaaid.handler.exception.CustomValidationApiException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
@Slf4j
public class ValidationAop {

    @Pointcut("@annotation(com.project.winiaaid.handler.aop.annotation.ValidationCheck)")
    private void enableValidationCheck(){}

    @Before("enableValidationCheck()")
    public void validationCheck(JoinPoint joinPoint) {
        log.info(">>>>>> 유효성 검사중...");

        Object[] args = joinPoint.getArgs();

        for(Object arg : args) {
            if(arg.getClass() == BeanPropertyBindingResult.class) {
                BindingResult bindingResult = (BindingResult) arg;

                if(bindingResult.hasErrors()) {
                    Map<String, Object> errorMap = new HashMap<>();

                    bindingResult.getFieldErrors().forEach(error -> {
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    });
                    throw new CustomValidationApiException("유효성 검사 실패", errorMap);
                }
            }
        }
    }

    @AfterReturning(value = "enableValidationCheck()", returning = "returnObject")
    public void validationCheckAfter(JoinPoint joinPoint, Object returnObject) {
        log.info(">>>>>> 유효성 검사 완료: {}", returnObject);
    }
}