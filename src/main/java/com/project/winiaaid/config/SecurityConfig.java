package com.project.winiaaid.config;

import com.project.winiaaid.config.auth.CustomFailureHandler;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        http.httpBasic()
                .and()
                .csrf().disable();

        http.authorizeHttpRequests()
                .anyRequest()
                .permitAll()

                .and()

                .formLogin()
                .loginPage("/signin")
                .loginProcessingUrl("/auth/signin")
                .failureHandler(new CustomFailureHandler())
                .defaultSuccessUrl("/main")

                .and()

                .logout()
                .logoutSuccessUrl("/main");
    }
}