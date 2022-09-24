package com.project.winiaaid.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/service")
public class ServicePageController {

	@GetMapping("/visit/request")
	public String loadVisitRequestPage() {
		return "service/visit_request";
	}

	@GetMapping("/visit/request/updateView/{repairServiceCode}")
	public String loadVisitRequestUpdateViewPage(@PathVariable String repairServiceCode) {
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

	@GetMapping("/recall/request")
	public String loadRecallRequestPage() {
		return "service/recall_request";
	}
	
	@GetMapping("/recall/request/complete/{recallCode}")
	public String loadRecallRequestCompletePage(@PathVariable String recallCode) {
		return "service/recall_request_complete";
	}
	
	@GetMapping("recall/inquiry")
	public String loadRecallInquiryPage() {
		return "service/recall_inquiry";
	}
}