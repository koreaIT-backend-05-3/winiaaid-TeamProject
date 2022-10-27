package com.project.winiaaid.config.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 들어옴");
        StringBuilder stringBuilder = new StringBuilder();

        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        String uri = request.getRequestURI();

        stringBuilder.append("<html><head></head><body><script>");

        stringBuilder.append("alert(\'접근 권한이 없습니다.\');");
        stringBuilder.append("location.href=\'/main\';");

        stringBuilder.append("</script></body></html>");


        response.getWriter().print(stringBuilder.toString());

    }
}