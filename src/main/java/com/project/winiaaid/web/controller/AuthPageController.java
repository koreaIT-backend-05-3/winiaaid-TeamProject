package com.project.winiaaid.web.controller;

import com.project.winiaaid.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class AuthPageController {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	 @GetMapping({"/auth/signin","/auth/logout"})
	    public String loadSigninPage() {
	        return "auth/signin";
	    }
	 
	 @GetMapping("/auth/signup/step1")
	    public String loadSignupStep1Page() {
	        return "auth/signup_step1";
	    }

	@GetMapping("/auth/signup/step2")
	public String loadSignupStep2Page() {
		return "auth/signup_step2";
	}
	@GetMapping("/auth/signup/step3")
	public String loadSignupStep3Page() {
		return "auth/signup_step3";
	}
	
	@GetMapping("/auth/signup/join")
	public String loadSignupJoinPage() {
		return "auth/join";
	}
	 
	@GetMapping("/auth/withdrawal/login")
	    public String withdrawalLoginPage() {
	        return "auth/withdrawal_login"; 
	    }

	@GetMapping("/auth/withdrawal")
	public String withdrawalPage() {
		return "auth/withdrawal";
	}

	@GetMapping({"/signin/inquiry/board", "/signin/inquiry/service"})
	public String loadSigninInquiryPage() {
		 return "auth/signin_inquiry";
	}

	 
//	 @PostMapping("/join") 
//	    public String join(User user) throws Exception{
//		 System.out.println(user);
//		 user.setUser_roles("ROLE_USER");
//		 String rawPassword = user.getUser_password();
//		 String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//		 user.setUser_password(encPassword);
//		 userRepository.save(user);
//	        return "redirect:/auth/signin";
//	        
//	    }
	 
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

