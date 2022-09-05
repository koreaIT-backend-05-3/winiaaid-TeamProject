package com.project.winiaaid.web.dto.Product;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class ReadProductDetailResponseDto {
    private int categoryCode;
    private String categoryName;
    private boolean integratedFlag;
    private int productCode;
    private String productName;
}