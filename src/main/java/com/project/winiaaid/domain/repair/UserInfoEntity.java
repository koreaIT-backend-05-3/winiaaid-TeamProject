package com.project.winiaaid.domain.repair;

import com.project.winiaaid.web.dto.repair.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoEntity {
    private int user_code;
    private String user_name;
    private String email;
    private String main_phone_number;
    private String sub_phone_number;
    private String postal_code;
    private String main_address;
    private String detail_address;

    public UserInfoDto toUserInfoDto() {
        return UserInfoDto.builder()
                .userName(user_name)
                .email(email)
                .mainPhoneNumber(main_phone_number)
                .subPhoneNumber(sub_phone_number)
                .postalCode(postal_code)
                .mainAddress(main_address)
                .detailAddress(detail_address)
                .build();
    }
}
