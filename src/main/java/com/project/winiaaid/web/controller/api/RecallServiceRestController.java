package com.project.winiaaid.web.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.winiaaid.service.recall.RecallService;
import com.project.winiaaid.service.repair.RepairService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.recall.RecallServiceResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class RecallServiceRestController {

	private final RecallService recallService;
	
	@PostMapping("recall/request")
	public ResponseEntity<?> addRecallRequest(@RequestBody RecallServiceRequestDto recallServiceRequestDto){
		String recallCode = null;
		
		try {
			recallCode = recallService.addRecallRequest(recallServiceRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Recall Request Failed", recallCode));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Added Recall Request", recallCode));
	}
	
	
	@GetMapping("recall/{recallCode}")
	public ResponseEntity<?> getRecallReqeust(@PathVariable String recallCode, @RequestParam String userName, @RequestParam int userCode){
		RecallServiceResponseDto recallServiceResponseDto = null;
		
		try {
			recallServiceResponseDto = recallService.getRecallRequest(recallCode, userName, userCode);
			if(recallServiceResponseDto == null) {
				return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "request failed", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Database Error", null));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Import Recall Request", recallServiceResponseDto));
	}
	

}
