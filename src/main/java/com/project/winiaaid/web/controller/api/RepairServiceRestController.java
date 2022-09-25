package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.repair.RepairService;
import com.project.winiaaid.util.CustomObjectMapper;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.ReadServiceRequestDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.repair.ReadServiceInfoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/service")
public class RepairServiceRestController {

    private final RepairService repairService;
    private final CustomObjectMapper customObjectMapper;

    @PostMapping("/visit/request")
    public ResponseEntity<?> applyForService(@RequestBody RepairServiceRequestDto repairServiceRequestDto) {
        String repairServiceCode = null;

        try {
            repairServiceCode = repairService.addRepairServiceRequest(repairServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Service application failed", repairServiceCode));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for service", repairServiceCode));
    }

    @GetMapping("/repair/detail/history/{repairServiceCode}")
    public ResponseEntity<?> getRepairServiceDetailHistoryInfo(@PathVariable String repairServiceCode) {
        ReadServiceInfoResponseDto repairServiceResponseDto = null;

        try {
            repairServiceResponseDto = repairService.getRepairServiceDetailHistoryInfo(repairServiceCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(1, "Failed to load detailed application history", repairServiceResponseDto));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Detailed application history load successful", repairServiceResponseDto));
    }

    @GetMapping("/address/history/user/{userCode}")
    public ResponseEntity<?> getPastReceptionAddress(@PathVariable int userCode, @RequestParam int page) {
        List<AddressResponseDto> addressInfoList = null;

        try {
            addressInfoList = repairService.getPastReceptionAddressListByUserCode(userCode, page);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(1, "Failed to load past reception address.", addressInfoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successfully loaded past reception addresses", addressInfoList));
    }

    @PutMapping("/repair/modify/{repairServiceCode}")
    public ResponseEntity<?> updateRepairServiceInfoByRepairServiceCode(@RequestBody RepairServiceRequestDto repairServiceRequestDto){
        String repairServiceCode = null;

        try {
            repairServiceCode = repairService.modifyRepairReservationInfoByRepairServiceCode(repairServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to modify reservation information", repairServiceCode));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful modify of reservation information", repairServiceCode));
    }

    @PutMapping("/repair/cancel/{repairServiceCode}")
    public ResponseEntity<?> cancelRepairServiceByRepairServiceCode(@PathVariable String repairServiceCode) {
        boolean status = false;

        try {
            status = repairService.cancelRepairServiceByRepairServiceCode(repairServiceCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to cancel the registration history", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successfully canceled application history", status));
    }
}