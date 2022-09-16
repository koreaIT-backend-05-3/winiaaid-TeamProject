package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardPageController {
	@GetMapping("/customer/complaint/registView")
	public String loadBoardWritePage() {
		return "bulpyeonwrite";
	};
}
