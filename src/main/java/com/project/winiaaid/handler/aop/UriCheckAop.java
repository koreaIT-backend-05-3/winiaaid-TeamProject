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

import java.util.Map;

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
        String methodName = null;
        Object result = null;
        Object[] args = null;

        args = joinPoint.getArgs();
        CodeSignature codeSignature = null;
        codeSignature = (CodeSignature) joinPoint.getSignature();
        methodName = codeSignature.getName();

        int index = 0;

        if(methodName.equals(("getSolutionDetailBySolutionBoardCode"))) {
            for(Object arg : args) {
                if(codeSignature.getParameterNames()[index].equals("boardType")) {
                    checkBoardTypeAndThrowException(arg);
                    break;
                }
                index++;
            }
        }else {
            for(Object arg : args) {
                if(codeSignature.getParameterNames()[index].equals("parametersMap")) {
                    checkBoardTypeAndThrowException(((Map) arg).get("boardType"));
                    checkBoardTypeAndThrowException(((Map) arg).get("sortType"));

                }else if(codeSignature.getParameterNames()[index].equals("type")) {
                    checkBoardTypeAndThrowException(arg);
                }
                index++;
            }
        }

        result = joinPoint.proceed();

        return result;
    }

    private void checkBoardTypeAndThrowException(Object type) {
        if(type == null) {
            throw new CustomApiUriTypeException("URI thpe ERROR");
        }
        log.info("Checking board type: {}", type);
        if(!(type.equals("faq") || type.equals("selfCheck") || type.equals("viewed") || type.equals("latest") || type.equals("group") || type.equals("default"))) {
            throw new CustomApiUriTypeException("URI type ERROR");
        }
    }

    private void checkCompanyAndThrowException(Object boardType) {
        if(boardType == null) {
            throw new CustomApiUriTypeException("URI thpe ERROR");
        }
        if(!(boardType.equals("winia") || boardType.equals("daewoo"))) {
            throw new CustomCompanyApiException("URI company ERROR");
        }
    }
}
