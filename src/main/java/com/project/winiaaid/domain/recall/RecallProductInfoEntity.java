package com.project.winiaaid.domain.recall;

import com.project.winiaaid.domain.requestInfo.ProductInfoEntity;
import com.project.winiaaid.web.dto.recall.RecallProductInfoDto;
import com.project.winiaaid.web.dto.requestInfo.ProductInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecallProductInfoEntity implements ProductInfoEntity {
    private int id2;
    private String service_code;
    private String temp_service_code;
    private int model_code;
    private String model_number;

    @Override
    public ProductInfoDto toProductInfoDto() {
        return RecallProductInfoDto.builder()
                .serviceCode(service_code)
                .modelCode(model_code)
                .modelNumber(model_number)
                .build();
    }
}
