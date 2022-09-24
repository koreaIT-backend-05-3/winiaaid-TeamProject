package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.UserInfoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private int userCode;
    private String userName;
    private String email;
    private String mainPhoneNumber;
    private String subPhoneNumber;
    private String postalCode;
    private String mainAddress;
    private String detailAddress;

    public UserInfoEntity toUserInfoEntity() {
        return UserInfoEntity.builder()
                .user_code(userCode)
                .user_name(userName)
                .email(email)
                .main_phone_number(mainPhoneNumber)
                .sub_phone_number(subPhoneNumber)
                .postal_code(postalCode)
                .main_address(mainAddress)
                .detail_address(detailAddress)
                .build();
    }
}