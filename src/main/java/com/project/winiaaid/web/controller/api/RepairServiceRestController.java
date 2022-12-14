package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.repair.RepairService;
import com.project.winiaaid.util.UserService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import com.project.winiaaid.web.dto.repair.RepairServiceRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceDetailRequestDto;
import com.project.winiaaid.web.dto.requestInfo.ReadServiceInfoResponseDto;
import com.project.winiaaid.web.dto.requestInfo.ServiceRequestResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/service")
public class RepairServiceRestController {

    private final RepairService repairService;
    private final UserService userService;

    @Log
    @PostMapping("/visit/request")
    public ResponseEntity<?> applyForService(@RequestBody RepairServiceRequestDto repairServiceRequestDto) {
        ServiceRequestResponseDto serviceRequestResponseDto = null;

        try {
            serviceRequestResponseDto = repairService.addRepairServiceRequest(repairServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Service application failed", serviceRequestResponseDto));
        }

        if(serviceRequestResponseDto == null) {
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Service application failed", serviceRequestResponseDto));
        }

//        if(userService.isNonMemberRequest(repairServiceRequestDto.getUserInfoObject().getUserCode())) {
//            userService.sendServiceCode(serviceRequestResponseDto.getServiceCode(), repairServiceRequestDto.getUserInfoObject().getMainPhoneNumber());
//        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for service", serviceRequestResponseDto));
    }

    @Log
    @GetMapping("/repair/history/detail/list/user/{userCode}")
    public ResponseEntity<?> getRepairServiceHistoryListInfo(@PathVariable int userCode, @RequestParam int page) {
        List<ReadServiceInfoResponseDto> serviceHistoryInfoList = null;

        try {
            serviceHistoryInfoList = repairService.getServiceHistoryDetailInfoListByUserCode(userCode, page);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to apply for service.", serviceHistoryInfoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for service", serviceHistoryInfoList));
    }

    @Log
    @GetMapping("/repair/detail/history/{serviceCode}")
    public ResponseEntity<?> getRepairServiceDetailHistoryInfo(ReadServiceDetailRequestDto readServiceDetailRequestDto) {
        ReadServiceInfoResponseDto repairServiceResponseDto = null;

        try {
            repairServiceResponseDto = repairService.getRepairServiceDetailHistoryInfo(readServiceDetailRequestDto);

            if(repairServiceResponseDto == null) {
                return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "request failed", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load detailed application history", repairServiceResponseDto));
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

    @PutMapping("/repair/modify/{serviceCode}")
    public ResponseEntity<?> updateRepairServiceInfoByRepairServiceCode(@RequestBody RepairServiceRequestDto repairServiceRequestDto){
        String serviceCode = null;

        try {
            serviceCode = repairService.modifyRepairReservationInfoByRepairServiceCode(repairServiceRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to modify reservation information", serviceCode));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful modify of reservation information", serviceCode));
    }

    @PutMapping("/repair/cancel/{serviceCode}")
    public ResponseEntity<?> cancelRepairServiceByRepairServiceCode(@PathVariable String serviceCode) {
        boolean status = false;

        try {
            status = repairService.cancelRepairServiceByRepairServiceCode(serviceCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to cancel the registration history", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successfully canceled application history", status));
    }

}