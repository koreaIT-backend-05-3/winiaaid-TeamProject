package com.project.winiaaid.web.dto.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationUserResponseDto {
    private String userName;
    private String userId;
    private String userPassword;
    private String userEmail;
}