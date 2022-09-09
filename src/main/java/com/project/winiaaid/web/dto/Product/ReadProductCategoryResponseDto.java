package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadProductCategoryResponseDto {
    private int categoryCode;
    private String categoryName;
    private boolean groupFlag;
    private int productGroup;
    private String productMainCategoryImage;
}