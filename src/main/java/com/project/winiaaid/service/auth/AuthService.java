package com.project.winiaaid.service.auth;

import com.project.winiaaid.web.dto.auth.UsernameCheckRequestDto;

public interface AuthService {
	
	public boolean checkUsername(UsernameCheckRequestDto usernameCheckReqDto) throws Exception;
	public boolean signup() throws Exception;
}