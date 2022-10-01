package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("customer")
@Controller
public class BoardPageController {
	
	@GetMapping({"/complaint/list", "/praise/list", "/suggestion/list"})
	public String loadBoardListPage() {
		return "board/board_list";
	}

	@GetMapping({"/complaint/regist-view", "/praise/regist-view", "/suggestion/regist-view"})
	public String loadBoardWritePage() {
		return "board/board_write";
	}

	@GetMapping({"/complaint/detail/{boardCode}", "/praise/detail/{boardCode}", "/suggestion/detail/{boardCode}"})
	public String loadBoardDetailPage() {
		return "board/board_detail";
	}

	@GetMapping({"/complaint/update-view/{boardCode}", "/praise/update-view/{boardCode}", "/suggestion/update-view/{boardCode}"})
	public String loadBoardModifyPage() {
		return "board/board_modify";
	}
}