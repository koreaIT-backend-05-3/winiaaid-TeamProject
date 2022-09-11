package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.domain.repair.RepairServiceInfo;
import com.project.winiaaid.service.repair.RepairService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class RepairServiceRestController {

    private final RepairService repairService;

    @PostMapping("/visit/request")
    public ResponseEntity<?> applyForService(@RequestBody RepairServiceRequestDto repairServiceRequestDto) {
        boolean status = false;

        try {
            status = repairService.addRepairServiceRequest(repairServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(-1, "Service application failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for service", status));
    }

    @GetMapping("/repair/history")
    public ResponseEntity<?> getRepairServiceInfo() {
        RepairServiceInfo repairServiceInfo = null;

        try {
            repairServiceInfo = repairService.getRepariServiceByUserCode();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed application for repairService", repairServiceInfo));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for repairService", repairServiceInfo));
    }
}