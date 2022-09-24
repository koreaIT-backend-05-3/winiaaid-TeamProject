package com.project.winiaaid.web.dto.productV2;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ReadProductResponseDto {
    private int productCategoryCode;
    private String productCategoryName;
    private String productGroupCategoryName;
    private int groupFlag;
    private int productGroup;
    private String productMainCategoryImage;
    private String productMainImage;
    private List<ProductDetailDto> productDetailList;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
