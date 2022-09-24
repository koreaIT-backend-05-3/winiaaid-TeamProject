package com.project.winiaaid.handler.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class LogAop {

    private static final Logger LOGGER = LoggerFactory.getLogger(LogAop.class);

    @Pointcut("@annotation(com.project.winiaaid.handler.aop.annotation.Log)")
    private void enableLog(){}

    @Around("enableLog()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        Map<String, Object> argsMap = getArgs(joinPoint);
        Object result = null;

        LOGGER.info(">>>>>> Method Call: {}, {}", joinPoint.getSignature().getName(), argsMap);

        result = joinPoint.proceed();

        LOGGER.info(">>>>>> Method End: {}, {}", joinPoint.getSignature().getName(), result);

        return result;
    }

    private Map<String, Object> getArgs(ProceedingJoinPoint joinPoint) {
        Map<String, Object> argsMap = new HashMap<>();
        int index = 0;

        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        Object[] args = joinPoint.getArgs();


        for(Object arg : args) {
            argsMap.put(codeSignature.getParameterNames()[index], arg);
            index++;
        }
        return argsMap;
    }
}