package com.project.winiaaid.service.auth;

import com.project.winiaaid.web.dto.auth.SignupRequestDto;
import com.project.winiaaid.web.dto.auth.UsernameCheckRequestDto;

public interface AuthService {
	public boolean checkUsername(UsernameCheckRequestDto usernameCheckReqDto) throws Exception;
	public boolean signup(SignupRequestDto signupRequestDto) throws Exception;
    public String getRandomAuthenticationNumber(String phoneNumber) throws Exception;
}