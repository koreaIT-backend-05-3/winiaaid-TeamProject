package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadProductCategoryResponseDto {
    private int productCategoryCode;
    private String productCategoryName;
    private boolean groupFlag;
    private int productGroupCode;
    private String productMainCategoryImage;
}