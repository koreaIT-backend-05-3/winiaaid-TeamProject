package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.RepairUserInfoEntity;
import com.project.winiaaid.domain.requestInfo.UserInfoEntity;
import com.project.winiaaid.web.dto.requestInfo.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepairUserInfoDto implements UserInfoDto {
    private int userCode;
    private String userName;
    private String userEmail;
    private String mainPhoneNumber;
    private String subPhoneNumber;
    private String postalCode;
    private String mainAddress;
    private String detailAddress;

    public UserInfoEntity toUserInfoEntity() {
        return RepairUserInfoEntity.builder()
                .user_code(userCode)
                .non_member_flag(userCode == 0)
                .user_name(userName)
                .user_email(userEmail)
                .main_phone_number(mainPhoneNumber)
                .sub_phone_number(subPhoneNumber)
                .postal_code(postalCode)
                .main_address(mainAddress)
                .detail_address(detailAddress)
                .build();
    }
}