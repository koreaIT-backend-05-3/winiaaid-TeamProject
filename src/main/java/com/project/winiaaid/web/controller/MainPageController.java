package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainPageController {
	
	@GetMapping("/main")
	public String loadMainPage() {
		return "main_page";
	}
	
	@GetMapping("/signin")
	public String loadSigninPage() {
		return "/auth/signin";
	}

}