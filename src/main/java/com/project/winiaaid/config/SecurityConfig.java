package com.project.winiaaid.config;


import com.project.winiaaid.config.auth.CustomAuthenticationEntryPoint;
import com.project.winiaaid.config.auth.CustomFailureHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

				.antMatchers("/service/visit/inquiry", "/service/recall/inquiry", "/mypage/writing/**")
				.access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_USER')")

                .anyRequest()
                .permitAll()

                .and()

				.exceptionHandling()
				.authenticationEntryPoint(new CustomAuthenticationEntryPoint())

				.and()
                
                .formLogin()
                .loginPage("/auth/signin")
                .loginProcessingUrl("/auth/signin")
                .failureHandler(new CustomFailureHandler())
                .defaultSuccessUrl("/main")

                .and()

                .logout()
                .logoutSuccessUrl("/main");
    }
}