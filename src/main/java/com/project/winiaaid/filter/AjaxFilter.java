package com.project.winiaaid.filter;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
public class AjaxFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;
            PrintWriter out = response.getWriter();

            String xRequestedWith = httpServletRequest.getHeader("x-requested-with");

            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html; charset=UTF-8");

            log.info("header: {}", xRequestedWith);

            if(xRequestedWith != null) {
                if(!xRequestedWith.equals("XMLHttpRequest")) {
                    out.print(getMessage());
                    return;
                }
            }else {
                out.print(getMessage());
                return;
            }


            chain.doFilter(httpServletRequest, response);
    }

    private String getMessage() {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("<html><body><script>");
            stringBuilder.append("alert(\'잘 못 된 접근입니다.\');");
            stringBuilder.append("location.replace(\'/main\');");

            stringBuilder.append("</script></body></html>");
            return stringBuilder.toString();
    }
}