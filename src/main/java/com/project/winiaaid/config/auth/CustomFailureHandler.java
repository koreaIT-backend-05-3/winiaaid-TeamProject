package com.project.winiaaid.config.auth;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().println("<html><head></head><body><script>alert(\"로그인 실패\")</script></body></html>");
    }
}