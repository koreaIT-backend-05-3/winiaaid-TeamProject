package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/service")
public class ServicePageController {

	@GetMapping("/visit/request")
	public String loadVisitRequestPage() {
		return "/";
	}
}