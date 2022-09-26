package com.project.winiaaid.domain.recall;

import com.project.winiaaid.domain.requestInfo.UserInfoEntity;
import com.project.winiaaid.web.dto.recall.RecallUserInfoDto;
import com.project.winiaaid.web.dto.requestInfo.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecallUserInfoEntity implements UserInfoEntity {
    private int user_code;
    private String user_name;
    private String main_phone_number;
    private String sub_phone_number;
    private String postal_code;
    private String main_address;
    private String detail_address;

    @Override
    public UserInfoDto toUserInfoDto() {
        return RecallUserInfoDto.builder()
                .userName(user_name)
                .mainPhoneNumber(main_phone_number)
                .subPhoneNumber(sub_phone_number)
                .address(main_address + " " + detail_address)
                .build();
    }
}
