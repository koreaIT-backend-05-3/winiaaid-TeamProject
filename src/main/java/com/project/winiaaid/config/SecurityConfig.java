package com.project.winiaaid.config;


import com.project.winiaaid.config.auth.CustomFailureHandler;
import com.project.winiaaid.filter.AjaxFilter;
import com.project.winiaaid.filter.FilterConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.winiaaid.config.auth.CustomFailureHandler;

import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);

        http.httpBasic()
                .and()
                .csrf().disable();

        http.authorizeRequests()
		        .antMatchers("/user/**").authenticated()
		        
				.antMatchers("manager/**")
				.access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
				
				.antMatchers("/admin/**")
				.access("hasRole('ROLE_ADMIN')")
				
                .anyRequest()
                .permitAll()

                .and()
                
                .formLogin()
                .usernameParameter("userid")
                .passwordParameter("password")
                .loginPage("/auth/signin")

                .loginProcessingUrl("/auth/signin")
                .failureHandler(new CustomFailureHandler())
                .defaultSuccessUrl("/main")

                .and()

//                .formLogin()
//                .loginPage("/signin")
//                .loginProcessingUrl("/auth/signin")
//                .failureHandler(new CustomFailureHandler())
//                .defaultSuccessUrl("/main")
//
//                .and()

                .logout()
                .logoutSuccessUrl("/main");
    }
}