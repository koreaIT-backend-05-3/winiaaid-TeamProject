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
		return "service/visit_request";
	}

	@GetMapping("/visit/request/updateView")
	public String loadVisitRequestUpdateViewPage() {
		return "service/visit_request_update";
	}

	@GetMapping("/visit/inquiry")
	public String loadVisitInquiryPage() {
		return "service/visit_inquiry";
	}

	@GetMapping("/visit/inquiry/detail/{repairServiceCode}")
	public String loadVisitInquiryDetailPage() { return "service/visit_inquiry_detail";}

	@GetMapping("/popup/modelNamePopup")
	public String loadModelNamePopupPage() {
		return "popup/model_name_popup";
	}

	@GetMapping("/popup/pastRequestPopup")
	public String loadPastRequestPopupPage() {
		return "popup/past_request_popup";
	}

	@GetMapping("/popup/pastAddressPopup")
	public String loadPastAddressPopupPage() {
		return "popup/past_address_popup";
	}
}