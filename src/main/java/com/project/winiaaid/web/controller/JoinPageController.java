package com.project.winiaaid.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.winiaaid.domain.user.User;
import com.project.winiaaid.domain.user.UserRepository;



@Controller
public class JoinPageController {
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/dojoin")
	public String doJoin(User user) throws Exception{
		System.out.println(user);
		user.setUser_roles("ROLE_USER");
		user.setUser_name("주예찬");
		userRepository.save(user);
		return "join";
	}
	 
	  
}

