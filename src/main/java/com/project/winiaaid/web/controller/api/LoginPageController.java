package com.project.winiaaid.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.winiaaid.domain.user.User;
import com.project.winiaaid.domain.user.UserRepository;

@Controller
public class LoginPageController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	 @GetMapping({"/auth/signin","/auth/logout"})
	    public String loadSignin() {
	        return "auth/signin";
	    }
	 
	 @GetMapping("/auth/signup")
	    public String loadSignup() {
	        return "auth/signup";
	    }
	 
	 @GetMapping("/auth/withdrawal")
	    public String loadWithdrawal() {
	        return "auth/withdrawal"; 
	    }
	 
	 @GetMapping("/auth/signup2")
	    public String loadSignup2() {
	        return "auth/signup2";
	    }
	 
	 @PostMapping("/join") 
	    public String join(User user){
		 System.out.println(user);
		 user.setRoles("ROLE_USER");
		 String rawPassword = user.getPassword();
		 String encPassword = bCryptPasswordEncoder.encode(rawPassword);
		 user.setPassword(encPassword);
		 userRepository.save(user);
	        return "redirect:/auth/signin";
	        
	    }
	 
	 @Secured("ROLE_ADMIN")
	 @GetMapping("/info")
	 public @ResponseBody String info() {
		 return "개인정보";
	 }
	 
	 @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
	 @GetMapping("/data")
	 public @ResponseBody String data() {
		 return "데이터정보";
	 }
	 
	  
}

