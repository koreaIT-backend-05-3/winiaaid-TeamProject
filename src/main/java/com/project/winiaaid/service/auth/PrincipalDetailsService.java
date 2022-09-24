package com.project.winiaaid.service.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.user.User;
import com.project.winiaaid.domain.user.UserRepository;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.web.dto.auth.SignupReqDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{
	
	private final UserRepository userRepository;
	
	@Log
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User userEntity = null;
		
		try {
			userEntity = userRepository.findUserByUsername(username);
		} catch (Exception e) {
			e.printStackTrace();
			throw new UsernameNotFoundException(username + "사용자이름을 사용할수 없습니다.");
		}
		
		return new PrincipalDetails(userEntity);
	}
	
	public boolean addUser(SignupReqDto signupReqDto) throws Exception{
		return userRepository.save(signupReqDto.toEntity()) > 0;
	}
	

}
