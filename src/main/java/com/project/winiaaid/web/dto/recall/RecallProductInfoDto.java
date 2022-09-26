package com.project.winiaaid.web.dto.recall;

import com.project.winiaaid.domain.recall.RecallProductInfoEntity;
import com.project.winiaaid.domain.requestInfo.ProductInfoEntity;
import com.project.winiaaid.web.dto.requestInfo.ProductInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecallProductInfoDto implements ProductInfoDto {
    private String serviceCode;
    private int modelCode;
    private String modelNumber;

    @Override
    public ProductInfoEntity toProductInfoEntity() {
        return RecallProductInfoEntity.builder()
                .temp_service_code(createTempServiceCode())
                .model_code(modelCode)
                .model_number(modelNumber)
                .build();
    }

    private String createTempServiceCode() {
        LocalDateTime nowDate = LocalDateTime.now();
        int year = nowDate.getYear();
        int month = nowDate.getMonthValue();
        int day = nowDate.getDayOfMonth();

        String tempServiceCode = null;

        tempServiceCode = modelCode + "0" + (year + month + day);

        return tempServiceCode;
    }
}
