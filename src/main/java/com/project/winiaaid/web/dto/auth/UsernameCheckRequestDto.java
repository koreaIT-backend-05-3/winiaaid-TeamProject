package com.project.winiaaid.web.dto.auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class UsernameCheckRequestDto {
	@NotBlank
	@Pattern(regexp = "^[\\w\\d]{4,10}$", message = "4자에서 10자 이하로 입력해주세요.")
	private String userId;
}
