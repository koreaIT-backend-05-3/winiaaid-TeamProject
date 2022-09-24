package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadProductDetailResponseDto {
    private int productCategoryCode;
    private String productCategoryName;
    private int productCode;
    private String productName;
    private String productMainImage;
    private String productDetailImage;
}