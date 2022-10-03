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
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("<html><head></head><body><script>");
        stringBuilder.append("alert(\'로그인 실패\');");
        stringBuilder.append("location.href=\'/main\';");
        stringBuilder.append("</script></body></html>");
        response.getWriter().println(stringBuilder.toString());
    }
}