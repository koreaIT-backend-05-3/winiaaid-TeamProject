package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.service.ApplyServiceReqsetDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/service")
public class ServiceRestController {

    @PostMapping("/visit/request")
    public ResponseEntity<?> applyForService(@RequestBody ApplyServiceReqsetDto applyServiceReqsetDto) {

        System.out.println(applyServiceReqsetDto);

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful application for service", null));
    }
}