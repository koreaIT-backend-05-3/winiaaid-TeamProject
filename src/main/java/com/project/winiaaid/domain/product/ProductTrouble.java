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
    private String trouble_name;

    public ReadProductTroubleResponseDto toReadProductTroubleResponseDto() {
        return ReadProductTroubleResponseDto.builder()
                .troubleCode(trouble_code)
                .troubleName(trouble_name)
                .build();
    }
}