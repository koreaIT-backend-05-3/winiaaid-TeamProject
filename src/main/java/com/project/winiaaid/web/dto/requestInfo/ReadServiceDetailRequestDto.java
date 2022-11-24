package com.project.winiaaid.web.dto.requestInfo;

import com.project.winiaaid.domain.requestInfo.ReadServiceDetailRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadServiceDetailRequestDto {
    private String serviceCode;
    private int userCode;
    private String userName;
    private boolean adminFlag;

    public ReadServiceDetailRequest toReadServiceDetailRequestEntity() {
        return ReadServiceDetailRequest.builder()
                .service_code(serviceCode)
                .user_code(userCode)
                .user_name(userName)
                .admin_flag(adminFlag)
                .non_member_flag(userCode == 0 && !adminFlag)
                .build();

    }
}