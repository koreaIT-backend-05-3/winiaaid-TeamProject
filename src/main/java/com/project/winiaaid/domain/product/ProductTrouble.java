package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ReadProductTroubleResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductTrouble {
    private int trouble_code;
    private String trouble_symptom;

    public ReadProductTroubleResponseDto toReadProductTroubleResponseDto() {
        return ReadProductTroubleResponseDto.builder()
                .troubleCode(trouble_code)
                .troubleSymptom(trouble_symptom)
                .build();
    }
}