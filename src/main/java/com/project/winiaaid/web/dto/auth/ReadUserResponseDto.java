package com.project.winiaaid.web.dto.auth;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReadUserResponseDto {


    private int userCode;
    private String userName;
    private String userId;
    private String userPassword;
    private String userEmail;
    private String userRoles;
    private int userGender;
    private String userBirth;
    private int birthType;
    private String postalCode;
    private String mainAddress;
    private String detailAddress;
    private String mainPhoneNumber;
    private String subPhoneNumber;
    private boolean mailReceiveFlag;
    private boolean emailReceiveFlag;
    private boolean smsReceiveFlag;
    private String staffCompany;
    private String employeeNumber;
    private LocalDateTime createDate;
}