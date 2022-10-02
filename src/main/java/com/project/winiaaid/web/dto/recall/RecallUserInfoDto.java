package com.project.winiaaid.web.dto.recall;

import com.project.winiaaid.domain.recall.RecallUserInfoEntity;
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
public class RecallUserInfoDto implements UserInfoDto {
    private int userCode;
    private String userName;
    private String mainPhoneNumber;
    private String subPhoneNumber;
    private String postalCode;
    private String mainAddress;
    private String detailAddress;
    private String address;

    @Override
    public UserInfoEntity toUserInfoEntity() {
        return RecallUserInfoEntity.builder()
                .user_code(userCode)
                .non_member_flag(userCode == 0)
                .user_name(userName)
                .main_phone_number(mainPhoneNumber)
                .sub_phone_number(subPhoneNumber)
                .postal_code(postalCode)
                .main_address(mainAddress)
                .detail_address(detailAddress)
                .build();
    }
}
