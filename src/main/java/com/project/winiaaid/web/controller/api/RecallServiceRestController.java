package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.recall.RecallService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class RecallServiceRestController {

	private final RecallService recallService;

	@Log
	@PostMapping("recall/request")
	public ResponseEntity<?> addRecallRequest(@RequestBody RecallServiceRequestDto recallServiceRequestDto){
		String serviceCode = null;
		
		try {
			serviceCode = recallService.addRecallRequest(recallServiceRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Recall Request Failed", serviceCode));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Added Recall Request", serviceCode));
	}

	@Log
	@GetMapping("recall/{serviceCode}")
	public ResponseEntity<?> getRecallRequest(@PathVariable String serviceCode, @RequestParam String userName, @RequestParam int userCode){
		ReadServiceInfoResponseDto recallServiceResponseDto = null;
		
		try {
			recallServiceResponseDto = recallService.getRecallRequest(serviceCode, userName, userCode);
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