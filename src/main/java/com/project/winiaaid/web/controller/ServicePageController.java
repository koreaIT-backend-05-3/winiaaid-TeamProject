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
		return "service/visitRequest";
	}

	@GetMapping("/visit/inquiry")
	public String loadVisitInquiryPage() {
		return "service/visitInquiry";
	}

	@GetMapping("/popup/modelNamePopup")
	public String loadModelNamePopupPage() {
		return "popup/model_name_popup";
	}

	@GetMapping("/popup/pastRequestPopup")
	public String loadPastRequestPopupPage() {
		return "popup/past_request_popup";
	}
}