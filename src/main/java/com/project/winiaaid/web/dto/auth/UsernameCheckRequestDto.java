package com.project.winiaaid.web.dto.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class UsernameCheckRequestDto {
	@NotBlank
	@Size(max = 16, min = 4, message = "4자 이상 16자 이하다")
	private String username;
}
