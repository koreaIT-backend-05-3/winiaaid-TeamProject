package com.project.winiaaid.web.dto.auth;

import lombok.Data;

@Data
public class AuthenticationUserRequestDto {
    private String userId;
    private String mainPhoneNumber;
}