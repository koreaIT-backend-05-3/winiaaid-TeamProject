package com.project.winiaaid.web.dto.auth;

import com.project.winiaaid.domain.user.User;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class UpdateUserInfoRequestDto {
    private int userCode;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^+=])[A-Za-z0-9!@#$%^+=]{8,10}$", message = "※영문+숫자+특수문자의 8~10자 이내 ※ 패스워드에 사용 가능한 특수문자 : ! @ # $ % ^ + =")
    private String userPassword;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9]+@[A-Za-z0-9]+.com$", message = "이메일 형식을 지켜주세요.")
    private String userEmail;

    @NotBlank
    private String postalCode;

    @NotBlank
    private String mainAddress;

    @NotBlank
    private String detailAddress;

    @NotBlank
    private String mainPhoneNumber;

    private String subPhoneNumber;
    private boolean emailReceiveFlag;
    private boolean mailReceiveFlag;
    private boolean smsReceiveFlag;

    private String staffCompany;
    private String employeeNumber;


    public User toUserEntity() {
        return User.builder()
                .user_code(userCode)
                .user_password(new BCryptPasswordEncoder().encode(userPassword))
                .user_email(userEmail)
                .postal_code(postalCode)
                .main_address(mainAddress)
                .detail_address(detailAddress)
                .main_phone_number(mainPhoneNumber)
                .sub_phone_number(subPhoneNumber)
                .email_receive_flag(emailReceiveFlag ? 1 : 0)
                .sms_receive_flag(smsReceiveFlag ? 1 : 0)
                .mail_receive_flag(mailReceiveFlag ? 1 : 0)
                .staff_company(staffCompany)
                .employee_number(employeeNumber)
                .build();
    }

}
