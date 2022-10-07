package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.mail.MailService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mail")
public class MailRestController {

    private final MailService mailService;

    @Log
    @PostMapping("")
    public ResponseEntity<?> sendMail(String email) {
        String randomPassword = null;
        try {
            randomPassword = mailService.sendMail(email);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to send mail", randomPassword));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Mail Sending Successful", randomPassword));
    }
}