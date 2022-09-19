package com.project.winiaaid.web.dto.productV2;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProductDetailDto {
    private int productCode;
    private String productDetailName;
    private String productDetailImage;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}