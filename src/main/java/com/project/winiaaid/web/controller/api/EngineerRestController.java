package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.engineer.EngineerService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.Engineer.ReadEngineerResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/engineer")
@RequiredArgsConstructor
public class EngineerRestController {

    private final EngineerService engineerService;

    @GetMapping("/reservation/time")
    public ResponseEntity<?> getUnbookableTime(@RequestParam int day) {
        List<ReadEngineerResponseDto> engineerList = null;

        try {
            engineerList = engineerService.getEngineerReservationInfo();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "engineerReservationInfo load fail", engineerList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "engineerReservationInfo load success", engineerList));
    }
}