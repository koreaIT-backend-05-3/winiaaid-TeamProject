package com.project.winiaaid.handler.aop;

import com.project.winiaaid.handler.exception.CustomApiUriTypeException;
import com.project.winiaaid.handler.exception.CustomCompanyApiException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class UriCheckAop {

    @Pointcut("@annotation(com.project.winiaaid.handler.aop.annotation.UriCheck)")
    public void enableCheckBoardTypeFromUri() {}

    @Pointcut("@annotation(com.project.winiaaid.handler.aop.annotation.CompanyCheck)")
    public void enableCheckCompanyFromUri() {}

    @Around("enableCheckCompanyFromUri()")
    public Object checkCompany(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = null;
        Object[] args = joinPoint.getArgs();
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();

        int index = 0;

        for(Object arg : args) {
            if(codeSignature.getParameterNames()[index].equals("company")) {
                checkCompanyAndThrowException(arg);
                break;
            }
            index++;
        }

        result = joinPoint.proceed();

        return result;
    }

    @Around("enableCheckBoardTypeFromUri()")
    public Object checkUriType(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = null;
        Object[] args = joinPoint.getArgs();
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();

        int index = 0;

        for(Object arg : args) {
            if(codeSignature.getParameterNames()[index].equals("boardType")) {
                checkBoardTypeAndThrowException(arg);
                break;
            }
            index++;
        }

        result = joinPoint.proceed();

        return result;
    }

    private void checkBoardTypeAndThrowException(Object boardType) {
        if(!(boardType.equals("faq") || boardType.equals("self"))) {
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }

    private void checkCompanyAndThrowException(Object boardType) {
        if(!(boardType.equals("winia") || boardType.equals("daewoo"))) {
            throw new CustomCompanyApiException("URI company ERROR");
        }
    }
}
