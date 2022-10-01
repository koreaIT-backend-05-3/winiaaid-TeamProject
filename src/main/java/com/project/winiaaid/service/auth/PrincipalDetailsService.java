package com.project.winiaaid.service.auth;

import com.project.winiaaid.domain.user.User;
import com.project.winiaaid.domain.user.UserRepository;
import com.project.winiaaid.handler.aop.annotation.Log;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


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
			throw new UsernameNotFoundException(username);
		}
		
		if(userEntity == null) {
			throw new UsernameNotFoundException(username + "사용자이름은 사용 할 수 없습니다.");
		}
		
		return new PrincipalDetails(userEntity);
		
	}

}