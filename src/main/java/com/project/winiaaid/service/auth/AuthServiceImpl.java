package com.project.winiaaid.service.auth;

import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.user.UserRepository;
import com.project.winiaaid.web.dto.auth.UsernameCheckRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	
	
	@Override
	public boolean checkUsername(UsernameCheckRequestDto usernameCheckReqDto) throws Exception {
		
		return userRepository.findUserByUsername(usernameCheckReqDto.getUsername()) == null;
	}

	@Override
	public boolean signup() throws Exception{
		return false;
	}

}
