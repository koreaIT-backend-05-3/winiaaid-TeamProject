package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardPageController {
	@GetMapping({"/customer/complaint/list", "/customer/praise/list", "/customer/suggestion/list"})
	public String loadComplaintPage() {
		return "board/board_list";
	}

	@GetMapping({"/customer/complaint/regist-view", "/customer/praise/regist-view", "/customer/suggestion/suggestion-view"})
	public String loadBoardWritePage() {
		return "board/board_write";
	}

	@GetMapping({"/customer/complaint/detail/{boardCode}", "/customer/praise/detail/{boardCode}", "/customer/suggestion/detail/{boardCode}"})
	public String loadBoardDetailPage() {
		return "board/board_detail";
	}
}
