package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadProductModelResponseDto {
    private int modelCode;
    private String modelNumber;
}