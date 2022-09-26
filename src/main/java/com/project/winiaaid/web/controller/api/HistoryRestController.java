package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.history.HistoryService;
import com.project.winiaaid.util.CustomObjectMapper;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class HistoryRestController {

    private final HistoryService historyService;
    private final CustomObjectMapper customObjectMapper;

    @Log
    @GetMapping("/history/user/{userCode}")
    public ResponseEntity<?> getRepairServiceHistoryInfo(@PathVariable int userCode, @RequestParam Map<String, Object> parametersMap) {
        ReadServiceRequestDto readServiceRequestDto = null;
        List<ReadServiceInfoResponseDto> serviceHistoryInfoList = null;

        readServiceRequestDto = customObjectMapper.createReadServiceRequestDtoByObjectMapper(parametersMap);

        try {
            serviceHistoryInfoList = historyService.getServiceHistoryInfoByUserCode(userCode, readServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to apply for " + readServiceRequestDto.getServiceType() + " service.", serviceHistoryInfoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for " + readServiceRequestDto.getServiceType() + " service", serviceHistoryInfoList));
    }
}