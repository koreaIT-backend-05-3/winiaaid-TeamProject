package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.recall.RecallService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.recall.RecallServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.RequiredArgsConstructor;

import java.util.List;

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
		ServiceInfo serviceInfo = null;
		
		try {
			serviceInfo = recallService.addRecallRequest(recallServiceRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Recall Request Failed", serviceInfo));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Added Recall Request", serviceInfo));
	}
	
	@Log
	@GetMapping("recall/{serviceCode}")
	public ResponseEntity<?> getRecallRequest(@PathVariable String serviceCode){
		ReadServiceInfoResponseDto recallServiceResponseDto = null;
		
		try {
			recallServiceResponseDto = recallService.getRecallRequest(serviceCode);
			if(recallServiceResponseDto == null) {
				return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "request failed", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Database Error", null));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Import Recall Request", recallServiceResponseDto));
	}
	
	
	@Log
	@GetMapping("recall/list/{page}")
	public ResponseEntity<?> getRecallRequestList(@PathVariable int page, @RequestParam int userCode){
		List<ReadServiceInfoResponseDto> listDto = null;
		try {
			listDto = recallService.getRecallRequestList(page, userCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "database error", null));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Import Recall Request List", listDto));
	}
	
	@Log
	@PutMapping("recall/cancel/{serviceCode}")
	public ResponseEntity<?> setCancelRecallRequest(@PathVariable String serviceCode){
		boolean status = false;
		try {
			status = recallService.updateCancelRecallRequest(serviceCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed Cancel Recall Request", null));
		}
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful Cancel Recall Request", null));
	}
}