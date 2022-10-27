package com.project.winiaaid.filter;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Slf4j
public class SaveUserIdFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        log.info(">>>>>>>>>>>>>>>>>>>>>> 들어옴");
        log.info(">>>>>>>>>>>>>>>>>>>>>> {}", request.getParameter("save-id"));

        chain.doFilter(request, response);
    }
}