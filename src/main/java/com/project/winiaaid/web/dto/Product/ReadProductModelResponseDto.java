package com.project.winiaaid.web.dto.Product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadProductModelResponseDto {
    private int modelCode;
    private String modelNumber;
}