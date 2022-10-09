package com.project.winiaaid.service.auth;

import com.project.winiaaid.web.dto.auth.*;

public interface AuthService {
	public boolean signup(SignupRequestDto signupRequestDto) throws Exception;
	public boolean checkUserId(UsernameCheckRequestDto usernameCheckReqDto) throws Exception;
    public String getRandomAuthenticationNumber(String phoneNumber) throws Exception;
	public AuthenticationUserResponseDto getUserInfoByRequestType(String requestType, AuthenticationUserRequestDto authenticationUserRequestDto) throws Exception;
	public boolean updateTempUserPasswordByUserId(UpdateUserPasswordRequestDto updateUserPasswordRequestDto) throws Exception;
}