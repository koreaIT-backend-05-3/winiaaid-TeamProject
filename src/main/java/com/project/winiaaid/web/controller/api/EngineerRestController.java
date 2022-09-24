package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.domain.engineer.Engineer;
import com.project.winiaaid.service.engineer.EngineerService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationInfoResponseDto;
import com.project.winiaaid.web.dto.engineer.ReadEngineerReservationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/engineer")
@RequiredArgsConstructor
public class EngineerRestController {

    private final EngineerService engineerService;

    @GetMapping("/list")
    public ResponseEntity<?> getEngineerList() {
        List<ReadEngineerInfoResponseDto> engineerInfoList = null;

        try {
            engineerInfoList = engineerService.getEngineerInfoList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load engineerList fail", engineerInfoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load engineerList success", engineerInfoList));
    }

    @GetMapping("/reservation/{day}/time")
    public ResponseEntity<?> getUnbookableTime(@PathVariable String day) {
        List<ReadEngineerReservationInfoResponseDto> engineerList = null;

        String date = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6);

        try {
            engineerList = engineerService.getEngineerReservationInfo(date);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "engineerReservationInfo load fail", engineerList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "engineerReservationInfo load success", engineerList));
    }

}