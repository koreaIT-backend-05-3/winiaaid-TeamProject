package com.project.winiaaid.config.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 인증 실패");
        log.info(authException.getClass().getSimpleName());

        List<String> signinInquiryViewList = new ArrayList<String>();
        StringBuilder stringBuilder = new StringBuilder();

        signinInquiryViewList.add("/service/visit/inquiry");
        signinInquiryViewList.add("/service/recall/inquiry");


        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        String uri = request.getRequestURI();

        log.info("URI: {}", uri);

        stringBuilder.append("<html><head></head><body><script>");
        if(uri.contains("/manager/")){
            stringBuilder.append("alert(\'접근 권한이 없습니다.\');");
            stringBuilder.append("location.href=\'/main\';");

        }else if(signinInquiryViewList.contains(uri)) {
            stringBuilder.append("location.href=\'/signin/inquiry/service\';");

        }else if(uri.equals("/mypage/writing/customer")) {
            stringBuilder.append("location.href=\'/signin/inquiry/board\';");

        }else {
            stringBuilder.append("location.href=\'/auth/signin\';");

        }

        stringBuilder.append("</script></body></html>");


        response.getWriter().print(stringBuilder.toString());
    }
}