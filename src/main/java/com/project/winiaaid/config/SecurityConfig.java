package com.project.winiaaid.config;


import com.project.winiaaid.config.auth.CustomAccessDeniedHandler;
import com.project.winiaaid.config.auth.CustomAuthenticationEntryPoint;
import com.project.winiaaid.config.auth.CustomFailureHandler;
import com.project.winiaaid.service.auth.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final PrincipalDetailsService principalDetailsService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationSuccessHandler loginSuccessHandler(){
		SimpleUrlAuthenticationSuccessHandler simpleUrlAuthenticationSuccessHandler = new SimpleUrlAuthenticationSuccessHandler();
		simpleUrlAuthenticationSuccessHandler.setDefaultTargetUrl("/main");
		return simpleUrlAuthenticationSuccessHandler;
	}

//	@Bean
//	PersistentTokenBasedRememberMeServices rememberMeServices(){
//		return new PersistentTokenBasedRememberMeServices(
//				"hello",
//				principalDetailsService,
//				null) {
//			@Override
//			protected Authentication createSuccessfulAuthentication(HttpServletRequest request, UserDetails user) {
//				return new  UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), null);
//			}
//		};
//	}

	@Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);

        http.httpBasic()
                .and()
                .csrf().disable();

		http.rememberMe()
			.key("personalKey")
			.tokenValiditySeconds(60 * 60 * 24)
			.userDetailsService(principalDetailsService)
			.authenticationSuccessHandler(loginSuccessHandler());

        http.authorizeRequests()

				.antMatchers("/service/visit/inquiry", "/service/recall/inquiry",  "/mypage/**", "/customer/complaint/regist-view", "/customer/suggestion/regist-view")
				.access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER') or hasRole('ROLE_USER')")

				.antMatchers("/manager/**")
				.access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")

                .anyRequest()
                .permitAll()

                .and()

				.exceptionHandling()
				.authenticationEntryPoint(new CustomAuthenticationEntryPoint())
				.accessDeniedHandler(new CustomAccessDeniedHandler())

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