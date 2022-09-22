package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardPageController {
	@GetMapping("/customer/complaint/list")
	public String loadComplaintPage() {
		return "bulpyeonpage";
	}
	@GetMapping("/customer/complaint/registView")
	public String loadBoardWritePage() {
		return "bulpyeonwrite";
	};
	@GetMapping("/customer/complaint/detail/{boardCode}")
	public String loadBoardDtailPage() {
		return "bupyeondetailview";
	}
}
