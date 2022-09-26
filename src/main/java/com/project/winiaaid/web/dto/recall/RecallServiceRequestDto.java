package com.project.winiaaid.web.dto.recall;

import com.project.winiaaid.domain.requestInfo.ServiceInfo;
import lombok.Data;

@Data
public class RecallServiceRequestDto {
    private RecallProductInfoDto productInfoObject;
    private RecallUserInfoDto userInfoObject;

    public ServiceInfo toServiceInfoEntity() {
        return ServiceInfo.builder()
                .productInfoEntity(productInfoObject.toProductInfoEntity())
                .userInfoEntity(userInfoObject.toUserInfoEntity())
                .build();
    }
}