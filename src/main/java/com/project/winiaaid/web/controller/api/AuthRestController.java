package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.auth.AuthService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<?> authenticationUserPhone(@PathVariable String phoneNumber) {
        String randomAuthenticationNumber = null;

        try {
            randomAuthenticationNumber = authService.getRandomAuthenticationNumber(phoneNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Failed to load authentication number", randomAuthenticationNumber));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful loading of authentication number", randomAuthenticationNumber));
    }
}