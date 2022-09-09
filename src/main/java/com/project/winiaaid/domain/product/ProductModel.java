package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ReadProductModelResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
    private int model_code;
    private String model_number;

    public ReadProductModelResponseDto toReadProductModelResponseDto() {
        return ReadProductModelResponseDto.builder()
                .modelCode(model_code)
                .modelNumber(model_number)
                .build();
    }
}