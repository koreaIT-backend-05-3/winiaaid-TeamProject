package com.project.winiaaid.domain.repair;

import com.project.winiaaid.domain.requestInfo.UserInfoEntity;
import com.project.winiaaid.web.dto.repair.RepairUserInfoDto;
import com.project.winiaaid.web.dto.requestInfo.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepairUserInfoEntity implements UserInfoEntity {
    private int user_code;
    private String user_name;
    private String user_email;
    private String main_phone_number;
    private String sub_phone_number;
    private String postal_code;
    private String main_address;
    private String detail_address;

    public UserInfoDto toUserInfoDto() {
        return RepairUserInfoDto.builder()
                .userName(user_name)
                .userEmail(user_email)
                .mainPhoneNumber(main_phone_number)
                .subPhoneNumber(sub_phone_number)
                .postalCode(postal_code)
                .mainAddress(main_address)
                .detailAddress(detail_address)
                .build();
    }
}
