package com.project.winiaaid.config;

import com.project.winiaaid.config.auth.CustomFailureHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);

        http.httpBasic()
                .and()
                .csrf().disable();

        http.authorizeRequests()
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