package com.project.winiaaid.web.dto.auth;



import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.winiaaid.domain.user.User;

import lombok.Data;

@Data
public class SignupResponseDto {
	@NotBlank
	@Pattern(regexp = "^[가-힇]*$", message = "한글만 입력 가능합니다.")
	private String name;
	
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	@Pattern(regexp = "^[a-zA-Z]{1}[a-zA-Z0-9_]{4,12}$")
	private String username;
	
	@NotBlank
//	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[-~!@#$%^&*_+=])[a-zA-Z\\d-~!@#$%^&*_+=]{8,16}$")
	private String password;
	
	@AssertTrue(message = "아이디 중복확인이 되지 않았습니다.")
	private boolean checkUsernameFlag;
	
	public User toEntity() {
		return User.builder()
				.username(name)
				.email(email)
				.password(new BCryptPasswordEncoder().encode(password))
				.roles("ROLE_USER")
				.build();
	}
}
