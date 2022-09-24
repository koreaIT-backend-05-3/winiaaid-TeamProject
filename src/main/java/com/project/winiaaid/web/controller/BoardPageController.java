package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardPageController {
	@GetMapping("/customer/complaint/list")
	public String loadComplaintPage() {
		return "complaint_list";
	}

	@GetMapping("/customer/complaint/regist-view")
	public String loadBoardWritePage() {
		return "complaint_write";
	}

	@GetMapping("/customer/complaint/detail/{boardCode}")
	public String loadBoardDetailPage() {
		return "complaint_detail";
	}
}
