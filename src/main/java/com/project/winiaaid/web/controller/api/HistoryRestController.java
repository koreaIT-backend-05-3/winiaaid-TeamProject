package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.history.HistoryService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.history.ReadServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.history.ReadWritingServiceHistoryTitleResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class HistoryRestController {

    private final HistoryService historyService;

    @Log
    @GetMapping("/repair/history/list/user/{userCode}")
    public ResponseEntity<?> getRepairServiceHistoryInfo(@PathVariable int userCode, ReadServiceRequestDto readServiceRequestDto) {
        List<ReadServiceInfoResponseDto> serviceHistoryInfoList = null;

        try {
            serviceHistoryInfoList = historyService.getServiceHistoryInfoByUserCode(userCode, readServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to apply for " + readServiceRequestDto.getServiceType() + " service.", serviceHistoryInfoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for " + readServiceRequestDto.getServiceType() + " service", serviceHistoryInfoList));
    }

    @Log
    @GetMapping("/{serviceType}/title/history/list/user/{userCode}")
    public ResponseEntity<?> getServiceHistoryInfoTitleByServiceTypeCode(@PathVariable String serviceType, @PathVariable int userCode, ReadServiceRequestDto readServiceRequestDto){
        List<ReadServiceHistoryTitleResponseDto> serviceHistoryTitleList = null;

        try {
            serviceHistoryTitleList = historyService.getServiceHistoryTitleInfoByServiceTypeCode(serviceType, userCode, readServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load service history title", serviceHistoryTitleList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Service history title load successful", serviceHistoryTitleList));
    }

    @UriCheck
    @Log
    @GetMapping("/writing/{serviceType}/title/history/list/user/{userCode}")
    public ResponseEntity<?> getWritingServiceHistoryInfoTitleByServiceTypeCode(@PathVariable String serviceType, @PathVariable int userCode, ReadServiceRequestDto readServiceRequestDto){
        List<ReadWritingServiceHistoryTitleResponseDto> serviceHistoryTitleList = null;

        try {
            serviceHistoryTitleList = historyService.getWritingServiceHistoryInfoTitleByServiceTypeCode(serviceType, userCode, readServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load writing service history title", serviceHistoryTitleList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Service history writing title load successful", serviceHistoryTitleList));
    }
}