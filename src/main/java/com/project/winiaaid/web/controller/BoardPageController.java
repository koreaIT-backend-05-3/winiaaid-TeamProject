package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardPageController {
	@GetMapping({"/customer/complaint/list", "/customer/praise/list", "/customer/suggestion/list"})
	public String loadComplaintPage() {
		return "board/complaint_list";
	}

	@GetMapping({"/customer/complaint/regist-view", "/customer/praise/regist-view", "/customer/complaint/suggestion-view"})
	public String loadBoardWritePage() {
		return "board/complaint_write";
	}

	@GetMapping({"/customer/complaint/detail/{boardCode}", "/customer/praise/detail/{boardCode}", "/customer/complaint/detail/{boardCode}"})
	public String loadBoardDetailPage() {
		return "board/complaint_detail";
	}
}
