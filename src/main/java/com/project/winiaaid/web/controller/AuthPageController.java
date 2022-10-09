package com.project.winiaaid.web.controller;

import com.project.winiaaid.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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

	@GetMapping("/auth/signup/step4")
	public String loadSignupStep4Page() {
		return "auth/signup_step4";
	}

	@GetMapping("/auth/signup/step5")
	public String loadSignupStep5Page() {
		return "auth/signup_step5";
	}

	@GetMapping("/auth/withdrawal")
	public String withdrawalPage() {
		return "auth/withdrawal";
	}

	@GetMapping({"/signin/inquiry/board", "/signin/inquiry/service"})
	public String loadSigninInquiryPage() {
		 return "auth/signin_inquiry";
	}

	@GetMapping({"/auth/forget/user-id", "/auth/forget/user-password"})
	public String loadForgetUserAccountPage() {
		 return "auth/forget_user_account";
	}

}