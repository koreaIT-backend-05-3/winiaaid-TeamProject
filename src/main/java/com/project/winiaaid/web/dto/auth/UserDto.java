package com.project.winiaaid.web.dto.auth;

import com.project.winiaaid.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
	private int usercode;
	private String username;
	private String email;
	private String userid;
	private String password;
	private String role;
	private int gender;
	
	
	public User toEntity() {
		
		User user = User.builder()
				.username(username)
				.password(password)
				.email(email)
				.roles(role)
				.build();
		return user;
	}
}
